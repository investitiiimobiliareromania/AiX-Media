import { NextResponse } from "next/server";
import { sendTelegramVisitorAlert, type TelegramVisitorData } from "@/lib/telegram";

// Server-side deduplication / rate-limiting map (30 min window per IP + User Agent)
const visitorDedupeMap = new Map<string, number>();
const DEDUPE_WINDOW_MS = 30 * 60 * 1000; // 30 minutes

function isVisitorDeduplicated(key: string): boolean {
  const now = Date.now();

  // Periodic cleanup if map grows large
  if (visitorDedupeMap.size > 2000) {
    for (const [k, expiresAt] of visitorDedupeMap.entries()) {
      if (now > expiresAt) {
        visitorDedupeMap.delete(k);
      }
    }
  }

  const expiresAt = visitorDedupeMap.get(key);
  if (expiresAt && now < expiresAt) {
    return true; // Already notified in this 30 min session window
  }

  visitorDedupeMap.set(key, now + DEDUPE_WINDOW_MS);
  return false;
}

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";
    const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "N/A";
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|opera mini|iemobile/i.test(userAgent);
    const device = isMobile ? "Mobile" : "Desktop";

    const dedupeKey = `${ip}_${userAgent.slice(0, 50)}`;

    const body = await request.json().catch(() => ({}));
    const pageUrl = typeof body?.pageUrl === "string" ? body.pageUrl.trim().slice(0, 200) : "/";
    const referrer = typeof body?.referrer === "string" ? body.referrer.trim().slice(0, 100) : "Direct";

    // Server-side deduplication check
    if (isVisitorDeduplicated(dedupeKey)) {
      console.log(`[Visitor API] Deduplicated visitor event for IP: ${ip} on page: ${pageUrl}`);
      return NextResponse.json(
        { success: true, deduplicated: true },
        { status: 200 }
      );
    }

    const visitorData: TelegramVisitorData = {
      pageUrl,
      device,
      referrer,
      country: country.toUpperCase(),
      timestamp: new Date().toLocaleString("ro-RO", {
        timeZone: "Europe/Bucharest",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    const telegramSuccess = await sendTelegramVisitorAlert(visitorData);

    if (telegramSuccess) {
      console.log(`[Visitor API] Telegram visitor alert delivered for page: ${pageUrl}`);
    } else {
      console.warn(`[Visitor API] Telegram visitor alert failed or unconfigured.`);
    }

    return NextResponse.json(
      { success: true, telegramDelivered: telegramSuccess, deduplicated: false },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Visitor API] Unexpected error handling visitor event:", error);
    return NextResponse.json(
      { success: false, error: "A apărut o eroare neașteptată." },
      { status: 500 }
    );
  }
}
