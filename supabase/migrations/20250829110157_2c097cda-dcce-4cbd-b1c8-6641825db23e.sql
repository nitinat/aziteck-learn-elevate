-- Create table for team members
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  experience TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for impact statistics
CREATE TABLE public.impact_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members
CREATE POLICY "Everyone can view active team members" 
ON public.team_members 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can insert team members" 
ON public.team_members 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update team members" 
ON public.team_members 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete team members" 
ON public.team_members 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Enable RLS for impact_stats
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for impact_stats
CREATE POLICY "Everyone can view active impact stats" 
ON public.impact_stats 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can insert impact stats" 
ON public.impact_stats 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update impact stats" 
ON public.impact_stats 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete impact stats" 
ON public.impact_stats 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Add trigger for updated_at timestamps
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_impact_stats_updated_at
BEFORE UPDATE ON public.impact_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default team members
INSERT INTO public.team_members (name, role, experience, description, display_order) VALUES
('Dr. Sarah Johnson', 'Chief Technology Officer', '15+ years in AI/ML research', 'Former lead researcher at Microsoft AI, PhD in Computer Science from MIT.', 1),
('Michael Chen', 'Head of Curriculum', '12+ years in tech education', 'Ex-Google engineer with extensive experience in building scalable learning platforms.', 2),
('Emily Rodriguez', 'Director of Business Solutions', '10+ years in enterprise consulting', 'Former McKinsey consultant specializing in digital transformation and AI strategy.', 3),
('David Kumar', 'Lead ML Engineer', '8+ years in machine learning', 'Previously at Tesla and OpenAI, expert in deep learning and computer vision.', 4);

-- Insert default impact stats
INSERT INTO public.impact_stats (label, value, display_order) VALUES
('Students Trained', '500+', 1),
('Job Placement Rate', '95%', 2),
('Business Clients', '150+', 3),
('Real Projects Built', '50+', 4);