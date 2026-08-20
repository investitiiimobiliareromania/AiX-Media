-- Migration: Create public.articles table for AiX Media News Ingestion System

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category_id UUID,
  author_id UUID,
  status TEXT NOT NULL DEFAULT 'published',
  publish_date TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  read_time TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);

-- Row Level Security (RLS) setup
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to articles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'articles' AND policyname = 'Allow public read access to articles'
  ) THEN
    CREATE POLICY "Allow public read access to articles" ON public.articles FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'articles' AND policyname = 'Allow insert access for articles'
  ) THEN
    CREATE POLICY "Allow insert access for articles" ON public.articles FOR INSERT WITH CHECK (true);
  END IF;
END $$;
