import { type Metadata } from 'next';
import { articleService } from '@/services/article.service';
import { MarketsHeaderBanner } from '@/components/markets-intelligence/MarketsHeaderBanner';
import { GlobalIndicesDashboard } from '@/components/markets-intelligence/GlobalIndicesDashboard';
import { RomaniaMacroDashboard } from '@/components/markets-intelligence/RomaniaMacroDashboard';
import { CentralBanksBondYieldsModule } from '@/components/markets-intelligence/CentralBanksBondYieldsModule';
import { FXCommoditiesModule } from '@/components/markets-intelligence/FXCommoditiesModule';
import { SectorRiskMonitorModule } from '@/components/markets-intelligence/SectorRiskMonitorModule';
import { MarketsNewsModule } from '@/components/markets-intelligence/MarketsNewsModule';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { NewsletterBox } from '@/components/media/NewsletterBox';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Piețe Financiare, BVB & Cotații Oficiale BNR | AiX Media',
  description:
    'Cotații de referință oficiale BNR (EUR/RON, USD/RON), indicii ROBOR, IRCC, politica monetară și dinamica companiilor listate la Bursa de Valori București.',
  alternates: {
    canonical: `${siteConfig.url}/markets`,
    languages: {
      'ro-RO': `${siteConfig.url}/markets`,
      'x-default': `${siteConfig.url}/markets`,
    },
  },
  openGraph: {
    title: 'Piețe Financiare, BVB & Cotații Oficiale BNR | AiX Media',
    description:
      'Cotații de referință oficiale BNR (EUR/RON, USD/RON), indicii ROBOR, IRCC, politica monetară și dinamica companiilor listate la Bursa de Valori București.',
    url: `${siteConfig.url}/markets`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default async function MarketsPage() {
  const allArticles = await articleService.getPublishedArticles();
  const marketsNews = allArticles.filter(
    (art) =>
      art.category === 'markets' ||
      art.category === 'finance' ||
      art.title.toLowerCase().includes('burs') ||
      art.title.toLowerCase().includes('bet') ||
      art.title.toLowerCase().includes('bnr') ||
      art.title.toLowerCase().includes('actiun')
  );

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Markets Terminal Header Banner */}
      <MarketsHeaderBanner />

      {/* 2. Global & BVB Market Indices Dashboard */}
      <GlobalIndicesDashboard />

      {/* 3. Romania Macroeconomic Intelligence Dashboard */}
      <RomaniaMacroDashboard />

      {/* 4. Central Bank Rates & Romanian Bond Yields */}
      <CentralBanksBondYieldsModule />

      {/* 5. FX & Commodities Intelligence */}
      <FXCommoditiesModule />

      {/* 6. Sector Intelligence & Market Risk Monitor */}
      <SectorRiskMonitorModule />

      {/* 7. Markets & Financial News Connection */}
      <MarketsNewsModule newsArticles={marketsNews} />

      {/* Institutional Data Disclaimer */}
      <DataDisclaimer type="market" />

      {/* Newsletter Subscription */}
      <NewsletterBox
        overline="AiX Markets Intelligence Brief"
        headline="Sinteza Săptămânală a Piețelor &amp; Macro"
        description="Primiți direct pe email sintezele bursiere BVB, curba dobânzilor BNR și rapoartele macroeconomice."
      />
    </div>
  );
}

