-- Add Bolt landing page contact form fields to contact_submissions table
-- These fields are for the new landing page contact form

-- Add agent_name column (for Bolt LP form)
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS agent_name text;

-- Add listing_address column (for Bolt LP form)
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS listing_address text DEFAULT '';

-- Note: The existing table already has:
-- - email (used by both forms)
-- - notes (used by Bolt LP form, already exists)
-- - first_name, last_name, phone, message (used by old form)

-- The Bolt LP form uses: agent_name, email, listing_address, notes
-- The old form uses: first_name, last_name, email, phone, message, sms_consent, marketing_consent

