export type EventType =
  | 'session_start'
  | 'page_view'
  | 'article_view'
  | 'category_view'
  | 'search'
  | 'cta_click'
  | 'contact_open'
  | 'contact_submit'
  | 'newsletter_signup'
  | 'phone_click'
  | 'whatsapp_click'
  | 'telegram_click'
  | 'external_link_click'
  | 'download'
  | 'video_play'
  | 'video_complete'
  | 'scroll_depth'
  | 'return_visit';

export type EngagementLevel = 'Low' | 'Medium' | 'High';

export type ContentVertical =
  | 'Real Estate'
  | 'Business'
  | 'Finance'
  | 'Markets'
  | 'Insurance'
  | 'Credits'
  | 'Investments'
  | 'Dubai'
  | 'Technology'
  | 'Culture';

export interface AttributionData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage?: string;
}

export interface DeviceInfo {
  deviceType: 'Mobile' | 'Desktop' | 'Tablet';
  os: string;
  browser: string;
  screen: string;
  language: string;
  timezone: string;
}

export interface LocationInfo {
  country: string;
  region?: string;
  city?: string;
  precision: 'approximate';
}

export interface DerivedInterest {
  category: ContentVertical;
  score: number;
  evidence: string[];
}

export interface VisitorEventPayload {
  eventId: string;
  visitorId: string;
  sessionId: string;
  eventType: EventType;
  route: string;
  contentId?: string;
  category?: string;
  metadata?: Record<string, string | number | boolean | null>;
  timestamp: number;
}

export interface VisitorBatchRequest {
  visitorId: string;
  sessionId: string;
  isNewVisitor: boolean;
  visitCount: number;
  sessionCount: number;
  firstSeen: number;
  lastSeen: number;
  firstTouch: AttributionData;
  lastTouch: AttributionData;
  device: DeviceInfo;
  events: VisitorEventPayload[];
  interests?: Record<string, number>;
  timeOnPageSeconds?: number;
  maxScrollDepth?: number;
}

export interface EnrichedSessionData {
  sessionId: string;
  visitorId: string;
  isNewVisitor: boolean;
  visitCount: number;
  sessionCount: number;
  startedAt: string;
  lastActivityAt: string;
  sessionDurationFormatted: string;
  landingPage: string;
  lastRoute: string;
  pagesViewed: string[];
  pageCount: number;
  attribution: AttributionData;
  device: DeviceInfo;
  location: LocationInfo;
  topInterests: DerivedInterest[];
  engagement: EngagementLevel;
  maxScrollDepth: number;
  lastAction?: {
    type: EventType;
    label: string;
    details?: string;
  };
}

export interface EnrichedLeadData {
  name: string;
  contact: string;
  message?: string;
  sourceContext?: string;
  pageUrl: string;
  visitorId?: string;
  sessionId?: string;
  attribution?: AttributionData;
  previousActivitySummary?: {
    pageCount: number;
    pages: string[];
    topInterests: string[];
    visitCount: number;
  };
  location?: LocationInfo;
  device?: DeviceInfo;
  timestamp: string;
}
