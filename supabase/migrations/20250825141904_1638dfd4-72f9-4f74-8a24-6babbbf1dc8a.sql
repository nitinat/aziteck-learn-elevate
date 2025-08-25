-- Create demo_videos table for admin-managed demo content
CREATE TABLE public.demo_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  video_url TEXT,
  demo_url TEXT,
  code_url TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.demo_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for demo_videos
CREATE POLICY "Everyone can view demo videos" 
ON public.demo_videos 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert demo videos" 
ON public.demo_videos 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update demo videos" 
ON public.demo_videos 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete demo videos" 
ON public.demo_videos 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_demo_videos_updated_at
BEFORE UPDATE ON public.demo_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();