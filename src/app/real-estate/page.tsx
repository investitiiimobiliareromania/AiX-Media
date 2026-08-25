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

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Piața Imobiliară, Statistici ANCPI & Construcții | AiX Media',
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

