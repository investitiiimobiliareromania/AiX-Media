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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
      className={`dark ${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <AppProviders>
          <VisitorTracker />
          <SkipLink />
          <NewSiteHeader currencies={marketSnapshot.currencies} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </AppProviders>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
