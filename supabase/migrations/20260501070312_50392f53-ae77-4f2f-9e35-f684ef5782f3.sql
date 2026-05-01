
-- Create shared_files table
CREATE TABLE public.shared_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_files ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view shared files"
ON public.shared_files FOR SELECT
USING (true);

-- Public insert
CREATE POLICY "Anyone can upload shared files"
ON public.shared_files FOR INSERT
WITH CHECK (true);

-- Public delete
CREATE POLICY "Anyone can delete shared files"
ON public.shared_files FOR DELETE
USING (true);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('shared-files', 'shared-files', true, 10485760);

-- Storage policies
CREATE POLICY "Public read shared files"
ON storage.objects FOR SELECT
USING (bucket_id = 'shared-files');

CREATE POLICY "Public upload shared files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'shared-files');

CREATE POLICY "Public delete shared files"
ON storage.objects FOR DELETE
USING (bucket_id = 'shared-files');
