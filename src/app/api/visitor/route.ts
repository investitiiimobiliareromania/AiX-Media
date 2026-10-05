import { NextRequest, NextResponse } from "next/server";
import { ServerIntelligenceService } from "@/lib/visitor-intelligence/server-intelligence-service";
import { VisitorBatchRequest, VisitorEventPayload } from "@/types/visitor-intelligence";

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.expiresAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60 * 1000 });
    return false;
  }

  if (entry.count > 60) {
    // Max 60 batches per minute per IP
    return true;
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

export async function PATCH() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}


export async function POST(req: NextRequest) {
  try {
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 50000) {
      // 50KB limit
      return NextResponse.json({ success: false, error: "Payload too large" }, { status: 413 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    // Check if this is a structured VisitorBatchRequest or a legacy payload
    if (body.visitorId && body.sessionId && Array.isArray(body.events)) {
      const batch = body as VisitorBatchRequest;
      const result = await ServerIntelligenceService.processBatch(batch, req.headers);
      return NextResponse.json({ success: true, processed: result.processed }, { status: 200 });
    }

    // Handle legacy single-event fallback format
    const legacyPageUrl = typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 200) : "/";
    const legacyReferrer = typeof body.referrer === "string" ? body.referrer.slice(0, 100) : "Direct";

    const fallbackEvent: VisitorEventPayload = {
      eventId: `evt_leg_${Date.now()}`,
      visitorId: body.visitorId || `vf_legacy_${ip.replace(/[^a-zA-Z0-9]/g, '')}`,
      sessionId: body.sessionId || `sess_legacy_${Date.now()}`,
      eventType: "page_view",
      route: legacyPageUrl,
      timestamp: Date.now(),
    };

    const syntheticBatch: VisitorBatchRequest = {
      visitorId: fallbackEvent.visitorId,
      sessionId: fallbackEvent.sessionId,
      isNewVisitor: true,
      visitCount: 1,
      sessionCount: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      firstTouch: { referrer: legacyReferrer, landingPage: legacyPageUrl },
      lastTouch: { referrer: legacyReferrer, landingPage: legacyPageUrl },
      device: {
        deviceType: /mobile/i.test(req.headers.get("user-agent") || "") ? "Mobile" : "Desktop",
        os: "Unknown",
        browser: "Unknown",
        screen: "N/A",
        language: "ro-RO",
        timezone: "Europe/Bucharest",
      },
      events: [fallbackEvent],
    };

    const result = await ServerIntelligenceService.processBatch(syntheticBatch, req.headers);
    return NextResponse.json({ success: true, processed: result.processed }, { status: 200 });
  } catch (err) {
    console.error("[Visitor Intelligence API] Error processing visitor batch:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

