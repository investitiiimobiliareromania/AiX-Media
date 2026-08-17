import { type Metadata } from "next";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";

export const metadata: Metadata = {
  title: "Business & Analiză Corporativă | AiX Media",
  description:
    "Analize strategice, dinamica marilor companii, tranzacții M&A și expansiunea regională a campionilor economici din România.",
  alternates: { canonical: "/business" },
};

export default function BusinessPage() {
  const articles = getAllArticles("business");

  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Inteligență Corporativă"
        headline="Strategii de Business &amp; Companii Românești"
        description="Analiza mișcărilor corporative majore, investițiilor strategice și structurilor de guvernanță din mediul de afaceri."
        ctaLabel="Explorează Rapoartele"
        ctaHref="#articles"
        marketSignals={[
          { label: "Tranzacții M&A", value: "Rapoarte BVB", change: "Oficial", isPositive: true },
          { label: "Companii Monitorizate", value: "Top BVB", change: "Piața Principală", isPositive: true },
        ]}
      />

      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Rapoarte &amp; Analize de Business"
          description="Investigații și sinteze privind mediul antreprenorial și liderii de piață."
        />
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
