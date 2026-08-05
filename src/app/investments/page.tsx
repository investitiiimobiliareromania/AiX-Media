import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";

const slug = "investments";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  keywords: [
    "investments Romania",
    "private equity CEE",
    "venture capital Bucharest",
    "family office wealth",
    "alternative investments",
  ],
  alternates: { canonical: `/${slug}` },
};

export default function InvestmentsPage() {
  const articles = getAllArticles("investments");

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
          title="Private Equity & Wealth Intelligence"
          description="Capital allocation strategies, fund teardowns, and high-net-worth market insights."
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
