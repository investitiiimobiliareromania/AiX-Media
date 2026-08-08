export interface TelegramLeadData {
  name: string;
  contact: string;
  message?: string;
  source?: string;
  cta?: string;
  pageUrl?: string;
  timestamp?: string;
}

const MAX_RETRIES = 2;
const INITIAL_BACKOFF_MS = 800;
const TIMEOUT_MS = 15000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildTelegramMessage(lead: TelegramLeadData): string {
  const name = escapeHtml(lead.name || "N/A");
  const contact = escapeHtml(lead.contact || "N/A");
  const message = escapeHtml(lead.message || "—");
  const source = escapeHtml(lead.source || "AiX Media");
  const cta = escapeHtml(lead.cta || "General Contact");
  const pageUrl = escapeHtml(lead.pageUrl || "N/A");
  const time = escapeHtml(
    lead.timestamp ||
      new Date().toLocaleString("ro-RO", {
        timeZone: "Europe/Bucharest",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
  );

  return [
    `<b>AiX MEDIA — NEW CONTACT INQUIRY</b>`,
    `─────────────────────`,
    `👤 <b>Name:</b> ${name}`,
    `📞 <b>Contact:</b> ${contact}`,
    `💬 <b>Message / Context:</b> ${message}`,
    `🌐 <b>Source:</b> ${source}`,
    `🎯 <b>CTA / Type:</b> ${cta}`,
    `📍 <b>Page:</b> ${pageUrl}`,
    `🕒 <b>Time:</b> ${time}`,
  ].join("\n");
}

export async function sendTelegramAlert(lead: TelegramLeadData): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[Telegram Alert] BOT_TOKEN or CHAT_ID is not configured. Skipping alert.");
    return false;
  }

  // Mask token for logs (show only first 4 characters)
  // const maskedToken = token.replace(/^(.{4}).+/, "$1******");
  const url = `https://api.telegram.org/bot${token}/sendMessage`;


  const payload = {
    chat_id: chatId,
    text: buildTelegramMessage(lead),
    parse_mode: "HTML",
  };
  const body = JSON.stringify(payload);


  let attempt = 0;
  let backoff = INITIAL_BACKOFF_MS;

  while (attempt < MAX_RETRIES) {
    attempt++;
    try {

      const startTime = Date.now();
      const response = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        },
        TIMEOUT_MS
      );
      const elapsed = Date.now() - startTime;

      if (response.ok) {
        // const respBody = await response.text().catch(() => "(unreadable)");



        return true;
      }

      const errBody = await response.text().catch(() => "(unreadable)");
      console.warn(`[Telegram Alert] Request completed in ${elapsed}ms – Status ${response.status}`);
      console.warn(`[Telegram Alert] HTTP ${response.status} on attempt ${attempt}: ${errBody}`);

    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      const isAbort = err instanceof Error && err.name === "AbortError";
      if (isAbort) {
        console.error(`[Telegram Alert] Timed out on attempt ${attempt} (>${TIMEOUT_MS}ms).`);
      } else {
        console.error(`[Telegram Alert] Network error on attempt ${attempt}:`, errorMsg);
      }
    }

    if (attempt < MAX_RETRIES) {

      await sleep(backoff);
      backoff *= 2;
    }
  }

  console.error(`[Telegram Alert] ✗ Failed after ${MAX_RETRIES} attempt(s).`);
  return false;
}
