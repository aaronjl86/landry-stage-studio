-- Create rate limiting table for persistent rate limits across edge function restarts
CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(identifier)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_identifier ON public.rate_limit_buckets(identifier);
CREATE INDEX IF NOT EXISTS idx_rate_limit_window_start ON public.rate_limit_buckets(window_start);

-- Enable RLS
ALTER TABLE public.rate_limit_buckets ENABLE ROW LEVEL SECURITY;

-- Block all user access (only edge functions via service role can access)
CREATE POLICY "Block all user access to rate limits" 
ON public.rate_limit_buckets 
FOR ALL 
USING (false);

-- Cleanup function to remove expired rate limit buckets
CREATE OR REPLACE FUNCTION public.cleanup_rate_limit_buckets()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limit_buckets
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$;