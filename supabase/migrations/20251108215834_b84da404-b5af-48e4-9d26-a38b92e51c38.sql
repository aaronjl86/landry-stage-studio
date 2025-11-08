-- Phase 3: Architectural Violations Tracking Table
-- This table logs both automated and user-reported architectural integrity violations
-- for analysis, model improvement, and compliance monitoring.

CREATE TABLE IF NOT EXISTS public.architectural_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  original_image_url TEXT NOT NULL,
  edited_image_url TEXT NOT NULL,
  user_prompt TEXT NOT NULL,
  ssim_score DECIMAL(5,4),
  violation_reason TEXT,
  reported_by_user BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for efficient querying and analysis
CREATE INDEX idx_violations_created_at ON public.architectural_violations(created_at DESC);
CREATE INDEX idx_violations_user ON public.architectural_violations(user_id);
CREATE INDEX idx_violations_reported ON public.architectural_violations(reported_by_user);
CREATE INDEX idx_violations_score ON public.architectural_violations(ssim_score) WHERE ssim_score IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE public.architectural_violations ENABLE ROW LEVEL SECURITY;

-- Users can view their own violation reports
CREATE POLICY "Users can view own violations"
  ON public.architectural_violations 
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can report violations (insert their own)
CREATE POLICY "Users can report violations"
  ON public.architectural_violations 
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- System can insert violations (for automated detection)
-- This allows edge functions to log violations even if user context is ambiguous
CREATE POLICY "System can log violations"
  ON public.architectural_violations 
  FOR INSERT
  WITH CHECK (true);

-- Block updates and deletes to preserve audit trail
CREATE POLICY "No updates to violations"
  ON public.architectural_violations 
  FOR UPDATE
  USING (false);

CREATE POLICY "No deletes from violations"
  ON public.architectural_violations 
  FOR DELETE
  USING (false);

-- Add comment for documentation
COMMENT ON TABLE public.architectural_violations IS 
'Tracks architectural integrity violations detected by automated validation or reported by users. Used for model retraining and quality improvement.';

COMMENT ON COLUMN public.architectural_violations.ssim_score IS 
'Structural Similarity Index score (0.0-1.0). Lower values indicate greater structural deviation. NULL for user-reported violations without automated scoring.';

COMMENT ON COLUMN public.architectural_violations.reported_by_user IS 
'true if violation was flagged by user, false if detected automatically by validation system.';