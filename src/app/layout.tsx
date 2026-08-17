import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { type Metadata, type Viewport } from "next";

import {
  JsonLd,
  organizationJsonLd,
} from "@/components/common/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewSiteHeader } from "@/components/layout/NewSiteHeader";
import { SkipLink } from "@/components/layout/skip-link";
import { rootMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers/app-providers";

import "./globals.css";
import CookieConsentBanner from "@/components/common/CookieConsentBanner";
import { getMarketData } from "@/lib/market-data";
import { VisitorTracker } from "@/components/layout/VisitorTracker";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const marketSnapshot = await getMarketData();

  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} h-full bg-white text-neutral-900`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white text-neutral-900 antialiased">
        <JsonLd data={organizationJsonLd} />
        <AppProviders>
          <VisitorTracker />
          <SkipLink />
          <NewSiteHeader currencies={marketSnapshot.currencies} />
          <main id="main-content" className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6">
            {children}
          </main>
          <SiteFooter />
        </AppProviders>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
