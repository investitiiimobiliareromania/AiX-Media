export type EventType =
  | 'session_start'
  | 'page_view'
  | 'return_visit'
  | 'article_view'
  | 'category_view'
  | 'property_view'
  | 'video_play'
  | 'video_complete'
  | 'download'
  | 'search'
  | 'cta_click'
  | 'contact_open'
  | 'contact_submit'
  | 'phone_click'
  | 'whatsapp_click'
  | 'telegram_click'
  | 'external_link_click'
  | 'newsletter_signup'
  | 'scroll_depth';

export type EngagementLevel = 'Low' | 'Medium' | 'High';
export type IntentLevel = 'Low' | 'Medium' | 'High';

export type ContentVertical =
  | 'Real Estate'
  | 'Business'
  | 'Markets'
  | 'Insurance'
  | 'Credits'
  | 'Companies'
  | 'Video'
  | 'News'
  | 'Finance'
  | 'Investments';

export interface AttributionData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  rawReferrer?: string;
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
  timezone?: string;
  precision: 'approximate';
}

export interface DerivedInterest {
  category: ContentVertical;
  score: number;
  intensity: 'HIGH' | 'MEDIUM' | 'LOW';
  bar: string;
  evidence?: string[];
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

export interface TimelineEntry {
  time: string;
  type: EventType;
  label: string;
  route: string;
  details?: string;
}

export interface ContentStats {
  pagesCount: number;
  articlesCount: number;
  propertiesCount: number;
  videosCount: number;
  searchesCount: number;
  ctasCount: number;
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
  previousRoute?: string;
  pagesViewed: string[];
  pageCount: number;
  attribution: AttributionData;
  device: DeviceInfo;
  location: LocationInfo;
  topInterests: DerivedInterest[];
  primaryInterest?: ContentVertical;
  secondaryInterest?: ContentVertical;
  engagement: EngagementLevel;
  intent: IntentLevel;
  maxScrollDepth: number;
  contentStats?: ContentStats;
  journeySummary?: string;
  timeline?: TimelineEntry[];
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
