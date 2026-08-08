import { NextResponse } from "next/server";
import { sendTelegramAlert, type TelegramLeadData } from "@/lib/telegram";

// Simple in-memory rate limiting map with periodic cleanup
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  
  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.expiresAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60 * 1000 }); // 1 min window
    return false;
  }

  if (entry.count >= 5) {
    return true; // max 5 submissions per minute per IP
  }

  entry.count++;
  return false;
}

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function POST(request: Request) {
  try {
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > 20000) { // 20KB limit
      return NextResponse.json(
        { success: false, error: "Dimensiunea solicitării depășește limita." },
        { status: 413 }
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Prea multe solicitări. Vă rugăm să încercați mai târziu." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Payload invalid." },
        { status: 400 }
      );
    }

    const { name, contact, message, source, cta, pageUrl, website } = body;

    // Honeypot bot check
    if (website) {
      return NextResponse.json(
        { success: true, message: "Solicitarea a fost recepționată." },
        { status: 200 }
      );
    }

    // Required fields validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Vă rugăm să introduceți un nume valabil." },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== "string" || contact.trim().length < 3 || contact.trim().length > 120) {
      return NextResponse.json(
        { success: false, error: "Vă rugăm să introduceți un număr de telefon sau o adresă de email valabilă." },
        { status: 400 }
      );
    }

    // Sanitize input values
    const sanitizedLead: TelegramLeadData = {
      name: name.trim().slice(0, 100),
      contact: contact.trim().slice(0, 120),
      message: typeof message === "string" ? message.trim().slice(0, 1000) : "—",
      source: typeof source === "string" ? source.trim().slice(0, 100) : "AiX Media",
      cta: typeof cta === "string" ? cta.trim().slice(0, 100) : "Inquiry Form",
      pageUrl: typeof pageUrl === "string" ? pageUrl.trim().slice(0, 200) : "N/A",
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

    const telegramSuccess = await sendTelegramAlert(sanitizedLead);

    if (telegramSuccess) {
      console.log("[Contact API] Lead accepted + Telegram delivered successfully.");
    } else {
      console.warn("[Contact API] Lead accepted + Telegram delivery failed or credentials missing.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mulțumim. Am primit solicitarea și vom reveni în cel mai scurt timp.",
        telegramDelivered: telegramSuccess,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "A apărut o eroare neașteptată." },
      { status: 500 }
    );
  }
}
