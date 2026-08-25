import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import {
  companiesData,
  industriesData,
  dealsData,
  executivesData,
  radarData,
  metricsData,
  insightsData,
} from "@/lib/business-intelligence-service";

import { BusinessHeaderBanner } from "@/components/business-intelligence/BusinessHeaderBanner";
import { BusinessOverviewDashboard } from "@/components/business-intelligence/BusinessOverviewDashboard";
import { CompanyIntelligenceModule } from "@/components/business-intelligence/CompanyIntelligenceModule";
import { CompanyRankingsTable } from "@/components/business-intelligence/CompanyRankingsTable";
import { IndustryIntelligenceGrid } from "@/components/business-intelligence/IndustryIntelligenceGrid";
import { DealsCapitalModule } from "@/components/business-intelligence/DealsCapitalModule";
import { ExecutiveIntelligenceGrid } from "@/components/business-intelligence/ExecutiveIntelligenceGrid";
import { BusinessRadarModule } from "@/components/business-intelligence/BusinessRadarModule";
import { TheNumbersModule } from "@/components/business-intelligence/TheNumbersModule";
import { InsightsModule } from "@/components/business-intelligence/InsightsModule";
import { LatestBusinessNewsModule } from "@/components/business-intelligence/LatestBusinessNewsModule";

import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { siteConfig } from "@/config/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Business Intelligence & Companii Românești | AiX Media",
  description:
    "Analize strategice, intelligence corporativ, clasamentul marilor companii din România, tranzacții M&A și dinamica mediului de afaceri.",
  alternates: {
    canonical: `${siteConfig.url}/business`,
    languages: {
      "ro-RO": `${siteConfig.url}/business`,
      "x-default": `${siteConfig.url}/business`,
    },
  },
  openGraph: {
    title: "Business Intelligence & Companii Românești | AiX Media",
    description:
      "Analize strategice, intelligence corporativ, clasamentul marilor companii din România, tranzacții M&A și dinamica mediului de afaceri.",
    url: `${siteConfig.url}/business`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default async function BusinessPage() {
  const newsArticles = await articleService.getBusinessArticles(200);

  return (
    <div className="space-y-12 pb-16 pt-4">
      {/* 1. Header Banner & Identity */}
      <BusinessHeaderBanner
        totalCompanies={companiesData.length}
        totalIndustries={industriesData.length}
        totalDeals={dealsData.length}
        totalExecutives={executivesData.length}
        totalNews={newsArticles.length}
      />

      {/* 2. Business Overview Dashboard */}
      <BusinessOverviewDashboard />

      {/* 3. Company Intelligence */}
      <CompanyIntelligenceModule companies={companiesData} />

      {/* 4. Company Rankings */}
      <CompanyRankingsTable companies={companiesData} />

      {/* 5. Industry Intelligence */}
      <IndustryIntelligenceGrid industries={industriesData} />

      {/* 6. Deals & Capital M&A */}
      <DealsCapitalModule deals={dealsData} />

      {/* 7. Executive Intelligence */}
      <ExecutiveIntelligenceGrid executives={executivesData} />

      {/* 8. Business Radar */}
      <BusinessRadarModule radarItems={radarData} />

      {/* 9. The Numbers */}
      <TheNumbersModule metrics={metricsData} />

      {/* 10. Insights */}
      <InsightsModule insights={insightsData} />

      {/* 11. Latest Business News Feed */}
      <LatestBusinessNewsModule articles={newsArticles} />

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
