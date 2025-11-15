-- Drop conflicting RLS policy on architectural_violations table
-- This policy was overly permissive and allowed any authenticated user to insert
-- records with any user_id, undermining the more secure policy
DROP POLICY IF EXISTS "Users can report violations" ON public.architectural_violations;