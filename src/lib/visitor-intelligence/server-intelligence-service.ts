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

export class ServerIntelligenceService {
  static async processBatch(
    batch: VisitorBatchRequest,
    headers: Headers
  ): Promise<{ processed: number; sessionId: string }> {
    const now = Date.now();
    const location = extractLocationFromHeaders(headers);

    let session = activeSessions.get(batch.sessionId);

    if (!session) {
      session = {
        sessionId: batch.sessionId,
        visitorId: batch.visitorId,
        isNewVisitor: batch.isNewVisitor,
        visitCount: batch.visitCount,
        sessionCount: batch.sessionCount,
        startedAt: batch.firstSeen || now,
        lastActivityAt: now,
        landingPage: batch.firstTouch?.landingPage || batch.events[0]?.route || '/',
        lastRoute: batch.events[batch.events.length - 1]?.route || '/',
        pagesViewed: new Set<string>(),
        maxScrollDepth: batch.maxScrollDepth || 0,
        eventsCount: 0,
        interestsMap: new Map<ContentVertical, number>(),
        location,
        device: batch.device,
        attribution: batch.firstTouch || batch.lastTouch || {},
      };
      activeSessions.set(batch.sessionId, session);
    }

    session.lastActivityAt = now;
    session.device = batch.device;
    if (batch.maxScrollDepth && batch.maxScrollDepth > session.maxScrollDepth) {
      session.maxScrollDepth = batch.maxScrollDepth;
    }

    // Process all incoming events
    for (const event of batch.events) {
      session.eventsCount++;
      session.lastRoute = event.route;

      if (event.eventType === 'page_view' || event.eventType === 'article_view') {
        session.pagesViewed.add(event.route);
      }

      // Record interests based on category
      if (event.category) {
        const cat = event.category as ContentVertical;
        const current = session.interestsMap.get(cat) || 0;
        const add = event.eventType === 'cta_click' ? 3 : event.eventType === 'article_view' ? 2 : 1;
        session.interestsMap.set(cat, current + add);
      }

      // Check for Level 3 high-priority key actions to alert immediately
      await this.handleKeyActionTrigger(event, session);
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
      processed: batch.events.length,
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
