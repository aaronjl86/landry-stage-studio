-- Add explicit RESTRICTIVE policies to deny subscription manipulation by users
-- This ensures only backend functions (using service role) can modify subscriptions

-- Deny all INSERT operations on user_subscriptions table
CREATE POLICY "Deny all user inserts to user_subscriptions"
ON public.user_subscriptions
AS RESTRICTIVE
FOR INSERT
WITH CHECK (false);

-- Deny all UPDATE operations on user_subscriptions table
CREATE POLICY "Deny all user updates to user_subscriptions"
ON public.user_subscriptions
AS RESTRICTIVE
FOR UPDATE
USING (false)
WITH CHECK (false);

-- Deny all DELETE operations on user_subscriptions table
CREATE POLICY "Deny all user deletes from user_subscriptions"
ON public.user_subscriptions
AS RESTRICTIVE
FOR DELETE
USING (false);

-- Add comment explaining the security model
COMMENT ON TABLE public.user_subscriptions IS 'Subscription data managed exclusively by backend functions. Users can only view their own subscription via SELECT policy. All modifications (INSERT/UPDATE/DELETE) are blocked by explicit RESTRICTIVE policies.';