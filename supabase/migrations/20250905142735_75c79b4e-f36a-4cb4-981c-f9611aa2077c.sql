-- Create table for internship program banner
CREATE TABLE public.internship_program_banner (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Aziteck Internship cum Associate Program',
  subtitle TEXT NOT NULL DEFAULT 'Don''t Just Learn AI – Do AI! Transform your skills into real-world opportunities with our Learn by Doing approach.',
  video_url TEXT,
  video_title TEXT DEFAULT 'Ready to Learn, Build & Grow?',
  video_description TEXT DEFAULT 'Discover why Aziteck''s Internship cum Associate Program is your launchpad to real-world AI success.',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.internship_program_banner ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view active banners" 
ON public.internship_program_banner 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can insert banners" 
ON public.internship_program_banner 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update banners" 
ON public.internship_program_banner 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete banners" 
ON public.internship_program_banner 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_internship_program_banner_updated_at
BEFORE UPDATE ON public.internship_program_banner
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for program videos
INSERT INTO storage.buckets (id, name, public) VALUES ('program-videos', 'program-videos', true);

-- Create storage policies for program videos
CREATE POLICY "Program videos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'program-videos');

CREATE POLICY "Admins can upload program videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'program-videos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update program videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'program-videos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete program videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'program-videos' AND is_admin(auth.uid()));

-- Insert default banner data
INSERT INTO public.internship_program_banner (
  title,
  subtitle,
  video_title,
  video_description
) VALUES (
  'Aziteck Internship cum Associate Program',
  'Don''t Just Learn AI – Do AI! Transform your skills into real-world opportunities with our Learn by Doing approach.',
  'Ready to Learn, Build & Grow?',
  'Discover why Aziteck''s Internship cum Associate Program is your launchpad to real-world AI success.'
);