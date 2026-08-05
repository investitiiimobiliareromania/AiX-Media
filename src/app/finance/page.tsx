import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";

const slug = "finance";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function FinancePage() {
  const articles = getAllArticles("finance");

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={config.marketSignals}
      />

      <IntelligenceDashboard
        metrics={config.intelligenceMetrics}
        title={config.dashboardTitle}
        description={config.dashboardDescription}
      />

      <EditorialGrid
        articles={articles}
        title="Finance & Monetary Policy Analysis"
        description="Banking sector health, mortgage rate trends, liquidity indicators, and Central Bank policy."
      />

      <NewsletterBox
        overline={config.newsletterOverline}
        headline={config.newsletterHeadline}
        description={config.newsletterDescription}
      />
    </div>
  );
}
