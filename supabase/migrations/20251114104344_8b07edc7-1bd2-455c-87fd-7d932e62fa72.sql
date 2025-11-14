-- Add free trial column to profiles
ALTER TABLE public.profiles 
ADD COLUMN free_trial_uploads_remaining INTEGER DEFAULT 3;

-- Update existing users to have 3 free trial uploads
UPDATE public.profiles 
SET free_trial_uploads_remaining = 3 
WHERE free_trial_uploads_remaining IS NULL;

-- Make the column NOT NULL after setting defaults
ALTER TABLE public.profiles 
ALTER COLUMN free_trial_uploads_remaining SET NOT NULL;

-- Update handle_new_user trigger to initialize free trial
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _signup_metadata jsonb;
  _signup_ip inet;
  _device_fp text;
BEGIN
  _signup_metadata := NEW.raw_user_meta_data;
  
  BEGIN
    _signup_ip := NULLIF(_signup_metadata->>'signup_ip', '')::inet;
  EXCEPTION WHEN OTHERS THEN
    _signup_ip := NULL;
  END;
  
  _device_fp := NULLIF(_signup_metadata->>'device_fingerprint', '');
  
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    signup_ip,
    device_fingerprint,
    email_verified,
    free_trial_uploads_remaining
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(_signup_metadata->>'full_name', ''),
    _signup_ip,
    _device_fp,
    NEW.email_confirmed_at IS NOT NULL,
    3
  );
  
  INSERT INTO public.user_payment_info (user_id)
  VALUES (NEW.id);
  
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 3);
  
  RETURN NEW;
END;
$function$;

-- Update credits_consume function to prioritize free trial credits
CREATE OR REPLACE FUNCTION public.credits_consume(_user_id uuid, _amount integer, _ref text DEFAULT NULL::text, _service text DEFAULT 'edit-photo'::text, _period_start timestamp with time zone DEFAULT NULL::timestamp with time zone, _period_end timestamp with time zone DEFAULT NULL::timestamp with time zone)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _quota INTEGER;
  _used INTEGER;
  _free_trial INTEGER;
  _balance_after INTEGER;
  _free_trial_after INTEGER;
  _transaction_exists BOOLEAN;
  _used_free_trial BOOLEAN := false;
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
  SELECT quota, used, free_trial_uploads_remaining
  INTO _quota, _used, _free_trial
  FROM public.profiles
  WHERE id = _user_id
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'User not found');
  END IF;

  -- First try to use free trial credits
  IF _free_trial >= _amount THEN
    -- Use free trial credits
    UPDATE public.profiles
    SET free_trial_uploads_remaining = free_trial_uploads_remaining - _amount,
        updated_at = NOW()
    WHERE id = _user_id;
    
    _free_trial_after := _free_trial - _amount;
    _balance_after := _quota - _used;
    _used_free_trial := true;
  ELSE
    -- Check if user has sufficient paid credits
    IF (_quota - _used) < _amount THEN
      RETURN json_build_object(
        'success', false, 
        'error', 'Insufficient credits',
        'remaining', (_quota - _used),
        'free_trial_remaining', _free_trial
      );
    END IF;

    -- Use paid credits
    UPDATE public.profiles
    SET used = used + _amount,
        updated_at = NOW()
    WHERE id = _user_id;

    _balance_after := _quota - (_used + _amount);
    _free_trial_after := _free_trial;
  END IF;

  -- Insert transaction record
  INSERT INTO public.credit_transactions (user_id, amount, balance_after, ref, operation, service, metadata)
  VALUES (
    _user_id,
    -_amount,
    _balance_after,
    _ref,
    'consume',
    _service,
    json_build_object(
      'period_start', _period_start, 
      'period_end', _period_end,
      'used_free_trial', _used_free_trial
    )
  );

  RETURN json_build_object(
    'success', true,
    'remaining', _balance_after,
    'free_trial_remaining', _free_trial_after,
    'message', 'Credits consumed successfully'
  );
END;
$function$;

-- Create image_reports table (NO REFUND FIELDS)
CREATE TABLE public.image_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  original_image_url TEXT NOT NULL,
  edited_image_url TEXT NOT NULL,
  user_prompt TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'STRUCTURAL_CHANGE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on image_reports
ALTER TABLE public.image_reports ENABLE ROW LEVEL SECURITY;

-- Users can view their own reports
CREATE POLICY "Users can view own reports"
ON public.image_reports
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own reports
CREATE POLICY "Users can insert own reports"
ON public.image_reports
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_image_reports_user_id ON public.image_reports(user_id);
CREATE INDEX idx_image_reports_job_id ON public.image_reports(job_id);

-- Add comment
COMMENT ON TABLE public.image_reports IS 'Logs structural change violations reported by users for QA purposes only. No credit refund logic.';