-- Add MLS compliance fields to uploads table
-- These fields track MLS compliance for Portland, OR market requirements

ALTER TABLE public.uploads 
ADD COLUMN IF NOT EXISTS mls_compliant BOOLEAN DEFAULT true NOT NULL;

ALTER TABLE public.uploads 
ADD COLUMN IF NOT EXISTS mls_disclosure_text TEXT DEFAULT 'Photos are virtually staged to help buyers visualize the potential of the space';

ALTER TABLE public.uploads 
ADD COLUMN IF NOT EXISTS prompt_used TEXT;

ALTER TABLE public.uploads 
ADD COLUMN IF NOT EXISTS mls_violations JSONB DEFAULT '[]'::jsonb;

ALTER TABLE public.uploads 
ADD COLUMN IF NOT EXISTS mls_metadata JSONB;

-- Add comment explaining MLS compliance fields
COMMENT ON COLUMN public.uploads.mls_compliant IS 'Indicates if the upload complies with MLS policies for Portland, OR market';
COMMENT ON COLUMN public.uploads.mls_disclosure_text IS 'Standard MLS disclosure text that must be included in listings';
COMMENT ON COLUMN public.uploads.prompt_used IS 'Full prompt used for staging (for audit and compliance tracking)';
COMMENT ON COLUMN public.uploads.mls_violations IS 'Array of any MLS policy violations detected during processing';
COMMENT ON COLUMN public.uploads.mls_metadata IS 'MLS compliance metadata including market, policy version, and timestamp';

