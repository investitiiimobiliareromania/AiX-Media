import { type Metadata } from 'next';
import { articleService } from '@/services/article.service';
import { RealEstateHeaderBanner } from '@/components/real-estate-intelligence/RealEstateHeaderBanner';
import { RealEstateMarketOverviewDashboard } from '@/components/real-estate-intelligence/RealEstateMarketOverviewDashboard';
import { BucharestNeighborhoodsModule } from '@/components/real-estate-intelligence/BucharestNeighborhoodsModule';
import { ResidentialCommercialModule } from '@/components/real-estate-intelligence/ResidentialCommercialModule';
import { DeveloperIntelligenceModule } from '@/components/real-estate-intelligence/DeveloperIntelligenceModule';
import { ProjectIntelligenceModule } from '@/components/real-estate-intelligence/ProjectIntelligenceModule';
import { FinancingReportsNewsModule } from '@/components/real-estate-intelligence/FinancingReportsNewsModule';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { neighborhoodProfiles, developerProfiles, projectItems } from '@/lib/real-estate-intelligence-service';
import { BucharestSectorWatch } from '@/components/real-estate/BucharestSectorWatch';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    absolute: 'Piața Imobiliară, Statistici ANCPI & Construcții | AiX Media',
  },
  description:
    'Platformă de research imobiliar: dinamica tranzacțiilor cadastrale ANCPI, autorizații de construire INS, analiza pieței rezidențiale și investiții.',
  alternates: {
    canonical: `${siteConfig.url}/real-estate`,
    languages: {
      'ro-RO': `${siteConfig.url}/real-estate`,
      'x-default': `${siteConfig.url}/real-estate`,
    },
  },
  openGraph: {
    title: 'Piața Imobiliară, Statistici ANCPI & Construcții | AiX Media',
    description:
      'Platformă de research imobiliar: dinamica tranzacțiilor cadastrale ANCPI, autorizații de construire INS, analiza pieței rezidențiale și investiții.',
    url: `${siteConfig.url}/real-estate`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default async function RealEstatePage() {
  const allArticles = await articleService.getPublishedArticles();
  const realEstateNews = allArticles.filter(
    (art) =>
      art.category === 'real-estate' ||
      art.title.toLowerCase().includes('imobil') ||
      art.title.toLowerCase().includes('apartament') ||
      art.title.toLowerCase().includes('construct')
  );

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Real Estate Terminal Header Banner */}
      <RealEstateHeaderBanner
        totalNeighborhoods={neighborhoodProfiles.length}
        totalDevelopers={developerProfiles.length}
        totalProjects={projectItems.length}
        totalNews={realEstateNews.length}
      />

      {/* 1. Real Estate Market Overview Dashboard */}
      <RealEstateMarketOverviewDashboard />

      {/* 2. Bucharest Neighborhoods Market Intelligence */}
      <BucharestNeighborhoodsModule />

      {/* 2.5. Bucharest & Ilfov Sector Watch Module */}
      <BucharestSectorWatch />

      {/* 2.6. Dubai Property Intelligence Banner */}
      <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-neutral-950 via-[var(--surface-elevated)] to-amber-950/30 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            INTERNATIONAL REAL ESTATE WATCH
          </span>
          <h3 className="font-serif text-2xl font-bold text-white">
            Dubai Property Intelligence: Randamente, DLD &amp; Golden Visa
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif max-w-2xl leading-relaxed">
            Descoperă analizele detaliate pe zonele Palm Jumeirah, Downtown și Dubai Marina, împreună cu comparația de randament 1M€ București vs. Dubai.
          </p>
        </div>

        <Link
          href="/dubai"
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-lg"
        >
          <span>Explorează Hub-ul Dubai</span>
          <span className="text-lg">→</span>
        </Link>
      </section>

      {/* 3 & 4. Residential & Commercial Real Estate */}
      <ResidentialCommercialModule />

      {/* 5. Developer Institutional Profiles */}
      <DeveloperIntelligenceModule />

      {/* 6. Project Intelligence Dossiers */}
      <ProjectIntelligenceModule />

      {/* 7, 8, 9, 10, 11, 12, 13, 14. Financing, IRCC, Reports & Real Estate News */}
      <FinancingReportsNewsModule newsArticles={realEstateNews} />

      {/* Institutional Data Disclaimer */}
      <DataDisclaimer type="real-estate" />

      {/* Newsletter Subscription */}
      <NewsletterBox
        overline="AiX Real Estate Intelligence Brief"
        headline="Sinteza Lunară Imobiliară &amp; Cadastrală"
        description="Primiți direct pe email rapoartele ANCPI, dinamica prețurilor pe mp și analizele din sectorul construcțiilor."
      />
    </div>
  );
}

