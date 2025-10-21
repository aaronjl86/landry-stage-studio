-- Fix security definer view issue
-- Enable SECURITY INVOKER mode so the view respects RLS policies of the querying user
ALTER VIEW public_uploads SET (security_invoker = on);