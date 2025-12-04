-- Grant admin role to aaronjl86@me.com by email
-- This migration creates a function to grant admin by email and applies it to the owner's email

-- Create function to grant admin role by email (for future use)
CREATE OR REPLACE FUNCTION public.grant_admin_by_email(_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _email
  LIMIT 1;

  -- If user doesn't exist, return false
  IF _user_id IS NULL THEN
    RETURN false;
  END IF;

  -- Grant admin role (using INSERT ... ON CONFLICT to avoid duplicates)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;

-- Grant admin to aaronjl86@me.com if user exists
DO $$
DECLARE
  _user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = 'aaronjl86@me.com'
  LIMIT 1;

  -- If user exists, grant admin role
  IF _user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Create trigger to automatically grant admin when aaronjl86@me.com signs up
CREATE OR REPLACE FUNCTION public.auto_grant_admin_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this is the owner's email, grant admin role
  IF NEW.email = 'aaronjl86@me.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger on auth.users insert
DROP TRIGGER IF EXISTS auto_grant_admin_trigger ON auth.users;
CREATE TRIGGER auto_grant_admin_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_grant_admin_on_signup();

