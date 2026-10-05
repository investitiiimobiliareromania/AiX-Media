import {
  DeviceInfo,
  DerivedInterest,
  EnrichedLeadData,
  EnrichedSessionData,
  EventType,
} from '@/types/visitor-intelligence';

const MAX_RETRIES = 2;
const INITIAL_BACKOFF_MS = 800;
const TIMEOUT_MS = 15000;

// Session-level cooldown maps to prevent notification spam
const sessionSummaryCooldown = new Map<string, number>();
const navigationAlertCooldown = new Map<string, number>();
const keyActionCooldown = new Map<string, number>();

const NAVIGATION_COOLDOWN_MS = 15 * 1000; // 15 seconds minimum between Level 2 navigation alerts for the same session
const KEY_ACTION_COOLDOWN_MS = 5 * 1000; // 5 seconds per key action type per session
const SUMMARY_COOLDOWN_MS = 30 * 60 * 1000; // 30 min for full summary refreshes

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function postToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram Intelligence] BOT_TOKEN or CHAT_ID is not configured. Skipping alert.');
    return false;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  const body = JSON.stringify(payload);

  let attempt = 0;
  let backoff = INITIAL_BACKOFF_MS;

  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      const response = await fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        },
        TIMEOUT_MS
      );

      if (response.ok) {
        return true;
      }

      const errBody = await response.text().catch(() => '(unreadable)');
      console.warn(`[Telegram Intelligence] HTTP ${response.status} on attempt ${attempt}: ${errBody}`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[Telegram Intelligence] Network error on attempt ${attempt}:`, errorMsg);
    }

    if (attempt < MAX_RETRIES) {
      await sleep(backoff);
      backoff *= 2;
    }
  }

  return false;
}

/**
 * Level 1: New Visitor / Session Start Alert
 */
export function buildVisitorSummaryMessage(session: EnrichedSessionData): string {
  const visitorType = session.isNewVisitor ? 'New Visitor' : `Returning Visitor (Visit #${session.visitCount})`;
  const vid = escapeHtml(session.visitorId);
  const sid = escapeHtml(session.sessionId);

  const city = session.location?.city ? escapeHtml(session.location.city) : '';
  const country = session.location?.country ? escapeHtml(session.location.country) : 'Romania';
  const flag = country === 'RO' || country.toLowerCase() === 'romania' ? '🇷🇴' : '🌍';
  const locationStr = city ? `${flag} ${country} · ${city}` : `${flag} ${country}`;

  const source = escapeHtml(session.attribution?.source || 'Direct');
  const medium = escapeHtml(session.attribution?.medium || 'none');
  const campaign = session.attribution?.campaign ? escapeHtml(session.attribution.campaign) : '—';
  const referrer = escapeHtml(session.attribution?.referrer || 'Direct');
  const landing = escapeHtml(session.landingPage || '/');

  const device = session.device;
  const deviceStr = `${escapeHtml(device.deviceType)} · ${escapeHtml(device.os)} · ${escapeHtml(device.browser)}`;
  const screenStr = `${escapeHtml(device.screen)} · ${escapeHtml(device.language)}`;

  const firstAction = session.primaryInterest
    ? `Viewed: ${escapeHtml(session.primaryInterest)}`
    : `Landed on: ${landing}`;

  return [
    `👤 <b>NEW VISITOR ARRIVAL</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>VISITOR</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Visitor: <code>${vid}</code>`,
    `Session: <code>${sid}</code>`,
    `Status: ${visitorType}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>WHEN</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${escapeHtml(session.startedAt)}`,
    `🟢 Active now`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>SOURCE & ATTRIBUTION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Source: <b>${source}</b>`,
    `Medium: ${medium}`,
    `Campaign: ${campaign}`,
    `Referrer: ${referrer}`,
    `Landing: <code>${landing}</code>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>LOCATION (APPROXIMATE)</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${locationStr}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>DEVICE</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${deviceStr}`,
    `${screenStr}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>FIRST ACTION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${firstAction}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>AIX MEDIA Visitor Intelligence</b>`,
  ].join('\n');
}

/**
 * Level 2: Live Visitor Activity & Journey Update
 */
export function buildNavigationActivityMessage(session: EnrichedSessionData): string {
  const vid = escapeHtml(session.visitorId);
  const sid = escapeHtml(session.sessionId);

  const source = escapeHtml(session.attribution?.source || 'Direct');
  const deviceStr = `${escapeHtml(session.device.deviceType)} · ${escapeHtml(session.device.os)} / ${escapeHtml(session.device.browser)}`;

  const timelineLines: string[] = [];
  if (session.timeline && session.timeline.length > 0) {
    const recentTimeline = session.timeline.slice(-6);
    for (const t of recentTimeline) {
      timelineLines.push(`• <code>${escapeHtml(t.time)}</code> ${escapeHtml(t.label)} → <code>${escapeHtml(t.route)}</code>`);
    }
  }

  const interestLines: string[] = [];
  if (session.topInterests && session.topInterests.length > 0) {
    for (const item of session.topInterests) {
      interestLines.push(`${escapeHtml(item.category)} ${item.bar} <b>${item.intensity}</b>`);
    }
  } else {
    interestLines.push(`General News ███░░░░░░░ <b>LOW</b>`);
  }

  const lastActionStr = session.lastAction
    ? `${escapeHtml(session.lastAction.label)}${session.lastAction.details ? `: ${escapeHtml(session.lastAction.details)}` : ''}`
    : 'Page navigation';

  return [
    `🔎 <b>VISITOR ACTIVITY INTELLIGENCE</b>`,
    `Visitor: <code>${vid}</code> · Session: <code>${sid}</code>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>JOURNEY & TIMELINE</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ...(timelineLines.length > 0 ? timelineLines : [`• ${escapeHtml(session.lastRoute)}`]),
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>INTEREST SCORING</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ...interestLines,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>ENGAGEMENT & INTENT</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Pages: ${session.pageCount} · Durată: ${escapeHtml(session.sessionDurationFormatted)} · Scroll: ${session.maxScrollDepth}%`,
    `Engagement: <b>${session.engagement.toUpperCase()}</b> · Intent: <b>${session.intent.toUpperCase()}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>LAST ACTION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚡ ${lastActionStr}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>ACQUISITION & DEVICE</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${source} · ${deviceStr}`,
  ].join('\n');
}

/**
 * Level 3: High-Value Commercial Intent Alert
 */
export function buildImportantActivityMessage(data: {
  visitorId: string;
  sessionId: string;
  isNewVisitor?: boolean;
  visitCount?: number;
  eventType: EventType;
  label: string;
  details?: string;
  route: string;
  location?: { city?: string; country?: string };
  device?: DeviceInfo;
  attribution?: { source?: string; medium?: string; landingPage?: string };
  durationFormatted?: string;
  pagesCount?: number;
  articlesCount?: number;
  propertiesCount?: number;
  topInterests?: DerivedInterest[];
}): string {
  const vid = escapeHtml(data.visitorId);
  const sid = escapeHtml(data.sessionId);
  const visitorStatus = data.isNewVisitor ? 'New visitor' : `Returning visitor (Visit #${data.visitCount || 2})`;

  const city = data.location?.city ? escapeHtml(data.location.city) : '';
  const country = data.location?.country ? escapeHtml(data.location.country) : 'Romania';
  const flag = country === 'RO' || country.toLowerCase() === 'romania' ? '🇷🇴' : '🌍';
  const locationStr = city ? `${flag} ${country}, ${city}` : `${flag} ${country}`;

  const source = escapeHtml(data.attribution?.source || 'Direct');
  const landing = escapeHtml(data.attribution?.landingPage || '/');

  const pages = data.pagesCount || 1;
  const props = data.propertiesCount || 0;
  const arts = data.articlesCount || 0;
  const duration = data.durationFormatted || 'Active';

  const interestLines: string[] = [];
  if (data.topInterests && data.topInterests.length > 0) {
    for (const item of data.topInterests) {
      interestLines.push(`• ${escapeHtml(item.category)}: <b>${item.intensity}</b> (${item.score} pct)`);
    }
  }

  return [
    `🚨 <b>HIGH-INTENT VISITOR ALERT</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>VISITOR</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Visitor: <code>${vid}</code> · Session: <code>${sid}</code>`,
    `Status: ${visitorStatus}`,
    `Location: ${locationStr}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>SOURCE</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Source: <b>${source}</b> · Landing: <code>${landing}</code>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>BEHAVIOR & DEPTH</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Pagini: ${pages} · Proprietăți: ${props} · Articole: ${arts}`,
    `Durată Sesiune: ${duration}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>TRIGGER ACTION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🎯 <b>${escapeHtml(data.label)}</b>`,
    ...(data.details ? [`💬 ${escapeHtml(data.details)}`] : []),
    `📄 Rută: <code>${escapeHtml(data.route)}</code>`,
    ...(interestLines.length > 0
      ? [
          `━━━━━━━━━━━━━━━━━━━━`,
          `<b>INTEREST PROFILE</b>`,
          `━━━━━━━━━━━━━━━━━━━━`,
          ...interestLines,
        ]
      : []),
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>STATUS: 🟢 ACTIVE</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>RECOMMENDED ACTION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Monitorizați traseul de conversie și pregătiți consultanța comercială.`,
  ].join('\n');
}

/**
 * Level 3: Identified Known Lead / Form Submission
 */
export function buildLeadNotificationMessage(lead: EnrichedLeadData): string {
  const name = escapeHtml(lead.name);
  const contact = escapeHtml(lead.contact);
  const message = escapeHtml(lead.message || '—');
  const sourceContext = escapeHtml(lead.sourceContext || 'AiX Media Form');
  const pageUrl = escapeHtml(lead.pageUrl);
  const time = escapeHtml(lead.timestamp);

  const city = lead.location?.city ? escapeHtml(lead.location.city) : '';
  const country = lead.location?.country ? escapeHtml(lead.location.country) : 'Romania';
  const flag = country === 'RO' || country.toLowerCase() === 'romania' ? '🇷🇴' : '🌍';
  const locationStr = city ? `${flag} ${country}, ${city}` : `${flag} ${country}`;

  const acqSource = escapeHtml(lead.attribution?.source || 'Direct');
  const acqMedium = escapeHtml(lead.attribution?.medium || 'none');
  const acqCampaign = lead.attribution?.campaign ? escapeHtml(` / ${lead.attribution.campaign}`) : '';
  const acquisition = `${acqSource} (${acqMedium})${acqCampaign}`;

  const vid = lead.visitorId ? escapeHtml(lead.visitorId) : 'N/A';
  const sid = lead.sessionId ? escapeHtml(lead.sessionId) : 'N/A';

  const historyLines: string[] = [];
  if (lead.previousActivitySummary) {
    const { pageCount, topInterests, visitCount } = lead.previousActivitySummary;
    historyLines.push(`• Total pagini: ${pageCount} · Număr vizite: ${visitCount}`);
    if (topInterests && topInterests.length > 0) {
      historyLines.push(`• Interese: ${topInterests.map(escapeHtml).join(', ')}`);
    }
  }

  const deviceStr = lead.device
    ? `${escapeHtml(lead.device.deviceType)} · ${escapeHtml(lead.device.os)} / ${escapeHtml(lead.device.browser)}`
    : 'N/A';

  return [
    `👤 <b>KNOWN LEAD IDENTIFIED</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>LEAD IDENTITY</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Name:</b> ${name}`,
    `📞 <b>Contact:</b> ${contact}`,
    `💬 <b>Message:</b> ${message}`,
    `🎯 <b>Form Context:</b> ${sourceContext}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>VISITOR PROFILE & LOCATION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Identity: <code>${vid}</code> · Session: <code>${sid}</code>`,
    `Location: ${locationStr}`,
    `Acquisition: ${acquisition}`,
    `Device: ${deviceStr}`,
    `Page: <code>${pageUrl}</code>`,
    `Time: ${time}`,
    ...(historyLines.length > 0
      ? [
          `━━━━━━━━━━━━━━━━━━━━`,
          `<b>SESSION CONTEXT & HISTORY</b>`,
          `━━━━━━━━━━━━━━━━━━━━`,
          ...historyLines,
        ]
      : []),
  ].join('\n');
}

/**
 * Dispatchers
 */
export async function sendLeadAlert(lead: EnrichedLeadData): Promise<boolean> {
  const message = buildLeadNotificationMessage(lead);
  return postToTelegram(message);
}

export async function sendVisitorSessionSummary(
  session: EnrichedSessionData,
  force = false
): Promise<boolean> {
  const now = Date.now();
  const lastSent = sessionSummaryCooldown.get(session.sessionId);

  if (!force && lastSent && now - lastSent < SUMMARY_COOLDOWN_MS) {
    return false;
  }

  sessionSummaryCooldown.set(session.sessionId, now);

  if (sessionSummaryCooldown.size > 2000) {
    for (const [key, timestamp] of sessionSummaryCooldown.entries()) {
      if (now - timestamp > SUMMARY_COOLDOWN_MS) {
        sessionSummaryCooldown.delete(key);
      }
    }
  }

  const message = buildVisitorSummaryMessage(session);
  return postToTelegram(message);
}

export async function sendNavigationAlert(
  session: EnrichedSessionData,
  force = false
): Promise<boolean> {
  const now = Date.now();
  const lastSent = navigationAlertCooldown.get(session.sessionId);

  // 15s throttle per session to prevent spam from rapid clicks
  if (!force && lastSent && now - lastSent < NAVIGATION_COOLDOWN_MS) {
    return false;
  }

  navigationAlertCooldown.set(session.sessionId, now);

  if (navigationAlertCooldown.size > 2000) {
    for (const [key, timestamp] of navigationAlertCooldown.entries()) {
      if (now - timestamp > NAVIGATION_COOLDOWN_MS * 10) {
        navigationAlertCooldown.delete(key);
      }
    }
  }

  const message = buildNavigationActivityMessage(session);
  return postToTelegram(message);
}

export async function sendKeyActionAlert(data: {
  visitorId: string;
  sessionId: string;
  isNewVisitor?: boolean;
  visitCount?: number;
  eventType: EventType;
  label: string;
  details?: string;
  route: string;
  location?: { city?: string; country?: string };
  device?: DeviceInfo;
  attribution?: { source?: string; medium?: string; landingPage?: string };
  durationFormatted?: string;
  pagesCount?: number;
  articlesCount?: number;
  propertiesCount?: number;
  topInterests?: DerivedInterest[];
}): Promise<boolean> {
  const now = Date.now();
  const key = `${data.sessionId}_${data.eventType}`;
  const lastSent = keyActionCooldown.get(key);

  // 5s throttle per key action type to prevent double-click spam
  if (lastSent && now - lastSent < KEY_ACTION_COOLDOWN_MS) {
    return false;
  }

  keyActionCooldown.set(key, now);

  if (keyActionCooldown.size > 2000) {
    for (const [k, timestamp] of keyActionCooldown.entries()) {
      if (now - timestamp > KEY_ACTION_COOLDOWN_MS * 10) {
        keyActionCooldown.delete(k);
      }
    }
  }

  const message = buildImportantActivityMessage(data);
  return postToTelegram(message);
}
