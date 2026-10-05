'use client';

import {
  AttributionData,
  DeviceInfo,
  EventType,
  VisitorBatchRequest,
  VisitorEventPayload,
} from '@/types/visitor-intelligence';

const STORAGE_KEYS = {
  VISITOR_ID: 'aix_vid',
  FIRST_SEEN: 'aix_v_first_seen',
  LAST_SEEN: 'aix_v_last_seen',
  VISIT_COUNT: 'aix_v_visits',
  FIRST_TOUCH: 'aix_v_ft',
  SESSION_COUNT: 'aix_v_sessions',
  INTERESTS: 'aix_v_interests',
};

const SESSION_KEYS = {
  SESSION_ID: 'aix_sid',
  SESSION_START: 'aix_s_start',
  PAGES_VIEWED: 'aix_s_pages',
  LAST_TOUCH: 'aix_s_lt',
  LAST_ACTIVITY: 'aix_s_activity',
  MAX_SCROLL: 'aix_s_scroll',
};

function generateId(prefix: 'vf' | 'sess' | 'evt'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let random = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(10);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < 10; i++) {
      random += chars[bytes[i]! % chars.length];
    }
  } else {
    for (let i = 0; i < 10; i++) {
      random += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return `${prefix}_${random}`;
}

export function parseAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || undefined;
  const utmMedium = urlParams.get('utm_medium') || undefined;
  const utmCampaign = urlParams.get('utm_campaign') || undefined;
  const utmTerm = urlParams.get('utm_term') || undefined;
  const utmContent = urlParams.get('utm_content') || undefined;

  let rawReferrer = '';
  let referrerHost = 'Direct';

  if (document.referrer) {
    rawReferrer = document.referrer;
    try {
      const refUrl = new URL(document.referrer);
      if (refUrl.hostname !== window.location.hostname) {
        referrerHost = refUrl.hostname.replace(/^www\./, '');
      }
    } catch {
      referrerHost = 'External';
    }
  }

  // Derive normalized source
  let normalizedSource = utmSource;
  let normalizedMedium = utmMedium;

  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes('telegram') || s === 'tg') normalizedSource = 'Telegram';
    else if (s.includes('instagram') || s === 'ig') normalizedSource = 'Instagram';
    else if (s.includes('facebook') || s === 'fb') normalizedSource = 'Facebook';
    else if (s.includes('youtube') || s === 'yt') normalizedSource = 'YouTube';
    else if (s.includes('google')) normalizedSource = 'Google';
    else if (s.includes('linkedin')) normalizedSource = 'LinkedIn';
    else if (s.includes('newsletter') || s.includes('email')) normalizedSource = 'Newsletter';
    else normalizedSource = utmSource;
  } else if (referrerHost !== 'Direct') {
    const ref = referrerHost.toLowerCase();
    if (ref.includes('google.')) {
      normalizedSource = 'Google';
      normalizedMedium = 'organic';
    } else if (ref.includes('instagram.') || ref.includes('l.instagram.')) {
      normalizedSource = 'Instagram';
      normalizedMedium = 'social';
    } else if (ref.includes('facebook.') || ref.includes('fb.me') || ref.includes('l.facebook.')) {
      normalizedSource = 'Facebook';
      normalizedMedium = 'social';
    } else if (ref.includes('t.me') || ref.includes('telegram.')) {
      normalizedSource = 'Telegram';
      normalizedMedium = 'social';
    } else if (ref.includes('youtube.') || ref.includes('youtu.be')) {
      normalizedSource = 'YouTube';
      normalizedMedium = 'social';
    } else if (ref.includes('linkedin.') || ref.includes('lnkd.in')) {
      normalizedSource = 'LinkedIn';
      normalizedMedium = 'social';
    } else if (ref.includes('twitter.') || ref.includes('x.com') || ref.includes('t.co')) {
      normalizedSource = 'X/Twitter';
      normalizedMedium = 'social';
    } else if (ref.includes('economedia.')) {
      normalizedSource = 'Economedia';
      normalizedMedium = 'referral';
    } else if (ref.includes('hotnews.')) {
      normalizedSource = 'HotNews';
      normalizedMedium = 'referral';
    } else {
      normalizedSource = 'Referral';
      normalizedMedium = 'referral';
    }
  } else {
    normalizedSource = 'Direct';
    normalizedMedium = 'none';
  }

  return {
    source: normalizedSource,
    medium: normalizedMedium || 'none',
    campaign: utmCampaign,
    term: utmTerm,
    content: utmContent,
    referrer: referrerHost,
    rawReferrer: rawReferrer || undefined,
    landingPage: window.location.pathname,
  };
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'Desktop',
      os: 'Unknown',
      browser: 'Unknown',
      screen: '1920x1080',
      language: 'ro-RO',
      timezone: 'Europe/Bucharest',
    };
  }

  const ua = navigator.userAgent;
  let deviceType: DeviceInfo['deviceType'] = 'Desktop';
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    deviceType = 'Mobile';
  }

  let os = 'Other';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Other';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';

  const screenWidth = window.screen?.width || window.innerWidth || 0;
  const screenHeight = window.screen?.height || window.innerHeight || 0;
  const screenStr = `${screenWidth}×${screenHeight}`;
  const language = navigator.language || 'ro-RO';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Bucharest';

  return {
    deviceType,
    os,
    browser,
    screen: screenStr,
    language,
    timezone,
  };
}

