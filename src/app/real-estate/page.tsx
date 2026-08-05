import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";

const slug = "real-estate";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  keywords: [
    "real estate Romania",
    "property market intelligence",
    "commercial real estate Bucharest",
    "real estate investment CEE",
    "property yield analysis",
  ],
  alternates: { canonical: `/${slug}` },
};

export default function RealEstatePage() {
  const articles = getAllArticles("real-estate");

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        ctaHref="#articles"
        secondaryCtaLabel="View Market Signals"
        secondaryCtaHref="#dashboard"
        marketSignals={config.marketSignals}
      />

      <div id="dashboard">
        <IntelligenceDashboard
          metrics={config.intelligenceMetrics}
          title={config.dashboardTitle}
          description={config.dashboardDescription}
        />
      </div>

      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Real Estate Intelligence Reports"
          description="Institutional market analysis, transaction teardowns, and urban growth corridors."
        />
      </div>

      <NewsletterBox
        overline={config.newsletterOverline}
        headline={config.newsletterHeadline}
        description={config.newsletterDescription}
      />
    </div>
  );
}
