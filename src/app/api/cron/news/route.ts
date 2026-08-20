import { NextRequest, NextResponse } from "next/server";
import { runNewsIngestion } from "@/lib/rss-ingestion";

export const dynamic = "force-dynamic";

async function handleCronRequest(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  
  // Verify authorization secret
  const authHeader = req.headers.get("authorization");
  const { searchParams } = new URL(req.url);
  const secretParam = searchParams.get("secret");

  const providedSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : secretParam;

  if (cronSecret && providedSecret !== cronSecret) {
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
        error: error instanceof Error ? error.message : "Internal Server Error",
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