export function detectRouteCategory(path: string): string | undefined {
  const p = path.toLowerCase();
  if (p.startsWith('/real-estate')) return 'Real Estate';
  if (p.startsWith('/business')) return 'Business';
  if (p.startsWith('/finance')) return 'Finance';
  if (p.startsWith('/markets')) return 'Markets';
  if (p.startsWith('/companies')) return 'Companies';
  if (p.startsWith('/insurance')) return 'Insurance';
  if (p.startsWith('/credits')) return 'Credits';
  if (p.startsWith('/investments')) return 'Investments';
  if (p.startsWith('/tv') || p.startsWith('/video') || p.startsWith('/podcast')) return 'Video';
  if (p.startsWith('/news')) return 'News';
  return undefined;
}

export class VisitorStore {
  private static eventQueue: VisitorEventPayload[] = [];
  private static isSending = false;
  private static lastActivityTimestamp = Date.now();
  private static scrollMax = 0;

  static initialize(): {
    visitorId: string;
    sessionId: string;
    isNewVisitor: boolean;
    visitCount: number;
    sessionCount: number;
    firstSeen: number;
    lastSeen: number;
    firstTouch: AttributionData;
    lastTouch: AttributionData;
  } {
    if (typeof window === 'undefined') {
      return {
        visitorId: 'vf_server',
        sessionId: 'sess_server',
        isNewVisitor: false,
        visitCount: 1,
        sessionCount: 1,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
        firstTouch: {},
        lastTouch: {},
      };
    }

    const now = Date.now();
    let isNewVisitor = false;

    // 1. Visitor Profile
    let visitorId = '';
    let firstSeen = now;
    let visitCount = 1;
    let firstTouch: AttributionData = {};

    try {
      visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID) || '';
      if (!visitorId) {
        visitorId = generateId('vf');
        isNewVisitor = true;
        firstSeen = now;
        firstTouch = parseAttribution();
        localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
        localStorage.setItem(STORAGE_KEYS.FIRST_SEEN, firstSeen.toString());
        localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, '1');
        localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH, JSON.stringify(firstTouch));
      } else {
        const storedFirstSeen = localStorage.getItem(STORAGE_KEYS.FIRST_SEEN);
        if (storedFirstSeen) firstSeen = parseInt(storedFirstSeen, 10);
        const storedVisits = localStorage.getItem(STORAGE_KEYS.VISIT_COUNT);
        visitCount = storedVisits ? parseInt(storedVisits, 10) : 1;
        const storedFt = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH);
        if (storedFt) {
          try {
            firstTouch = JSON.parse(storedFt);
          } catch {
            firstTouch = {};
          }
        }
      }
      localStorage.setItem(STORAGE_KEYS.LAST_SEEN, now.toString());
    } catch {
      visitorId = visitorId || generateId('vf');
    }

    // 2. Session Profile
    let sessionId = '';
    let sessionCount = 1;
    let lastTouch: AttributionData = {};

    try {
      sessionId = sessionStorage.getItem(SESSION_KEYS.SESSION_ID) || '';
      if (!sessionId) {
        sessionId = generateId('sess');
        lastTouch = parseAttribution();
        sessionStorage.setItem(SESSION_KEYS.SESSION_ID, sessionId);
        sessionStorage.setItem(SESSION_KEYS.SESSION_START, now.toString());
        sessionStorage.setItem(SESSION_KEYS.PAGES_VIEWED, JSON.stringify([window.location.pathname]));
        sessionStorage.setItem(SESSION_KEYS.LAST_TOUCH, JSON.stringify(lastTouch));

        if (!isNewVisitor) {
          visitCount += 1;
          try {
            localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, visitCount.toString());
          } catch {
            // Ignore
          }
        }

        const storedSessionCount = localStorage.getItem(STORAGE_KEYS.SESSION_COUNT);
        sessionCount = storedSessionCount ? parseInt(storedSessionCount, 10) + 1 : 1;
        try {
          localStorage.setItem(STORAGE_KEYS.SESSION_COUNT, sessionCount.toString());
        } catch {
          // Ignore
        }
      } else {
        const storedLt = sessionStorage.getItem(SESSION_KEYS.LAST_TOUCH);
        if (storedLt) {
          try {
            lastTouch = JSON.parse(storedLt);
          } catch {
            lastTouch = {};
          }
        }
        const storedSc = localStorage.getItem(STORAGE_KEYS.SESSION_COUNT);
        sessionCount = storedSc ? parseInt(storedSc, 10) : 1;
      }
      sessionStorage.setItem(SESSION_KEYS.LAST_ACTIVITY, now.toString());
    } catch {
      sessionId = sessionId || generateId('sess');
    }

    return {
      visitorId,
      sessionId,
      isNewVisitor,
      visitCount,
      sessionCount,
      firstSeen,
      lastSeen: now,
      firstTouch,
      lastTouch,
    };
  }

  static getVisitorId(): string {
    if (typeof window === 'undefined') return 'vf_server';
    try {
      return localStorage.getItem(STORAGE_KEYS.VISITOR_ID) || '';
    } catch {
      return '';
    }
  }

  static getSessionId(): string {
    if (typeof window === 'undefined') return 'sess_server';
    try {
      return sessionStorage.getItem(SESSION_KEYS.SESSION_ID) || '';
    } catch {
      return '';
    }
  }

  static recordInterest(category: string, weight = 1): void {
    if (typeof window === 'undefined' || !category) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INTERESTS);
      const interests: Record<string, number> = stored ? JSON.parse(stored) : {};
      interests[category] = (interests[category] || 0) + weight;
      localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(interests));
    } catch {
      // Storage restricted
    }
  }

  static getInterests(): Record<string, number> {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INTERESTS);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  static updateScrollDepth(depthPercent: number): void {
    if (depthPercent > this.scrollMax) {
      this.scrollMax = depthPercent;
      try {
        sessionStorage.setItem(SESSION_KEYS.MAX_SCROLL, depthPercent.toString());
      } catch {
        // Storage restricted
      }
    }
  }

  static getScrollDepth(): number {
    if (this.scrollMax > 0) return this.scrollMax;
    try {
      const stored = sessionStorage.getItem(SESSION_KEYS.MAX_SCROLL);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }

  static pushEvent(
    eventType: EventType,
    route: string,
    metadata?: Record<string, string | number | boolean | null>,
    contentId?: string,
    forceImmediate = false
  ): void {
    const context = this.initialize();
    const category = detectRouteCategory(route);

    if (category) {
      const weight =
        eventType === 'contact_submit'
          ? 15
          : eventType === 'phone_click' || eventType === 'whatsapp_click' || eventType === 'telegram_click'
          ? 8
          : eventType === 'cta_click' || eventType === 'contact_open'
          ? 5
          : eventType === 'property_view' || eventType === 'video_complete'
          ? 4
          : eventType === 'search'
          ? 3
          : eventType === 'article_view' || eventType === 'category_view' || eventType === 'video_play'
          ? 2
          : 1;

      this.recordInterest(category, weight);
    }

    const event: VisitorEventPayload = {
      eventId: generateId('evt'),
      visitorId: context.visitorId,
      sessionId: context.sessionId,
      eventType,
      route,
      contentId,
      category,
      metadata: {
        ...metadata,
        scrollDepth: this.getScrollDepth(),
      },
      timestamp: Date.now(),
    };

    this.eventQueue.push(event);

    const isHighPriority =
      forceImmediate ||
      eventType === 'page_view' ||
      eventType === 'article_view' ||
      eventType === 'category_view' ||
      eventType === 'property_view' ||
      eventType === 'phone_click' ||
      eventType === 'whatsapp_click' ||
      eventType === 'telegram_click' ||
      eventType === 'cta_click' ||
      eventType === 'contact_open' ||
      eventType === 'contact_submit' ||
      eventType === 'newsletter_signup' ||
      eventType === 'search' ||
      eventType === 'session_start' ||
      eventType === 'return_visit';

    this.scheduleBatchSend(isHighPriority);
  }

  private static batchTimer: NodeJS.Timeout | null = null;

  static scheduleBatchSend(immediate = false): void {
    if (typeof window === 'undefined') return;

    if (immediate) {
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
        this.batchTimer = null;
      }
      this.batchTimer = setTimeout(() => {
        this.batchTimer = null;
        this.flushQueue();
      }, 150);
    } else {
      if (this.batchTimer) return;
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => this.flushQueue(), { timeout: 2000 });
      } else {
        this.batchTimer = setTimeout(() => {
          this.batchTimer = null;
          this.flushQueue();
        }, 1500);
      }
    }
  }

  static async flushQueue(): Promise<void> {
    if (this.eventQueue.length === 0 || this.isSending) return;
    this.isSending = true;

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];

    const context = this.initialize();
    const device = getDeviceInfo();
    const interests = this.getInterests();
    const scroll = this.getScrollDepth();

    const timeOnPage = Math.max(0, Math.floor((Date.now() - this.lastActivityTimestamp) / 1000));
    this.lastActivityTimestamp = Date.now();

    const payload: VisitorBatchRequest = {
      visitorId: context.visitorId,
      sessionId: context.sessionId,
      isNewVisitor: context.isNewVisitor,
      visitCount: context.visitCount,
      sessionCount: context.sessionCount,
      firstSeen: context.firstSeen,
      lastSeen: context.lastSeen,
      firstTouch: context.firstTouch,
      lastTouch: context.lastTouch,
      device,
      events: eventsToSend,
      interests,
      timeOnPageSeconds: timeOnPage,
      maxScrollDepth: scroll,
    };

    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.sendBeacon &&
        eventsToSend.length === 1 &&
        eventsToSend[0]?.eventType === 'scroll_depth'
      ) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/visitor', blob);
      } else {
        await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    } catch {
      // Re-queue events on transient network failure
      this.eventQueue.unshift(...eventsToSend);
    } finally {
      this.isSending = false;
    }
  }
}
