-- Update credits_consume to use free trial credits first
CREATE OR REPLACE FUNCTION public.credits_consume(
  _user_id uuid, 
  _amount integer, 
  _ref text DEFAULT NULL::text, 
  _service text DEFAULT 'edit-photo'::text, 
  _period_start timestamp with time zone DEFAULT NULL::timestamp with time zone, 
  _period_end timestamp with time zone DEFAULT NULL::timestamp with time zone
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;