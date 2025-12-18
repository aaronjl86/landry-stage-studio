-- Create admin-only table for sensitive payment information
CREATE TABLE public.user_payment_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_code text,
  subscription_status text DEFAULT 'inactive',
  stripe_subscription_id text,
  period_start timestamp with time zone DEFAULT now(),
  period_end timestamp with time zone DEFAULT (now() + interval '1 month'),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on the new table
ALTER TABLE public.user_payment_info ENABLE ROW LEVEL SECURITY;

-- Deny all direct user access (admin/service role only)
CREATE POLICY "Block all direct user access to payment info"
ON public.user_payment_info
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);

-- Migrate existing payment data from profiles to user_payment_info
INSERT INTO public.user_payment_info (user_id, plan_code, subscription_status, stripe_subscription_id, period_start, period_end)
SELECT id, plan_code, subscription_status, stripe_subscription_id, period_start, period_end
FROM public.profiles
WHERE plan_code IS NOT NULL OR subscription_status IS NOT NULL OR stripe_subscription_id IS NOT NULL;

-- Update the handle_new_user trigger to insert into user_payment_info
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Insert payment info record
  INSERT INTO public.user_payment_info (user_id)
  VALUES (NEW.id);
  
  -- Grant 3 free credits on signup
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 3);
  
  RETURN NEW;
END;
$$;

-- Add trigger for updated_at on user_payment_info
CREATE TRIGGER update_user_payment_info_updated_at
BEFORE UPDATE ON public.user_payment_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update credits_provision function to use new table
CREATE OR REPLACE FUNCTION public.credits_provision(_plan_code text, _user_id uuid DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
      updated_at = NOW()
  WHERE id = _user_id;

  -- Update payment info in separate table
  UPDATE public.user_payment_info
  SET plan_code = _plan_code,
      period_start = DATE_TRUNC('month', NOW()),
      period_end = DATE_TRUNC('month', NOW()) + INTERVAL '1 month',
      subscription_status = 'active',
      updated_at = NOW()
  WHERE user_id = _user_id;

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

-- Remove payment columns from profiles table
ALTER TABLE public.profiles 
  DROP COLUMN IF EXISTS plan_code,
  DROP COLUMN IF EXISTS subscription_status,
  DROP COLUMN IF EXISTS stripe_subscription_id,
  DROP COLUMN IF EXISTS period_start,
  DROP COLUMN IF EXISTS period_end;