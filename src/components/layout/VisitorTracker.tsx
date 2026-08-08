"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();
  const hasTrackedInState = useRef(false);

  useEffect(() => {
    const SESSION_KEY = "aix_visitor_tracked";
    const now = Date.now();
    const DEDUPE_MS = 30 * 60 * 1000; // 30 minutes client-side session window

    try {
      const lastTracked = sessionStorage.getItem(SESSION_KEY);
      if (lastTracked && now - parseInt(lastTracked, 10) < DEDUPE_MS) {
        return; // Skip duplicate alert within same browser session
      }
    } catch {
      // SessionStorage restricted or private mode
    }

    if (hasTrackedInState.current) {
      return;
    }
    hasTrackedInState.current = true;

    try {
      sessionStorage.setItem(SESSION_KEY, now.toString());
    } catch {
      // SessionStorage restricted
    }

    let referrer = "Direct";
    try {
      if (typeof document !== "undefined" && document.referrer) {
        const refUrl = new URL(document.referrer);
        referrer = refUrl.hostname;
      }
    } catch {
      referrer = "External";
    }

    const payload = {
      pageUrl: pathname || (typeof window !== "undefined" ? window.location.pathname : "/"),
      referrer,
    };

    fetch("/api/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => {
      console.warn("[VisitorTracker] Failed to send visitor event:", err);
    });
  }, [pathname]);

  return null;
}
