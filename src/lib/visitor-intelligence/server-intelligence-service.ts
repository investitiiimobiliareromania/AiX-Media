import {
  ContentVertical,
  DerivedInterest,
  EngagementLevel,
  EnrichedSessionData,
  IntentLevel,
  LocationInfo,
  TimelineEntry,
  VisitorBatchRequest,
} from '@/types/visitor-intelligence';
import {
  sendKeyActionAlert,
  sendNavigationAlert,
  sendVisitorSessionSummary,
} from './telegram-intelligence';
import { createAdminClient } from '@/lib/supabase/admin';

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
  previousRoute?: string;
  pagesViewed: Set<string>;
  maxScrollDepth: number;
  eventsCount: number;
  articlesCount: number;
  propertiesCount: number;
  videosCount: number;
  searchesCount: number;
  ctasCount: number;
  interestsMap: Map<ContentVertical, number>;
  location: LocationInfo;
  device: VisitorBatchRequest['device'];
  attribution: VisitorBatchRequest['firstTouch'];
  timeline: TimelineEntry[];
  journeySteps: string[];
  initialAlertSent: boolean;
  lastNotifiedPageCount: number;
  lastNotifiedIntent?: IntentLevel;
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
  const rawCountry =
    headers.get('x-vercel-ip-country') ||
    headers.get('cf-ipcountry') ||
    'RO';

  const rawRegion =
    headers.get('x-vercel-ip-country-region') ||
    undefined;

  const rawCity =
    headers.get('x-vercel-ip-city') ||
    undefined;

  let city: string | undefined = undefined;
  if (rawCity) {
    try {
      city = decodeURIComponent(rawCity).replace(/[<>"'&]/g, '').trim().slice(0, 100);
    } catch {
      city = rawCity.replace(/[<>"'&]/g, '').trim().slice(0, 100);
    }
  }

  const cleanCountry = rawCountry.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || 'RO';
  const cleanRegion = rawRegion ? rawRegion.replace(/[<>"'&]/g, '').trim().slice(0, 50) : undefined;
  const timezone = headers.get('x-vercel-ip-timezone') || 'Europe/Bucharest';

  return {
    country: cleanCountry,
    region: cleanRegion,
    city: city || undefined,
    timezone,
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
  'return_visit',
  'article_view',
  'category_view',
  'property_view',
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
      const initialLanding =
        typeof batch.firstTouch?.landingPage === 'string'
          ? batch.firstTouch.landingPage.slice(0, 300)
          : (batch.events?.[0]?.route?.slice(0, 300) || '/');

      session = {
        sessionId: safeSessionId,
        visitorId: safeVisitorId,
        isNewVisitor: Boolean(batch.isNewVisitor),
        visitCount: typeof batch.visitCount === 'number' && batch.visitCount > 0 ? Math.min(batch.visitCount, 10000) : 1,
        sessionCount: typeof batch.sessionCount === 'number' && batch.sessionCount > 0 ? Math.min(batch.sessionCount, 10000) : 1,
        startedAt: typeof batch.firstSeen === 'number' && batch.firstSeen > 0 ? batch.firstSeen : now,
        lastActivityAt: now,
        landingPage: initialLanding,
        lastRoute: initialLanding,
        previousRoute: undefined,
        pagesViewed: new Set<string>(),
        maxScrollDepth: typeof batch.maxScrollDepth === 'number' ? Math.min(Math.max(batch.maxScrollDepth, 0), 100) : 0,
        eventsCount: 0,
        articlesCount: 0,
        propertiesCount: 0,
        videosCount: 0,
        searchesCount: 0,
        ctasCount: 0,
        interestsMap: new Map<ContentVertical, number>(),
        location,
        device: batch.device,
        attribution: batch.firstTouch || batch.lastTouch || {},
        timeline: [],
        journeySteps: [initialLanding],
        initialAlertSent: false,
        lastNotifiedPageCount: 0,
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
    let hasNewRoute = false;
    let hasSearch = false;

    // Process incoming events with deterministic scoring and timeline enrichment
    if (Array.isArray(batch.events)) {
      for (const event of batch.events) {
        if (!event || typeof event !== 'object') continue;
        if (!ALLOWED_EVENT_TYPES.has(event.eventType)) continue;

        const safeRoute = typeof event.route === 'string' ? event.route.slice(0, 300) : '/';
        session.eventsCount++;
        processedCount++;

        // Track content counts
        if (event.eventType === 'article_view') session.articlesCount++;
        else if (event.eventType === 'property_view') session.propertiesCount++;
        else if (event.eventType === 'video_play' || event.eventType === 'video_complete') session.videosCount++;
        else if (event.eventType === 'search') {
          session.searchesCount++;
          hasSearch = true;
        } else if (
          event.eventType === 'cta_click' ||
          event.eventType === 'phone_click' ||
          event.eventType === 'whatsapp_click' ||
          event.eventType === 'telegram_click' ||
          event.eventType === 'contact_open' ||
          event.eventType === 'contact_submit'
        ) {
          session.ctasCount++;
        }

        const isNavEvent =
          event.eventType === 'page_view' ||
          event.eventType === 'article_view' ||
          event.eventType === 'category_view' ||
          event.eventType === 'property_view';

        if (isNavEvent) {
          session.pagesViewed.add(safeRoute);
          if (session.lastRoute !== safeRoute) {
            session.previousRoute = session.lastRoute;
            session.lastRoute = safeRoute;
            hasNewRoute = true;
            if (!session.journeySteps.includes(safeRoute)) {
              session.journeySteps.push(safeRoute);
            }
          }
        }

        // Deterministic Interest Scoring
        if (event.category && typeof event.category === 'string') {
          const cat = event.category.slice(0, 50) as ContentVertical;
          const current = session.interestsMap.get(cat) || 0;
          let weight = 1;

          switch (event.eventType) {
            case 'contact_submit':
              weight = 15;
              break;
            case 'phone_click':
            case 'whatsapp_click':
            case 'telegram_click':
              weight = 8;
              break;
            case 'cta_click':
            case 'contact_open':
              weight = 5;
              break;
            case 'property_view':
            case 'video_complete':
              weight = 4;
              break;
            case 'search':
              weight = 3;
              break;
            case 'article_view':
            case 'category_view':
            case 'video_play':
              weight = 2;
              break;
            default:
              weight = 1;
              break;
          }

          session.interestsMap.set(cat, current + weight);
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

        // Add to chronological timeline
        const timeStr = new Date(event.timestamp || now).toLocaleTimeString('ro-RO', {
          timeZone: 'Europe/Bucharest',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        let timelineLabel = 'Action';
        switch (event.eventType) {
          case 'session_start':
            timelineLabel = 'Landing';
            break;
          case 'return_visit':
            timelineLabel = 'Return Visit';
            break;
          case 'page_view':
            timelineLabel = 'Page View';
            break;
          case 'article_view':
            timelineLabel = 'Article View';
            break;
          case 'property_view':
            timelineLabel = 'Property View';
            break;
          case 'category_view':
            timelineLabel = 'Category View';
            break;
          case 'scroll_depth':
            timelineLabel = `Scroll ${sanitizedMetadata?.depth || 0}%`;
            break;
          case 'cta_click':
            timelineLabel = `CTA: ${sanitizedMetadata?.cta || 'Click'}`;
            break;
          case 'phone_click':
            timelineLabel = 'Phone Call';
            break;
          case 'whatsapp_click':
            timelineLabel = 'WhatsApp Chat';
            break;
          case 'telegram_click':
            timelineLabel = 'Telegram Channel';
            break;
          case 'contact_open':
            timelineLabel = 'Contact Open';
            break;
          case 'contact_submit':
            timelineLabel = 'Contact Submit';
            break;
          case 'newsletter_signup':
            timelineLabel = 'Newsletter';
            break;
          case 'search':
            timelineLabel = `Search: "${sanitizedMetadata?.query || ''}"`;
            break;
          case 'external_link_click':
            timelineLabel = 'External Link';
            break;
          case 'download':
            timelineLabel = 'Download';
            break;
          case 'video_play':
            timelineLabel = 'Video Play';
            break;
          case 'video_complete':
            timelineLabel = 'Video Complete';
            break;
          default:
            timelineLabel = event.eventType;
        }

        session.timeline.push({
          time: timeStr,
          type: event.eventType,
          label: timelineLabel,
          route: safeRoute,
          details: typeof sanitizedMetadata?.details === 'string' ? sanitizedMetadata.details : undefined,
        });

        if (session.timeline.length > 20) {
          session.timeline.shift();
        }

        const sanitizedEvent = {
          ...event,
          route: safeRoute,
          metadata: sanitizedMetadata,
        };

        // Level 3 High-Value Alert Trigger
        await this.handleKeyActionTrigger(sanitizedEvent, session);
      }
    }

    // Evaluate notifications: Level 1 Arrival vs Level 2 Live Intelligence
    await this.evaluateNotifications(session, batch, hasNewRoute, hasSearch);

    // Asynchronous Database Persistence (Non-blocking / best-effort)
    this.persistToSupabaseAsync(session, batch.events).catch((err) => {
      console.warn('[ServerIntelligenceService] Supabase persistence skipped/errored:', err?.message || err);
    });

    // In-memory maintenance cleanup
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

    if (pagesCount >= 5 || durationSec >= 180 || scroll >= 80) {
      return 'High';
    }
    if (pagesCount >= 2 || durationSec >= 45 || scroll >= 50) {
      return 'Medium';
    }
    return 'Low';
  }

  private static calculateIntent(session: StoredSession): IntentLevel {
    if (
      session.ctasCount >= 2 ||
      session.propertiesCount >= 3 ||
      session.searchesCount >= 2 ||
      session.visitCount >= 3
    ) {
      return 'High';
    }

    if (
      session.propertiesCount >= 1 ||
      session.searchesCount >= 1 ||
      session.ctasCount >= 1 ||
      session.pagesViewed.size >= 4 ||
      session.visitCount >= 2
    ) {
      return 'Medium';
    }

    return 'Low';
  }

  private static getTopInterests(session: StoredSession): DerivedInterest[] {
    const sorted = Array.from(session.interestsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return sorted.map(([category, score]) => {
      let intensity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
      let bar = '███░░░░░░░';

      if (score >= 12) {
        intensity = 'HIGH';
        bar = '██████████';
      } else if (score >= 6) {
        intensity = 'MEDIUM';
        bar = '███████░░░';
      } else {
        intensity = 'LOW';
        bar = '███░░░░░░░';
      }

      return {
        category,
        score,
        intensity,
        bar,
        evidence: [`${score} puncte de interacțiune`],
      };
    });
  }

  private static buildJourneySummary(session: StoredSession): string {
    const source = session.attribution?.source || 'Direct';
    const recentRoutes = session.journeySteps.slice(-5).map((r) => (r === '/' ? 'Home' : r.replace('/', '')));
    return [source, ...recentRoutes].join(' → ');
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
        details = metadata?.phone ? String(metadata.phone) : 'Click pe număr de telefon';
        break;
      case 'whatsapp_click':
        shouldAlert = true;
        label = 'WhatsApp Chat Initiated';
        details = metadata?.target ? String(metadata.target) : 'Click pe buton WhatsApp';
        break;
      case 'telegram_click':
        shouldAlert = true;
        label = 'Telegram Channel / Chat Click';
        details = metadata?.target ? String(metadata.target) : 'Click pe link Telegram';
        break;
      case 'contact_open':
        shouldAlert = true;
        label = 'Contact Form Opened';
        details = `Deschis pe ${route}`;
        break;
      case 'contact_submit':
        shouldAlert = true;
        label = 'Contact Form Submission';
        details = metadata?.source ? `Context: ${metadata.source}` : 'Formular trimis';
        break;
      case 'newsletter_signup':
        shouldAlert = true;
        label = 'Newsletter Subscription';
        details = metadata?.email ? String(metadata.email) : 'Abonat la newsletter';
        break;
      case 'search':
        if (metadata?.query && String(metadata.query).trim().length > 1) {
          shouldAlert = true;
          label = 'Site Search Performed';
          details = `Căutare: "${metadata.query}"`;
        }
        break;
      case 'cta_click':
        if (metadata?.cta) {
          shouldAlert = true;
          label = `CTA: ${metadata.cta}`;
          details = metadata.target ? `Target: ${metadata.target}` : undefined;
        }
        break;
      case 'download':
        shouldAlert = true;
        label = 'Report / File Download';
        details = metadata?.file ? String(metadata.file) : undefined;
        break;
      case 'video_play':
        shouldAlert = true;
        label = 'Video Play Initiated';
        details = metadata?.title ? String(metadata.title) : undefined;
        break;
      case 'video_complete':
        shouldAlert = true;
        label = 'Video Completed';
        details = metadata?.title ? String(metadata.title) : undefined;
        break;
      default:
        break;
    }

    if (shouldAlert) {
      const durationSec = Math.max(0, Math.floor((session.lastActivityAt - session.startedAt) / 1000));
      const topInterests = this.getTopInterests(session);

      await sendKeyActionAlert({
        visitorId: session.visitorId,
        sessionId: session.sessionId,
        isNewVisitor: session.isNewVisitor,
        visitCount: session.visitCount,
        eventType,
        label,
        details,
        route,
        location: { city: session.location.city, country: session.location.country },
        device: session.device,
        attribution: {
          source: session.attribution?.source,
          medium: session.attribution?.medium,
          landingPage: session.landingPage,
        },
        durationFormatted: formatDuration(durationSec),
        pagesCount: session.pagesViewed.size,
        articlesCount: session.articlesCount,
        propertiesCount: session.propertiesCount,
        topInterests,
      });
    }
  }

  private static async evaluateNotifications(
    session: StoredSession,
    batch: VisitorBatchRequest,
    hasNewRoute: boolean,
    hasSearch: boolean
  ): Promise<void> {
    const durationSec = Math.max(0, Math.floor((session.lastActivityAt - session.startedAt) / 1000));
    const topInterests = this.getTopInterests(session);
    const engagement = this.calculateEngagement(session);
    const intent = this.calculateIntent(session);
    const journeySummary = this.buildJourneySummary(session);

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
        second: '2-digit',
      }),
      sessionDurationFormatted: formatDuration(durationSec),
      landingPage: session.landingPage,
      lastRoute: session.lastRoute,
      previousRoute: session.previousRoute,
      pagesViewed: Array.from(session.pagesViewed),
      pageCount: session.pagesViewed.size || 1,
      attribution: session.attribution,
      device: session.device,
      location: session.location,
      topInterests,
      primaryInterest: topInterests[0]?.category,
      secondaryInterest: topInterests[1]?.category,
      engagement,
      intent,
      maxScrollDepth: session.maxScrollDepth,
      contentStats: {
        pagesCount: session.pagesViewed.size,
        articlesCount: session.articlesCount,
        propertiesCount: session.propertiesCount,
        videosCount: session.videosCount,
        searchesCount: session.searchesCount,
        ctasCount: session.ctasCount,
      },
      journeySummary,
      timeline: session.timeline,
      lastAction: batch.events[batch.events.length - 1]
        ? {
            type: batch.events[batch.events.length - 1]!.eventType,
            label: batch.events[batch.events.length - 1]!.eventType.replace('_', ' ').toUpperCase(),
            details: batch.events[batch.events.length - 1]!.route,
          }
        : undefined,
    };

    if (!session.initialAlertSent) {
      session.initialAlertSent = true;
      session.lastNotifiedPageCount = session.pagesViewed.size;
      session.lastNotifiedIntent = intent;
      await sendVisitorSessionSummary(enriched, true);
    } else {
      // Level 2 Intelligence: Fire on meaningful threshold crossings
      const isSignificantPageThreshold =
        session.pagesViewed.size >= 3 &&
        session.pagesViewed.size > session.lastNotifiedPageCount;

      const isIntentUpgrade = intent === 'High' && session.lastNotifiedIntent !== 'High';

      if (hasNewRoute && (isSignificantPageThreshold || isIntentUpgrade || hasSearch)) {
        session.lastNotifiedPageCount = session.pagesViewed.size;
        session.lastNotifiedIntent = intent;
        await sendNavigationAlert(enriched, false);
      }
    }
  }

  private static async persistToSupabaseAsync(
    session: StoredSession,
    events: VisitorBatchRequest['events']
  ): Promise<void> {
    try {
      const supabase = createAdminClient();
      const nowIso = new Date().toISOString();
      const topInterests = this.getTopInterests(session);

      // Upsert visitor profile
      await supabase.from('visitors').upsert({
        visitor_id: session.visitorId,
        last_seen: nowIso,
        visit_count: session.visitCount,
        session_count: session.sessionCount,
        first_source: session.attribution?.source || 'Direct',
        last_source: session.attribution?.source || 'Direct',
        first_landing_page: session.landingPage,
        last_landing_page: session.lastRoute,
        country: session.location.country,
        region: session.location.region || null,
        city: session.location.city || null,
        language: session.device?.language || 'ro-RO',
        timezone: session.location.timezone || 'Europe/Bucharest',
        device_type: session.device?.deviceType || 'Desktop',
        os: session.device?.os || 'Unknown',
        browser: session.device?.browser || 'Unknown',
        screen: session.device?.screen || '1920x1080',
        primary_interest: topInterests[0]?.category || null,
        secondary_interest: topInterests[1]?.category || null,
        engagement_level: this.calculateEngagement(session),
        intent_level: this.calculateIntent(session),
        updated_at: nowIso,
      }, { onConflict: 'visitor_id' });

      // Upsert session
      const durationSec = Math.max(0, Math.floor((session.lastActivityAt - session.startedAt) / 1000));
      await supabase.from('visitor_sessions').upsert({
        session_id: session.sessionId,
        visitor_id: session.visitorId,
        last_activity_at: nowIso,
        duration_seconds: durationSec,
        landing_page: session.landingPage,
        last_route: session.lastRoute,
        source: session.attribution?.source || 'Direct',
        medium: session.attribution?.medium || 'none',
        campaign: session.attribution?.campaign || null,
        referrer: session.attribution?.referrer || 'Direct',
        country: session.location.country,
        city: session.location.city || null,
        device_type: session.device?.deviceType || 'Desktop',
        os: session.device?.os || 'Unknown',
        browser: session.device?.browser || 'Unknown',
        page_count: session.pagesViewed.size,
        event_count: session.eventsCount,
        max_scroll_depth: session.maxScrollDepth,
        engagement_level: this.calculateEngagement(session),
        intent_level: this.calculateIntent(session),
        primary_interest: topInterests[0]?.category || null,
        updated_at: nowIso,
      }, { onConflict: 'session_id' });

      // Append events
      if (Array.isArray(events) && events.length > 0) {
        const rows = events.map((e) => ({
          event_id: e.eventId,
          session_id: session.sessionId,
          visitor_id: session.visitorId,
          event_type: e.eventType,
          route: e.route,
          category: e.category || null,
          content_id: e.contentId || null,
          metadata: e.metadata ? JSON.parse(JSON.stringify(e.metadata)) : null,
          created_at: new Date(e.timestamp || Date.now()).toISOString(),
        }));

        await supabase.from('visitor_events').insert(rows);
      }
    } catch {
      // Best-effort asynchronous logging: continue cleanly without raising
    }
  }

  static getSession(sessionId: string): StoredSession | undefined {
    return activeSessions.get(sessionId);
  }

  static getAllActiveSessions(): StoredSession[] {
    return Array.from(activeSessions.values());
  }
}
