import { type Metadata } from "next";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";

export const metadata: Metadata = {
  title: "Investiții & Capital Privat | AiX Media",
  description:
    "Strategii de alocare a capitalului, private equity, venture capital și dinamica investițiilor instituționale în România și CEE.",
  alternates: { canonical: "/investments" },
};

export default function InvestmentsPage() {
  const articles = getAllArticles("investments");

  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Capital Privat &amp; Alocare"
        headline="Strategii Investiționale &amp; Fonduri Private"
        description="Analiza fluxurilor de capital, a randamentelor ajustate la risc și a investițiilor instituționale în România."
        ctaLabel="Explorează Rapoartele"
        ctaHref="#articles"
        marketSignals={[
          { label: "Active Private", value: "Rapoarte CEE", change: "Oficial", isPositive: true },
          { label: "Fonduri Pensii Pilon II", value: "Alocări BVB", change: "Reglementat", isPositive: true },
        ]}
      />

      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Rapoarte Privind Investițiile &amp; Fondurile Private"
          description="Sinteze privind capitalul instituțional, titlurile de stat și structurile de alocare a activelor."
        />
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
