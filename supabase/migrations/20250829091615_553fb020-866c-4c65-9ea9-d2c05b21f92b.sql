-- Create a table for storing contact information
CREATE TABLE public.contact_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for contact info access
CREATE POLICY "Everyone can view contact info" 
ON public.contact_info 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can create contact info" 
ON public.contact_info 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update contact info" 
ON public.contact_info 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact info" 
ON public.contact_info 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_info_updated_at
BEFORE UPDATE ON public.contact_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default contact information
INSERT INTO public.contact_info (title, content, description, icon_name, display_order) VALUES
('Email Us', 'hello@aziteck.com', 'Send us an email and we''ll respond within 24 hours', 'Mail', 1),
('Call Us', '+1 (555) 123-4567', 'Speak directly with our team during business hours', 'Phone', 2),
('Visit Us', '123 Innovation Drive, Tech City, TC 12345', 'Schedule a visit to our modern learning facility', 'MapPin', 3),
('Business Hours', 'Mon-Fri: 9AM-6PM PST', 'We''re here to help during these hours', 'Clock', 4);