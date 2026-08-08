import { NextResponse } from "next/server";
import { sendTelegramAlert, type TelegramLeadData } from "@/lib/telegram";

// Simple in-memory rate limiting map for basic spam protection
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
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

export async function POST(request: Request) {
  try {
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
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Vă rugăm să introduceți un nume valabil." },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== "string" || contact.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Vă rugăm să introduceți un număr de telefon sau o adresă de email valabilă." },
        { status: 400 }
      );
    }

    // Sanitize input values
    const sanitizedLead: TelegramLeadData = {
      name: name.trim().slice(0, 100),
      contact: contact.trim().slice(0, 100),
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

    if (!telegramSuccess) {
      console.warn("[Contact API] Telegram notification failed or bot credentials missing.");
      // If Telegram credentials are missing in local/dev or Telegram fails, return partial failure message if required or log safely
      const hasSecrets = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
      if (!hasSecrets) {
        return NextResponse.json(
          {
            success: false,
            error: "Sistemul de notificări nu este configurat complet pe server. Vă rugăm să verificați cheile TELEGRAM.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: "Eroare la transmiterea notificării. Vă rugăm încercați din nou.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mulțumim. Am primit solicitarea și vom reveni în cel mai scurt timp.",
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
