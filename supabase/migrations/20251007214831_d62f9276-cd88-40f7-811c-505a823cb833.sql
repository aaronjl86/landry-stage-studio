-- Add explicit RESTRICTIVE policies to deny credit manipulation by users
-- This ensures only backend functions (using service role) can modify credits

-- Deny all INSERT operations on user_credits table
CREATE POLICY "Deny all user inserts to user_credits"
ON public.user_credits
AS RESTRICTIVE
FOR INSERT
WITH CHECK (false);

-- Deny all UPDATE operations on user_credits table
CREATE POLICY "Deny all user updates to user_credits"
ON public.user_credits
AS RESTRICTIVE
FOR UPDATE
USING (false)
WITH CHECK (false);

-- Deny all DELETE operations on user_credits table
CREATE POLICY "Deny all user deletes from user_credits"
ON public.user_credits
AS RESTRICTIVE
FOR DELETE
USING (false);

-- Add comment explaining the security model
COMMENT ON TABLE public.user_credits IS 'Credit balances managed exclusively by backend functions. Users can only view their own credits via SELECT policy. All modifications (INSERT/UPDATE/DELETE) are blocked by explicit RESTRICTIVE policies.';