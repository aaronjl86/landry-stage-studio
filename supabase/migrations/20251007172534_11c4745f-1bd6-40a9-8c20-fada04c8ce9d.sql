-- Add explicit denial policy for unauthenticated access to profiles table
-- This provides defense-in-depth security to prevent any potential RLS bypass

-- Drop existing policies to recreate them with better security
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Recreate SELECT policy with explicit authenticated requirement
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Recreate UPDATE policy with explicit authenticated requirement
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add explicit DENY policy for anonymous users (defense in depth)
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false);

-- Add comment explaining the security model
COMMENT ON TABLE public.profiles IS 'User profile data with email and subscription info. Access strictly limited to authenticated users viewing their own profile only. Anonymous access explicitly denied.';