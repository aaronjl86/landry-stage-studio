-- Add missing columns to profiles table for credit system
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS plan_code TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS quota INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS period_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 month');

-- Create credit_transactions table for audit trail
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  ref TEXT UNIQUE,
  operation TEXT NOT NULL CHECK (operation IN ('consume', 'refund', 'provision', 'purchase')),
  service TEXT DEFAULT 'edit-photo',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  product_id TEXT,
  price_id TEXT,
  credits_per_month INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on credit_transactions
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on subscription_plans
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for credit_transactions
CREATE POLICY "Users can view own transactions"
ON public.credit_transactions
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policies for subscription_plans (public read)
CREATE POLICY "Anyone can view subscription plans"
ON public.subscription_plans
FOR SELECT
USING (true);

-- Idempotent credit consumption function
CREATE OR REPLACE FUNCTION public.credits_consume(
  _user_id UUID,
  _amount INTEGER,
  _ref TEXT DEFAULT NULL,
  _service TEXT DEFAULT 'edit-photo',
  _period_start TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  _period_end TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _quota INTEGER;
  _used INTEGER;
  _subscription_status TEXT;
  _balance_after INTEGER;
  _transaction_exists BOOLEAN;
BEGIN
  -- Check if transaction already exists (idempotency)
  IF _ref IS NOT NULL THEN
    SELECT EXISTS(SELECT 1 FROM public.credit_transactions WHERE ref = _ref) INTO _transaction_exists;
    IF _transaction_exists THEN
      SELECT balance_after INTO _balance_after FROM public.credit_transactions WHERE ref = _ref;
      RETURN json_build_object('success', true, 'remaining', _balance_after, 'message', 'Transaction already processed');
    END IF;
  END IF;

  -- Lock row for update to prevent race conditions
  SELECT quota, used, subscription_status
  INTO _quota, _used, _subscription_status
  FROM public.profiles
  WHERE id = _user_id
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'User not found');
  END IF;

  -- Check if user has sufficient credits
  IF (_quota - _used) < _amount THEN
    RETURN json_build_object(
      'success', false, 
      'error', 'Insufficient credits',
      'remaining', (_quota - _used)
    );
  END IF;

  -- Update used credits
  UPDATE public.profiles
  SET used = used + _amount,
      updated_at = NOW()
  WHERE id = _user_id;

  _balance_after := _quota - (_used + _amount);

  -- Insert transaction record
  INSERT INTO public.credit_transactions (user_id, amount, balance_after, ref, operation, service, metadata)
  VALUES (
    _user_id,
    -_amount,
    _balance_after,
    _ref,
    'consume',
    _service,
    json_build_object('period_start', _period_start, 'period_end', _period_end)
  );

  RETURN json_build_object(
    'success', true,
    'remaining', _balance_after,
    'message', 'Credits consumed successfully'
  );
END;
$$;

-- Idempotent credit refund function
CREATE OR REPLACE FUNCTION public.credits_refund(
  _user_id UUID,
  _amount INTEGER,
  _ref TEXT DEFAULT NULL,
  _original_ref TEXT DEFAULT NULL,
  _service TEXT DEFAULT 'edit-photo'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _quota INTEGER;
  _used INTEGER;
  _balance_after INTEGER;
  _transaction_exists BOOLEAN;
  _original_exists BOOLEAN;
BEGIN
  -- Check if refund already exists (idempotency)
  IF _ref IS NOT NULL THEN
    SELECT EXISTS(SELECT 1 FROM public.credit_transactions WHERE ref = _ref) INTO _transaction_exists;
    IF _transaction_exists THEN
      SELECT balance_after INTO _balance_after FROM public.credit_transactions WHERE ref = _ref;
      RETURN json_build_object('success', true, 'balance', _balance_after, 'message', 'Refund already processed');
    END IF;
  END IF;

  -- Verify original transaction exists
  IF _original_ref IS NOT NULL THEN
    SELECT EXISTS(SELECT 1 FROM public.credit_transactions WHERE ref = _original_ref) INTO _original_exists;
    IF NOT _original_exists THEN
      RETURN json_build_object('success', false, 'error', 'Original transaction not found');
    END IF;
  END IF;

  -- Lock row for update
  SELECT quota, used
  INTO _quota, _used
  FROM public.profiles
  WHERE id = _user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'User not found');
  END IF;

  -- Restore credits (decrease used count)
  UPDATE public.profiles
  SET used = GREATEST(0, used - _amount),
      updated_at = NOW()
  WHERE id = _user_id;

  _balance_after := _quota - GREATEST(0, _used - _amount);

  -- Insert refund transaction
  INSERT INTO public.credit_transactions (user_id, amount, balance_after, ref, operation, service, metadata)
  VALUES (
    _user_id,
    _amount,
    _balance_after,
    _ref,
    'refund',
    _service,
    json_build_object('original_ref', _original_ref)
  );

  RETURN json_build_object(
    'success', true,
    'balance', _balance_after,
    'message', 'Credits refunded successfully'
  );
END;
$$;

-- Monthly credit provisioning function
CREATE OR REPLACE FUNCTION public.credits_provision(
  _plan_code TEXT,
  _user_id UUID DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _credits_per_month INTEGER;
  _provision_ref TEXT;
  _transaction_exists BOOLEAN;
  _current_month TEXT;
BEGIN
  -- Get credits for plan
  SELECT credits_per_month INTO _credits_per_month
  FROM public.subscription_plans
  WHERE plan_code = _plan_code;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Plan not found');
  END IF;

  -- Generate provision reference for idempotency (one provision per user per month)
  _current_month := TO_CHAR(NOW(), 'YYYY-MM');
  _provision_ref := 'provision_' || _user_id::TEXT || '_' || _current_month;

  -- Check if already provisioned this month
  SELECT EXISTS(SELECT 1 FROM public.credit_transactions WHERE ref = _provision_ref) INTO _transaction_exists;
  IF _transaction_exists THEN
    RETURN json_build_object('success', true, 'message', 'Credits already provisioned this month');
  END IF;

  -- Update user profile with new quota and reset usage
  UPDATE public.profiles
  SET quota = _credits_per_month,
      used = 0,
      period_start = DATE_TRUNC('month', NOW()),
      period_end = DATE_TRUNC('month', NOW()) + INTERVAL '1 month',
      plan_code = _plan_code,
      subscription_status = 'active',
      updated_at = NOW()
  WHERE id = _user_id;

  -- Insert provision transaction
  INSERT INTO public.credit_transactions (user_id, amount, balance_after, ref, operation, service, metadata)
  VALUES (
    _user_id,
    _credits_per_month,
    _credits_per_month,
    _provision_ref,
    'provision',
    'subscription',
    json_build_object('plan_code', _plan_code, 'month', _current_month)
  );

  RETURN json_build_object(
    'success', true,
    'quota', _credits_per_month,
    'message', 'Credits provisioned successfully'
  );
END;
$$;

-- Insert default subscription plans
INSERT INTO public.subscription_plans (plan_code, name, description, credits_per_month, product_id, price_id)
VALUES
  ('free', 'Free Plan', 'Get started with 3 credits per month', 3, NULL, NULL),
  ('starter', 'Starter Plan', '10 virtual stagings per month', 10, 'prod_starter', 'price_starter'),
  ('professional', 'Professional Plan', '50 virtual stagings per month', 50, 'prod_professional', 'price_professional'),
  ('enterprise', 'Enterprise Plan', 'Unlimited virtual stagings', 999, 'prod_enterprise', 'price_enterprise')
ON CONFLICT (plan_code) DO NOTHING;