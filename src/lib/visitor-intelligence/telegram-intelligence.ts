import {
  DeviceInfo,
  EnrichedLeadData,
  EnrichedSessionData,
  EventType,
} from '@/types/visitor-intelligence';

const MAX_RETRIES = 2;
const INITIAL_BACKOFF_MS = 800;
const TIMEOUT_MS = 15000;

// Session-level cooldown maps to prevent notification spam while ensuring live updates
const sessionSummaryCooldown = new Map<string, number>();
const navigationAlertCooldown = new Map<string, number>();
const keyActionCooldown = new Map<string, number>();

const NAVIGATION_COOLDOWN_MS = 8 * 1000; // 8 seconds minimum between navigation alerts for the same session
const KEY_ACTION_COOLDOWN_MS = 5 * 1000; // 5 seconds per key action type per session
const SUMMARY_COOLDOWN_MS = 15 * 60 * 1000; // 15 min for full summary refreshes

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
 * Level 1: Identified Lead / Contact Form Notification
 */
export function buildLeadNotificationMessage(lead: EnrichedLeadData): string {
  const name = escapeHtml(lead.name);
  const contact = escapeHtml(lead.contact);
  const message = escapeHtml(lead.message || '—');
  const sourceContext = escapeHtml(lead.sourceContext || 'AiX Media');
  const pageUrl = escapeHtml(lead.pageUrl);
  const time = escapeHtml(lead.timestamp);

  const city = lead.location?.city ? escapeHtml(lead.location.city) : '';
  const country = lead.location?.country ? escapeHtml(lead.location.country) : 'Romania';
  const locationStr = city ? `${city}, ${country}` : country;

  const acqSource = escapeHtml(lead.attribution?.source || 'Direct');
  const acqMedium = escapeHtml(lead.attribution?.medium || 'none');
  const acqCampaign = lead.attribution?.campaign ? escapeHtml(` / ${lead.attribution.campaign}`) : '';
  const acquisition = `${acqSource} (${acqMedium})${acqCampaign}`;

  const vid = lead.visitorId ? escapeHtml(lead.visitorId) : 'N/A';
  const sid = lead.sessionId ? escapeHtml(lead.sessionId) : 'N/A';

  const historyLines: string[] = [];
  if (lead.previousActivitySummary) {
    const { pageCount, topInterests, visitCount } = lead.previousActivitySummary;
    historyLines.push(`• Total pagini: ${pageCount} | Vizite: ${visitCount}`);
    if (topInterests && topInterests.length > 0) {
      historyLines.push(`• Interese detectate: ${topInterests.map(escapeHtml).join(', ')}`);
    }
  }

  const deviceStr = lead.device
    ? `${escapeHtml(lead.device.deviceType)} • ${escapeHtml(lead.device.os)} / ${escapeHtml(lead.device.browser)}`
    : 'N/A';

  return [
    `🚨 <b>AIX MEDIA — NEW LEAD IDENTIFIED</b>`,
    `─────────────────────`,
    `👤 <b>Name:</b> ${name}`,
    `📞 <b>Contact:</b> ${contact}`,
    `💬 <b>Message:</b> ${message}`,
    `🎯 <b>Form Context:</b> ${sourceContext}`,
    `📍 <b>Location (Approx):</b> ${locationStr}`,
    `🌐 <b>Acquisition:</b> ${acquisition}`,
    `💻 <b>Device:</b> ${deviceStr}`,
    `📄 <b>Page:</b> ${pageUrl}`,
    `🕒 <b>Time:</b> ${time}`,
    ...(historyLines.length > 0
      ? [
          `\n📊 <b>PREVIOUS SESSION CONTEXT</b>`,
          ...historyLines,
        ]
      : []),
    `\n🔗 <b>Identity:</b> ${vid} | <b>Session:</b> ${sid}`,
  ].join('\n');
}

/**
 * Level 2A: Visitor Session Start / Initial Summary
 */
