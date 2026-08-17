import { type Metadata } from "next";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { getMarketData } from "@/lib/market-data";
import { SourceBadge } from "@/components/common/SourceBadge";
import { Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Finanțe & Politică Monetară BNR | AiX Media",
  description:
    "Indicatori oficiali privind ratele dobânzilor BNR, ROBOR, IRCC, creditarea bancară și stabilitatea financiară a României.",
  alternates: { canonical: "/finance" },
};

export default async function FinancePage() {
  const articles = getAllArticles("finance");
  const snapshot = await getMarketData();

  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Sistem Financiar &amp; BNR"
        headline="Politică Monetară, Dobânzi &amp; Creditare"
        description="Monitorizarea strictă a deciziilor de politică monetară emise de Banca Națională a României și a dinamicii ratelor interbancare."
        ctaLabel="Explorează Rapoartele"
        ctaHref="#articles"
        secondaryCtaLabel="Vezi Indicatorii BNR"
        secondaryCtaHref="#indicators"
        marketSignals={[
          { label: "Dobândă Cheie BNR", value: "6.50%", change: "August 2026", isPositive: true },
          { label: "ROBOR 3M", value: "5.58%", change: "Oficial BNR", isPositive: true },
          { label: "IRCC Trimestrial", value: "5.86%", change: "T3 2026", isPositive: true },
        ]}
      />

      {/* Official Monetary Indicators Grid */}
      <section id="indicators" className="space-y-6">
        <div className="border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
            <Percent className="w-4 h-4" />
            Indicatori Monetari Oficiali
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
            Dobânzi de Referință Publicate de BNR
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snapshot.interestRates.map((rate) => (
            <div
              key={rate.symbol}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs text-neutral-500 font-mono font-medium">{rate.name || rate.symbol}</div>
                <div className="text-3xl font-black text-neutral-950 font-mono mt-2">
                  {rate.value !== null ? `${rate.value}%` : "Indisponibil"}
                </div>
                <p className="text-xs text-neutral-600 mt-2">
                  {rate.symbol === "IRCC"
                    ? "Indice reglementat aplicabil contractelor de credit noi"
                    : rate.symbol === "BNR RATE"
                    ? "Rata principală de intervenție în piața monetară"
                    : "Rata medie calculată pentru tranzacțiile interbancare"}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/80">
                <SourceBadge
                  source={rate.source}
                  sourceUrl={rate.sourceUrl}
                  referencePeriod={rate.referencePeriod}
                  publishedAt={rate.publishedAt}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Rapoarte de Politică Monetară &amp; Sistem Bancar"
          description="Analize privind solvabilitatea băncilor, creditarea ipotecară și evoluția masei monetare."
        />
      </div>

      <DataDisclaimer type="market" />
      <NewsletterBox />
    </div>
  );
}
