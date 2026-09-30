import {
  ContentVertical,
  DerivedInterest,
  EngagementLevel,
  EnrichedSessionData,
  LocationInfo,
  VisitorBatchRequest,
} from '@/types/visitor-intelligence';
import {
  sendKeyActionAlert,
  sendVisitorSessionSummary,
} from './telegram-intelligence';

export interface StoredSession {
  sessionId: string;
  visitorId: string;
  isNewVisitor: boolean;
  visitCount: number;
  sessionCount: number;
  startedAt: number;
  lastActivityAt: number;
  landingPage: string;
  lastRoute: string;
  pagesViewed: Set<string>;
  maxScrollDepth: number;
  eventsCount: number;
  interestsMap: Map<ContentVertical, number>;
  location: LocationInfo;
  device: VisitorBatchRequest['device'];
  attribution: VisitorBatchRequest['firstTouch'];
}

// In-memory active session store
const activeSessions = new Map<string, StoredSession>();

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

export function extractLocationFromHeaders(headers: Headers): LocationInfo {
  const country =
    headers.get('x-vercel-ip-country') ||
    headers.get('cf-ipcountry') ||
    'RO';

  const region =
    headers.get('x-vercel-ip-country-region') ||
    undefined;

  const rawCity =
    headers.get('x-vercel-ip-city') ||
    undefined;

  const city = rawCity ? decodeURIComponent(rawCity) : undefined;

  return {
    country: country.toUpperCase(),
    region,
    city,
    precision: 'approximate',
  };
}

export function maskIp(ip: string | null | undefined): string {
  if (!ip) return '127.0.0.***';
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
  }
  if (ip.includes(':')) {
    const parts = ip.split(':');
    return `${parts[0]}:${parts[1] || ''}:****`;
  }
  return 'masked';
}

const ALLOWED_EVENT_TYPES = new Set<string>([
  'session_start',
  'page_view',
  'article_view',
  'category_view',
  'search',
  'cta_click',
  'contact_open',
  'contact_submit',
  'newsletter_signup',
  'phone_click',
  'whatsapp_click',
  'telegram_click',
  'external_link_click',
  'download',
  'video_play',
  'video_complete',
  'scroll_depth',
  'return_visit',
]);

const ID_REGEX = /^[a-zA-Z0-9_-]{3,64}$/;

