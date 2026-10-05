import { NextRequest, NextResponse } from "next/server";
import { runNewsIngestion } from "@/lib/rss-ingestion";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function timingSafeSecretCheck(provided: string | null | undefined, expected: string | undefined): boolean {
  if (!provided || !expected || typeof provided !== "string" || typeof expected !== "string") {
    return false;
  }
  try {
    const hashProvided = crypto.createHash("sha256").update(provided).digest();
    const hashExpected = crypto.createHash("sha256").update(expected).digest();
    return crypto.timingSafeEqual(hashProvided, hashExpected);
  } catch {
    return false;
  }
}

async function handleCronRequest(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret) {
    console.error("[Cron API /api/cron/news] CRON_SECRET is not configured on server.");
    return NextResponse.json(
      { error: "Unauthorized: Endpoint authentication not configured" },
      { status: 401 }
    );
  }

  // Verify authorization secret
  const authHeader = req.headers.get("authorization");
  const customHeader = req.headers.get("x-cron-secret");
  const { searchParams } = new URL(req.url);
  const secretParam = searchParams.get("secret");

  const providedSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : (customHeader || secretParam);

  if (!timingSafeSecretCheck(providedSecret, cronSecret)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing CRON_SECRET" },
      { status: 401 }
    );
  }

  try {
    const result = await runNewsIngestion();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Cron API /api/cron/news] Execution failed:", error);
    return NextResponse.json(
      {
        ok: false,
        fetched: 0,
        inserted: 0,
        skipped: 0,
        errors: 1,
        durationMs: 0,
        error: "Execution failed",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleCronRequest(req);
}

export async function POST(req: NextRequest) {
  return handleCronRequest(req);
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "GET, POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "GET, POST" } }
  );
}


