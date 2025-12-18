-- Add is_public column to uploads table (defaults to false for privacy)
ALTER TABLE uploads 
ADD COLUMN is_public BOOLEAN DEFAULT false NOT NULL;

-- Create new RLS policy for public access to public completed uploads
CREATE POLICY "Anyone can view public completed uploads"
ON uploads
FOR SELECT
TO public
USING (is_public = true AND status = 'completed');