-- Complete RLS protection for uploads table
-- Users should only be able to modify their own upload records

-- Add UPDATE policy - users can only update their own uploads
CREATE POLICY "Users can update own uploads"
ON public.uploads
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add DELETE policy - users can delete their own uploads
CREATE POLICY "Users can delete own uploads"
ON public.uploads
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Deny anonymous access (defense in depth)
CREATE POLICY "Deny anonymous access to uploads"
ON public.uploads
FOR ALL
TO anon
USING (false);

-- Add comment explaining the security model
COMMENT ON TABLE public.uploads IS 'User upload records. Full CRUD access restricted to authenticated users for their own uploads only. Anonymous access explicitly denied.';