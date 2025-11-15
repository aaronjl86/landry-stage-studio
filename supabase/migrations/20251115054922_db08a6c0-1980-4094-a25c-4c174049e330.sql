-- Fix Security Issue 1: Secure public_uploads view
-- This view has no RLS policies - add restrictions
DROP POLICY IF EXISTS "Anyone can view public uploads" ON public.uploads;

-- Add RLS to ensure only public uploads can be viewed through the view
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

-- Public uploads should only show completed, public uploads
CREATE POLICY "Public can view public uploads only"
ON public.uploads FOR SELECT
USING (is_public = true AND status = 'completed');

-- Fix Security Issue 2: Restrict blocked_email_domains to server-side only
DROP POLICY IF EXISTS "Anyone can read blocked domains" ON public.blocked_email_domains;

CREATE POLICY "Block all user access to blocked domains"
ON public.blocked_email_domains FOR ALL
USING (false);

-- Fix Security Issue 3: Restrict architectural_violations inserts to authenticated users
DROP POLICY IF EXISTS "System can log violations" ON public.architectural_violations;

CREATE POLICY "Authenticated users can report violations"
ON public.architectural_violations FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Note: Service role can still insert using service_role key