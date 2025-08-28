-- Add new media fields to demo_videos table
ALTER TABLE demo_videos 
ADD COLUMN IF NOT EXISTS gif_url TEXT,
ADD COLUMN IF NOT EXISTS slides_url TEXT,
ADD COLUMN IF NOT EXISTS additional_media TEXT,
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'video';