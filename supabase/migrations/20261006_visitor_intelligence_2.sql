-- Migration: Create tables for Visitor Intelligence 2.0
-- (visitors, sessions, visitor_events, visitor_leads)

CREATE TABLE IF NOT EXISTS public.visitors (
  visitor_id TEXT PRIMARY KEY,
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  visit_count INTEGER DEFAULT 1,
  session_count INTEGER DEFAULT 1,
  first_source TEXT,
  last_source TEXT,
  first_landing_page TEXT,
  last_landing_page TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  language TEXT,
  timezone TEXT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  screen TEXT,
  lead_status TEXT DEFAULT 'anonymous',
  primary_interest TEXT,
  secondary_interest TEXT,
  engagement_level TEXT DEFAULT 'Low',
  intent_level TEXT DEFAULT 'Low',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.visitor_sessions (
  session_id TEXT PRIMARY KEY,
  visitor_id TEXT REFERENCES public.visitors(visitor_id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INTEGER DEFAULT 0,
  landing_page TEXT,
  last_route TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  page_count INTEGER DEFAULT 1,
  event_count INTEGER DEFAULT 1,
  max_scroll_depth INTEGER DEFAULT 0,
  engagement_level TEXT DEFAULT 'Low',
  intent_level TEXT DEFAULT 'Low',
  primary_interest TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.visitor_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE,
  session_id TEXT REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE,
  visitor_id TEXT REFERENCES public.visitors(visitor_id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  route TEXT NOT NULL,
  category TEXT,
  content_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.visitor_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT,
  session_id TEXT,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT,
  source_context TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast analytics queries
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON public.visitors(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON public.visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_started_at ON public.visitor_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_events_session_id ON public.visitor_events(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_events_event_type ON public.visitor_events(event_type);
CREATE INDEX IF NOT EXISTS idx_visitor_events_created_at ON public.visitor_events(created_at DESC);

-- RLS Configuration (Admin server-side write only)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_leads ENABLE ROW LEVEL SECURITY;
