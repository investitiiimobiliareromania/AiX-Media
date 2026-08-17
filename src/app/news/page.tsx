import { type Metadata } from "next";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";

export const metadata: Metadata = {
  title: "Știri & Analize Macroeconomice | AiX Media",
  description:
    "Flux editorial de știri economice, decizii de politică monetară BNR, date statistice INS și rapoarte de piață verificate.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Flux Editorial Oficial"
        headline="Analiză Macroeconomică &amp; Decizii Instituționale"
        description="Rapoarte structurate pe baza comunicatelor oficiale ale BNR, Guvernului României, INS și instituțiilor europene."
        ctaLabel="Explorează Rapoartele"
        ctaHref="#articles"
        marketSignals={[
          { label: "Rată BNR", value: "6.50%", change: "Decizie BNR", isPositive: true },
          { label: "ROBOR 3M", value: "5.58%", change: "Interbancar", isPositive: true },
          { label: "IRCC T3", value: "5.86%", change: "Oficial", isPositive: true },
        ]}
      />

      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Flux de Știri &amp; Rapoarte Verificate"
          description="Toate investigațiile economice, analizele de politică monetară și dinamica pieței imobiliare."
        />
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
