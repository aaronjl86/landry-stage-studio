-- Fix credits_consume function by removing subscription_status reference
CREATE OR REPLACE FUNCTION public.credits_consume(_user_id uuid, _amount integer, _ref text DEFAULT NULL::text, _service text DEFAULT 'edit-photo'::text, _period_start timestamp with time zone DEFAULT NULL::timestamp with time zone, _period_end timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _quota INTEGER;
  _used INTEGER;
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
  SELECT quota, used
  INTO _quota, _used
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
$function$;