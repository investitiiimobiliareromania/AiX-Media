import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { type Metadata, type Viewport } from "next";

import {
  JsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/components/common/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewSiteHeader } from "@/components/layout/NewSiteHeader";
import { SkipLink } from "@/components/layout/skip-link";
import { rootMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers/app-providers";
import { ClientOnlyComponents } from "@/components/common/ClientOnlyComponents";

import "./globals.css";
import { getMarketData } from "@/lib/market-data";
import { getAllArticles } from "@/lib/media/service";
import { TopInfoTicker } from "@/components/layout/TopInfoTicker";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const marketSnapshot = await getMarketData();
  const latestArticle = getAllArticles()[0];

  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} h-full bg-[var(--background)] text-[var(--foreground)] dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--surface-elevated)] text-[var(--foreground)] antialiased selection:bg-[#A66A1F]/20 selection:text-[var(--foreground)]">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <AppProviders>
          <SkipLink />
          <TopInfoTicker
            latestArticleTitle={latestArticle?.title}
            equities={marketSnapshot.equities}
          />
          <NewSiteHeader currencies={marketSnapshot.currencies} />
          <main id="main-content" className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6">
            {children}
          </main>
          <SiteFooter />
        </AppProviders>
        <ClientOnlyComponents />
      </body>
    </html>
  );
}
