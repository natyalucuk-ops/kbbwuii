-- Add media_type column to gallery_items to support video
ALTER TABLE public.gallery_items 
ADD COLUMN media_type text DEFAULT 'image' CHECK (media_type IN ('image', 'video'));

-- Add comment for clarity
COMMENT ON COLUMN public.gallery_items.media_type IS 'Type of media: image or video';