export function buildVisitorSummaryMessage(session: EnrichedSessionData): string {
  const visitorType = session.isNewVisitor ? 'New Visitor' : `Returning Visitor (Visit #${session.visitCount})`;
  const vid = escapeHtml(session.visitorId);
  const sid = escapeHtml(session.sessionId);

  const city = session.location?.city ? escapeHtml(session.location.city) : '';
  const country = session.location?.country ? escapeHtml(session.location.country) : 'Romania';
  const locationStr = city ? `${city}, ${country}` : country;

  const source = escapeHtml(session.attribution?.source || 'Direct');
  const medium = escapeHtml(session.attribution?.medium || 'none');
  const campaign = session.attribution?.campaign ? ` • Campanie: ${escapeHtml(session.attribution.campaign)}` : '';
  const landing = escapeHtml(session.landingPage || '/');

  const device = session.device;
  const deviceStr = `${escapeHtml(device.deviceType)} • ${escapeHtml(device.os)} • ${escapeHtml(device.browser)} • ${escapeHtml(device.screen)}`;

  const interestsStr =
    session.topInterests.length > 0
      ? session.topInterests.map((i) => escapeHtml(i.category)).join(', ')
      : 'General News';

  const lastActionStr = session.lastAction
    ? `${escapeHtml(session.lastAction.label)}${session.lastAction.details ? `: ${escapeHtml(session.lastAction.details)}` : ''}`
    : 'Page navigation';

  return [
    `🔔 <b>AIX MEDIA — VISITOR ARRIVAL</b>`,
    `─────────────────────`,
    `👤 <b>VISITOR</b>`,
    `Status: ${visitorType}`,
    `ID: <code>${vid}</code> • Session: <code>${sid}</code>`,
    ``,
    `🕐 <b>TIME & DURATION</b>`,
    `${escapeHtml(session.startedAt)} • Durată: ${escapeHtml(session.sessionDurationFormatted)}`,
    ``,
    `📍 <b>LOCATION (APPROXIMATE)</b>`,
    `${locationStr}`,
    ``,
    `🌐 <b>ACQUISITION & SOURCE</b>`,
    `Sursă: ${source} / ${medium}${campaign}`,
    `Landing: ${landing}`,
    ``,
    `💻 <b>DEVICE</b>`,
    `${deviceStr} (${escapeHtml(device.language)})`,
    ``,
    `📄 <b>ACTIVITY & BEHAVIOR</b>`,
    `${session.pageCount} pagini vizualizate • Scroll max: ${session.maxScrollDepth}%`,
    `Ultima rută: ${escapeHtml(session.lastRoute)}`,
    `Nivel implicare: <b>${session.engagement}</b>`,
    ``,
    `🎯 <b>DERIVED INTERESTS</b>`,
    `${interestsStr}`,
    ``,
    `⚡ <b>LAST ACTION</b>`,
    `${lastActionStr}`,
  ].join('\n');
}

/**
 * Level 2B: Visitor Navigation Activity Update
 */
