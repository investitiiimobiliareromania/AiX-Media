"use client";

type AnalyticsEvent = {
  name: string;
  params?: Record<string, string | number | boolean>;
};

export function trackAnalyticsEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  
  // Safe, zero-overhead event logging (compatible with Vercel Analytics / Beacon API)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${event.name}:`, event.params || {});
  }
}

export function trackPageView(pageUrl: string) {
  trackAnalyticsEvent({
    name: "page_view",
    params: { url: pageUrl, timestamp: Date.now() },
  });
}

export function trackLeadConversion(source: string, cta: string) {
  trackAnalyticsEvent({
    name: "lead_conversion",
    params: { source, cta, timestamp: Date.now() },
  });
}
