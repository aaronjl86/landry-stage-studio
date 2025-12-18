-- Phase 1: Create signup tracking table (IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS public.signup_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  email_domain text NOT NULL,
  ip_address inet NOT NULL,
  device_fingerprint text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'blocked', 'flagged')),
  risk_score integer DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_signup_ip ON signup_attempts(ip_address, created_at);
CREATE INDEX IF NOT EXISTS idx_signup_device ON signup_attempts(device_fingerprint, created_at);
CREATE INDEX IF NOT EXISTS idx_signup_email_domain ON signup_attempts(email_domain, created_at);
CREATE INDEX IF NOT EXISTS idx_signup_status ON signup_attempts(status);

ALTER TABLE public.signup_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block all user access to signup_attempts" ON public.signup_attempts;
CREATE POLICY "Block all user access to signup_attempts" ON public.signup_attempts
FOR ALL USING (false);

-- Phase 2: Create disposable email domains blocklist
CREATE TABLE IF NOT EXISTS public.blocked_email_domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text UNIQUE NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.blocked_email_domains ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read blocked domains" ON public.blocked_email_domains;
CREATE POLICY "Anyone can read blocked domains" ON public.blocked_email_domains
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Block direct modifications" ON public.blocked_email_domains;
CREATE POLICY "Block direct modifications" ON public.blocked_email_domains
FOR ALL USING (false);

-- Seed with common disposable domains (ON CONFLICT DO NOTHING)
INSERT INTO blocked_email_domains (domain, reason) VALUES
  ('tempmail.com', 'disposable'),
  ('guerrillamail.com', 'disposable'),
  ('10minutemail.com', 'disposable'),
  ('mailinator.com', 'disposable'),
  ('throwaway.email', 'disposable'),
  ('temp-mail.org', 'disposable'),
  ('trashmail.com', 'disposable'),
  ('getnada.com', 'disposable'),
  ('fakeinbox.com', 'disposable'),
  ('yopmail.com', 'disposable')
ON CONFLICT (domain) DO NOTHING;

-- Phase 3: Create IP/device blacklist table
CREATE TABLE IF NOT EXISTS public.blacklisted_identifiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier_type text NOT NULL CHECK (identifier_type IN ('ip', 'device', 'email')),
  identifier_value text NOT NULL,
  reason text,
  blocked_until timestamptz,
  permanent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(identifier_type, identifier_value)
);

CREATE INDEX IF NOT EXISTS idx_blacklist_lookup ON blacklisted_identifiers(identifier_type, identifier_value);

ALTER TABLE public.blacklisted_identifiers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block all user access to blacklist" ON public.blacklisted_identifiers;
CREATE POLICY "Block all user access to blacklist" ON public.blacklisted_identifiers
FOR ALL USING (false);

-- Phase 4: Update profiles table to track abuse flags
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS signup_ip inet,
  ADD COLUMN IF NOT EXISTS device_fingerprint text,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS card_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS risk_level text DEFAULT 'low',
  ADD COLUMN IF NOT EXISTS abuse_flags jsonb DEFAULT '[]'::jsonb;

-- Add CHECK constraint separately if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_risk_level_check'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT profiles_risk_level_check 
    CHECK (risk_level IN ('low', 'medium', 'high', 'blocked'));
  END IF;
END $$;

-- Phase 5: Create abuse detection function
CREATE OR REPLACE FUNCTION public.check_signup_abuse(
  _email text,
  _ip inet,
  _device_fingerprint text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email_domain text;
  _ip_count integer;
  _device_count integer;
  _domain_count integer;
  _is_blocked boolean;
  _risk_score integer := 0;
  _flags jsonb := '[]'::jsonb;
BEGIN
  _email_domain := LOWER(SPLIT_PART(_email, '@', 2));
  
  IF EXISTS (SELECT 1 FROM blocked_email_domains WHERE domain = _email_domain) THEN
    _risk_score := _risk_score + 100;
    _flags := _flags || '["disposable_email"]'::jsonb;
  END IF;
  
  SELECT EXISTS(
    SELECT 1 FROM blacklisted_identifiers 
    WHERE identifier_type = 'ip' 
      AND identifier_value = _ip::text
      AND (permanent = true OR blocked_until > NOW())
  ) INTO _is_blocked;
  
  IF _is_blocked THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'IP address is blocked',
      'risk_score', 999
    );
  END IF;
  
  SELECT COUNT(*) INTO _ip_count
  FROM signup_attempts
  WHERE ip_address = _ip
    AND created_at > NOW() - INTERVAL '24 hours';
    
  IF _ip_count >= 3 THEN
    _risk_score := _risk_score + 50;
    _flags := _flags || '["multiple_ip_signups"]'::jsonb;
  END IF;
  
  IF _device_fingerprint IS NOT NULL THEN
    SELECT COUNT(*) INTO _device_count
    FROM signup_attempts
    WHERE device_fingerprint = _device_fingerprint
      AND created_at > NOW() - INTERVAL '7 days';
      
    IF _device_count >= 2 THEN
      _risk_score := _risk_score + 50;
      _flags := _flags || '["multiple_device_signups"]'::jsonb;
    END IF;
  END IF;
  
  SELECT COUNT(*) INTO _domain_count
  FROM signup_attempts
  WHERE email_domain = _email_domain
    AND created_at > NOW() - INTERVAL '1 hour';
    
  IF _domain_count >= 5 THEN
    _risk_score := _risk_score + 30;
    _flags := _flags || '["rapid_domain_signups"]'::jsonb;
  END IF;
  
  RETURN jsonb_build_object(
    'allowed', _risk_score < 100,
    'risk_score', _risk_score,
    'flags', _flags,
    'requires_verification', _risk_score >= 50,
    'reason', CASE 
      WHEN _risk_score >= 100 THEN 'High risk signup blocked'
      WHEN _risk_score >= 50 THEN 'Additional verification required'
      ELSE 'OK'
    END
  );
END;
$$;

-- Phase 6: Update handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
    email_verified
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(_signup_metadata->>'full_name', ''),
    _signup_ip,
    _device_fp,
    NEW.email_confirmed_at IS NOT NULL
  );
  
  INSERT INTO public.user_payment_info (user_id)
  VALUES (NEW.id);
  
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 3);
  
  RETURN NEW;
END;
$$;