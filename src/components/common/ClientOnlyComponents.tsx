"use client";

import dynamic from "next/dynamic";

const CookieConsentBanner = dynamic(
  () => import("@/components/common/CookieConsentBanner"),
  { ssr: false }
);

const VisitorTracker = dynamic(
  () => import("@/components/layout/VisitorTracker").then((m) => m.VisitorTracker),
  { ssr: false }
);

export function ClientOnlyComponents() {
  return (
    <>
      <VisitorTracker />
      <CookieConsentBanner />
    </>
  );
}
