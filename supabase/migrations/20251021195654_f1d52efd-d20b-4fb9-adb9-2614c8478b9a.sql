-- Security Fix: Remove dormant public uploads policy to prevent user tracking
-- This policy is not currently used (is_public is never set to true in code)
-- but creates a latent privacy vulnerability

-- Drop the unused public access policy
DROP POLICY IF EXISTS "Anyone can view public completed uploads" ON public.uploads;

-- Optional: If is_public column is truly unused, consider dropping it in a future migration
-- For now, keeping it to avoid breaking any potential future features
-- But the public access policy has been removed to prevent user_id exposure