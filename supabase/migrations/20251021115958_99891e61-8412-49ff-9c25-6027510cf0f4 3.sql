-- Security Fix 1: Block anonymous access to profiles table
CREATE POLICY "Block anonymous access to profiles"
ON profiles FOR ALL
USING (auth.uid() IS NOT NULL);

-- Security Fix 6: Block anonymous access to user_credits table
CREATE POLICY "Block anonymous access to user_credits"
ON user_credits FOR ALL
USING (auth.uid() IS NOT NULL);

-- Security Fix 2: Create filtered view for public uploads (hides user_id)
CREATE VIEW public_uploads AS
SELECT 
  id, 
  original_image_url, 
  staged_image_url, 
  status, 
  created_at
FROM uploads
WHERE is_public = true AND status = 'completed';

-- Grant access to the view for anonymous and authenticated users
GRANT SELECT ON public_uploads TO anon, authenticated;