function sanitizeId(id: string | null | undefined, prefix: string): string {
  if (typeof id === 'string' && ID_REGEX.test(id)) {
    return id;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export class ServerIntelligenceService {
  static async processBatch(
    batch: VisitorBatchRequest,
    headers: Headers
  ): Promise<{ processed: number; sessionId: string }> {
    const now = Date.now();
    const location = extractLocationFromHeaders(headers);

    const safeVisitorId = sanitizeId(batch.visitorId, 'vf');
    const safeSessionId = sanitizeId(batch.sessionId, 'sess');

    let session = activeSessions.get(safeSessionId);

    if (!session) {
      session = {
        sessionId: safeSessionId,
        visitorId: safeVisitorId,
        isNewVisitor: Boolean(batch.isNewVisitor),
        visitCount: typeof batch.visitCount === 'number' && batch.visitCount > 0 ? Math.min(batch.visitCount, 10000) : 1,
        sessionCount: typeof batch.sessionCount === 'number' && batch.sessionCount > 0 ? Math.min(batch.sessionCount, 10000) : 1,
        startedAt: typeof batch.firstSeen === 'number' && batch.firstSeen > 0 ? batch.firstSeen : now,
        lastActivityAt: now,
        landingPage: typeof batch.firstTouch?.landingPage === 'string' ? batch.firstTouch.landingPage.slice(0, 300) : '/',
        lastRoute: '/',
        pagesViewed: new Set<string>(),
        maxScrollDepth: typeof batch.maxScrollDepth === 'number' ? Math.min(Math.max(batch.maxScrollDepth, 0), 100) : 0,
        eventsCount: 0,
        interestsMap: new Map<ContentVertical, number>(),
        location,
        device: batch.device,
        attribution: batch.firstTouch || batch.lastTouch || {},
      };
      activeSessions.set(safeSessionId, session);
    }

    session.lastActivityAt = now;
    if (batch.device) {
      session.device = batch.device;
    }
    if (typeof batch.maxScrollDepth === 'number' && batch.maxScrollDepth > session.maxScrollDepth) {
      session.maxScrollDepth = Math.min(batch.maxScrollDepth, 100);
    }

    let processedCount = 0;

    // Process all incoming events with strict allowlist and boundary validation
    if (Array.isArray(batch.events)) {
      for (const event of batch.events) {
        if (!event || typeof event !== 'object') continue;
        if (!ALLOWED_EVENT_TYPES.has(event.eventType)) continue;

        const safeRoute = typeof event.route === 'string' ? event.route.slice(0, 300) : '/';
        session.eventsCount++;
        session.lastRoute = safeRoute;
        processedCount++;

        if (event.eventType === 'page_view' || event.eventType === 'article_view') {
          session.pagesViewed.add(safeRoute);
        }

        // Record interests based on category
        if (event.category && typeof event.category === 'string') {
          const cat = event.category.slice(0, 50) as ContentVertical;
          const current = session.interestsMap.get(cat) || 0;
          const add = event.eventType === 'cta_click' ? 3 : event.eventType === 'article_view' ? 2 : 1;
          session.interestsMap.set(cat, current + add);
        }

        // Sanitize event metadata
        let sanitizedMetadata: Record<string, string | number | boolean | null> | undefined = undefined;
        if (event.metadata && typeof event.metadata === 'object') {
          sanitizedMetadata = {};
          const keys = Object.keys(event.metadata).slice(0, 10);
          for (const key of keys) {
            const val = event.metadata[key];
            if (typeof val === 'string') {
              sanitizedMetadata[key] = val.slice(0, 200);
            } else if (typeof val === 'number' || typeof val === 'boolean' || val === null) {
              sanitizedMetadata[key] = val;
            }
          }
        }

        const sanitizedEvent = {
          ...event,
          route: safeRoute,
          metadata: sanitizedMetadata,
        };

        // Check for Level 3 high-priority key actions to alert immediately
        await this.handleKeyActionTrigger(sanitizedEvent, session);
      }
    }

    // Check if we should send or update Level 2 visitor summary
    await this.evaluateVisitorSummary(session, batch);

    // Maintenance cleanup
    if (activeSessions.size > 3000) {
      const cutoff = now - 2 * 60 * 60 * 1000; // 2 hours
      for (const [sid, s] of activeSessions.entries()) {
        if (s.lastActivityAt < cutoff) {
          activeSessions.delete(sid);
        }
      }
    }

    return {
      processed: processedCount,
      sessionId: session.sessionId,
    };
  }

  private static calculateEngagement(session: StoredSession): EngagementLevel {
    const durationSec = Math.max(0, Math.floor((session.lastActivityAt - session.startedAt) / 1000));
    const pagesCount = session.pagesViewed.size;
    const scroll = session.maxScrollDepth;

    if (pagesCount >= 4 || durationSec >= 180 || scroll >= 80) {
      return 'High';
    }
    if (pagesCount >= 2 || durationSec >= 45 || scroll >= 50) {
      return 'Medium';
    }
    return 'Low';
  }

  private static getTopInterests(session: StoredSession): DerivedInterest[] {
    const sorted = Array.from(session.interestsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return sorted.map(([category, score]) => ({
      category,
      score,
      evidence: [`${score} interaction points`],
    }));
  }

  private static async handleKeyActionTrigger(
    event: VisitorBatchRequest['events'][0],
    session: StoredSession
  ): Promise<void> {
    const { eventType, route, metadata } = event;

    let shouldAlert = false;
    let label = '';
    let details: string | undefined = undefined;

    switch (eventType) {
      case 'phone_click':
        shouldAlert = true;
        label = 'Phone Call Initiated';
        details = metadata?.phone ? String(metadata.phone) : 'Click on phone number link';
        break;
      case 'whatsapp_click':
        shouldAlert = true;
        label = 'WhatsApp Inquiry Initiated';
        details = metadata?.target ? String(metadata.target) : 'Click on WhatsApp button';
        break;
      case 'telegram_click':
        shouldAlert = true;
        label = 'Telegram Channel / Chat Click';
        details = metadata?.target ? String(metadata.target) : 'Click on Telegram link';
        break;
      case 'newsletter_signup':
        shouldAlert = true;
        label = 'Newsletter Subscription';
        details = metadata?.email ? String(metadata.email) : 'Submitted newsletter form';
        break;
      case 'search':
        if (metadata?.query && String(metadata.query).trim().length > 1) {
          shouldAlert = true;
          label = 'Site Search Performed';
          details = `Query: "${metadata.query}" (${metadata.resultsCount ?? 0} results)`;
        }
        break;
      case 'cta_click':
        if (metadata?.cta) {
          shouldAlert = true;
          label = `CTA: ${metadata.cta}`;
          details = metadata.target ? `Target: ${metadata.target}` : undefined;
        }
        break;
      default:
        break;
    }

    if (shouldAlert) {
      const durationSec = Math.max(0, Math.floor((session.lastActivityAt - session.startedAt) / 1000));
      await sendKeyActionAlert({
        visitorId: session.visitorId,
        sessionId: session.sessionId,
        eventType,
        label,
        details,
        route,
        location: { city: session.location.city, country: session.location.country },
        device: session.device,
        attribution: { source: session.attribution?.source, medium: session.attribution?.medium },
        durationFormatted: formatDuration(durationSec),
        pagesCount: session.pagesViewed.size,
      });
    }
  }

  private static async evaluateVisitorSummary(
    session: StoredSession,
    batch: VisitorBatchRequest
  ): Promise<void> {
    const durationSec = Math.max(0, Math.floor((session.lastActivityAt - session.startedAt) / 1000));
    const topInterests = this.getTopInterests(session);
    const engagement = this.calculateEngagement(session);

    const enriched: EnrichedSessionData = {
      sessionId: session.sessionId,
      visitorId: session.visitorId,
      isNewVisitor: session.isNewVisitor,
      visitCount: session.visitCount,
      sessionCount: session.sessionCount,
      startedAt: new Date(session.startedAt).toLocaleString('ro-RO', {
        timeZone: 'Europe/Bucharest',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      lastActivityAt: new Date(session.lastActivityAt).toLocaleString('ro-RO', {
        timeZone: 'Europe/Bucharest',
        hour: '2-digit',
        minute: '2-digit',
      }),
      sessionDurationFormatted: formatDuration(durationSec),
      landingPage: session.landingPage,
      lastRoute: session.lastRoute,
      pagesViewed: Array.from(session.pagesViewed),
      pageCount: session.pagesViewed.size || 1,
      attribution: session.attribution,
      device: session.device,
      location: session.location,
      topInterests,
      engagement,
      maxScrollDepth: session.maxScrollDepth,
      lastAction: batch.events[batch.events.length - 1]
        ? {
            type: batch.events[batch.events.length - 1]!.eventType,
            label: batch.events[batch.events.length - 1]!.eventType.replace('_', ' ').toUpperCase(),
            details: batch.events[batch.events.length - 1]!.route,
          }
        : undefined,
    };

    // Send summary on session start / returning visit
    await sendVisitorSessionSummary(enriched, false);
  }

  static getSession(sessionId: string): StoredSession | undefined {
    return activeSessions.get(sessionId);
  }

  static getAllActiveSessions(): StoredSession[] {
    return Array.from(activeSessions.values());
  }
}
