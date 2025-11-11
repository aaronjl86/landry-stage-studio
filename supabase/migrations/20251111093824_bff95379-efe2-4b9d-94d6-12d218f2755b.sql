-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  sms_consent boolean NOT NULL DEFAULT false,
  marketing_consent boolean NOT NULL DEFAULT false,
  ip_address inet,
  user_agent text,
  submitted_at timestamp with time zone DEFAULT now(),
  read boolean DEFAULT false,
  notes text
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Admins can view all contact submissions
CREATE POLICY "Admins can view all contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update contact submissions (mark as read, add notes)
CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Anyone can submit contact forms (public access)
CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX idx_contact_submissions_submitted_at ON public.contact_submissions(submitted_at DESC);
CREATE INDEX idx_contact_submissions_read ON public.contact_submissions(read);
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);