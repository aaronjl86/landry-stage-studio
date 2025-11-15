-- Drop the overly permissive conflicting RLS policy
DROP POLICY IF EXISTS "Users can report violations" ON public.architectural_violations;