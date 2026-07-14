ALTER TABLE public.site_settings 
  ADD COLUMN IF NOT EXISTS banner_image_url text,
  ADD COLUMN IF NOT EXISTS banner_enabled boolean NOT NULL DEFAULT false;