export function buildNavigationActivityMessage(session: EnrichedSessionData): string {
  const vid = escapeHtml(session.visitorId);
  const sid = escapeHtml(session.sessionId);

  const city = session.location?.city ? escapeHtml(session.location.city) : '';
  const country = session.location?.country ? escapeHtml(session.location.country) : 'Romania';
  const locationStr = city ? `${city}, ${country}` : country;

  const source = escapeHtml(session.attribution?.source || 'Direct');
  const medium = escapeHtml(session.attribution?.medium || 'none');

  const device = session.device;
  const deviceStr = `${escapeHtml(device.deviceType)} • ${escapeHtml(device.os)} / ${escapeHtml(device.browser)}`;

  const currentRoute = escapeHtml(session.lastRoute || '/');
  const prevRoute = session.previousRoute ? escapeHtml(session.previousRoute) : undefined;

  const interestsStr =
    session.topInterests.length > 0
      ? session.topInterests.map((i) => escapeHtml(i.category)).join(', ')
      : 'General News';

  const timelineLines: string[] = [];
  if (session.timeline && session.timeline.length > 0) {
    const recentTimeline = session.timeline.slice(-6);
    for (const t of recentTimeline) {
      timelineLines.push(`• <code>${escapeHtml(t.time)}</code> ${escapeHtml(t.label)} → <code>${escapeHtml(t.route)}</code>`);
    }
  }

  return [
    `⚡ <b>AIX MEDIA — VISITOR NAVIGATION</b>`,
    `─────────────────────`,
    `👤 <b>Visitor:</b> <code>${vid}</code> • Session: <code>${sid}</code>`,
    `🕒 <b>Time:</b> ${escapeHtml(session.lastActivityAt)} • Durată: ${escapeHtml(session.sessionDurationFormatted)}`,
    `📍 <b>Location (Approx):</b> ${locationStr}`,
    `🌐 <b>Source:</b> ${source} / ${medium}`,
    `💻 <b>Device:</b> ${deviceStr}`,
    ``,
    `📄 <b>NAVIGATION</b>`,
    ...(prevRoute ? [`Precedent: <code>${prevRoute}</code>`] : []),
    `Curent: <b>${currentRoute}</b>`,
    ``,
    `🎯 <b>Current Interest:</b> ${interestsStr}`,
    `📊 <b>Session Progress:</b> ${session.pageCount} pagini • Scroll max: ${session.maxScrollDepth}%`,
    `Nivel implicare: <b>${session.engagement}</b>`,
    ...(timelineLines.length > 0
      ? [
          ``,
          `🧭 <b>SESSION TIMELINE</b>`,
          ...timelineLines,
        ]
      : []),
  ].join('\n');
}

/**
 * Level 3: Important Activity Event Alert
 */
export function buildImportantActivityMessage(data: {
  visitorId: string;
  sessionId: string;
  eventType: EventType;
  label: string;
  details?: string;
  route: string;
  location?: { city?: string; country?: string };
  device?: DeviceInfo;
  attribution?: { source?: string; medium?: string };
  durationFormatted?: string;
  pagesCount?: number;
}): string {
  const vid = escapeHtml(data.visitorId);
  const city = data.location?.city ? escapeHtml(data.location.city) : '';
  const country = data.location?.country ? escapeHtml(data.location.country) : 'Romania';
  const locationStr = city ? `${city}, ${country}` : country;

  const deviceStr = data.device
    ? `${escapeHtml(data.device.deviceType)} • ${escapeHtml(data.device.os)} / ${escapeHtml(data.device.browser)}`
    : 'Unknown';

  const sourceStr = `${escapeHtml(data.attribution?.source || 'Direct')} / ${escapeHtml(data.attribution?.medium || 'none')}`;

  const nowFormatted = new Date().toLocaleString('ro-RO', {
    timeZone: 'Europe/Bucharest',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return [
    `⚡ <b>AIX MEDIA — KEY ACTION TRIGGERED</b>`,
    `─────────────────────`,
    `👤 <b>Visitor:</b> <code>${vid}</code>`,
    `🕐 <b>Time:</b> ${nowFormatted}`,
    `📍 <b>Location (Approx):</b> ${locationStr}`,
    `🌐 <b>Source:</b> ${sourceStr}`,
    `💻 <b>Device:</b> ${deviceStr}`,
    `📄 <b>Route:</b> ${escapeHtml(data.route)}`,
    ``,
    `🎯 <b>ACTION:</b> <b>${escapeHtml(data.label)}</b>`,
    ...(data.details ? [`💬 <b>Details:</b> ${escapeHtml(data.details)}`] : []),
    ...(data.pagesCount ? [`📊 <b>Session Progress:</b> ${data.pagesCount} pagini • ${data.durationFormatted || 'Active'}`] : []),
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

  // 8s throttle per session to prevent spam from rapid clicks
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
  eventType: EventType;
  label: string;
  details?: string;
  route: string;
  location?: { city?: string; country?: string };
  device?: DeviceInfo;
  attribution?: { source?: string; medium?: string };
  durationFormatted?: string;
  pagesCount?: number;
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
