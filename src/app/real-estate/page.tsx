import { type Metadata } from "next";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { getRealEstateMetrics } from "@/lib/real-estate-data";
import { BarChart3 } from "lucide-react";
import { SourceBadge } from "@/components/common/SourceBadge";

export const metadata: Metadata = {
  title: "Real Estate Intelligence | AiX Media",
  description:
    "Statistici oficiale privind tranzacțiile imobiliare ANCPI, autorizațiile de construire INS și dinamica creditării ipotecare BNR.",
  alternates: { canonical: "/real-estate" },
};

export default async function RealEstatePage() {
  const articles = getAllArticles("real-estate");
  const metrics = await getRealEstateMetrics();

  return (
    <div className="space-y-10 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="Statistici Imobiliare Oficiale"
        headline="Date Verificate din Cadastru și Construcții"
        description="Analiză bazată exclusiv pe raportările oficiale publicate de Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI), INS și BNR."
        ctaLabel="Explorează Rapoartele"
        ctaHref="#articles"
        secondaryCtaLabel="Vezi Tabloul Statistic"
        secondaryCtaHref="#statistics"
        marketSignals={[
          { label: "Tranzacții Naționale (Iunie)", value: "51,808", change: "Date ANCPI", isPositive: true },
          { label: "Tranzacții București (Iunie)", value: "10,420", change: "Date ANCPI", isPositive: true },
          { label: "Autorizații Rezidențiale (Mai)", value: "3,124", change: "Date INS", isPositive: true },
        ]}
      />

      {/* Official Statistics Section */}
      <section id="statistics" className="space-y-6">
        <div className="border-b border-[#262932] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            Indicatori Statistici Imobiliari
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Date Oficiale ANCPI, INS și BNR
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-serif">
            Fiecare cifră este asociată cu sursa instituțională emitentă și perioada de referință.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl bg-[#111317] border border-[#262932] space-y-4 shadow-xl flex flex-col justify-between group hover:border-amber-500/40 transition-all"
            >
              <div>
                <div className="text-xs text-neutral-400 font-mono font-medium">{metric.label}</div>
                <div className="text-3xl font-bold text-white font-mono mt-2 group-hover:text-amber-400 transition-colors">
                  {metric.value}{" "}
                  {metric.unit && <span className="text-xs font-normal text-neutral-500 font-mono">{metric.unit}</span>}
                </div>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed font-serif">{metric.subtext}</p>
              </div>

              <div className="pt-3 border-t border-[#262932]">
                <SourceBadge
                  source={metric.source}
                  sourceUrl={metric.sourceUrl}
                  referencePeriod={metric.referencePeriod}
                  fetchedAt={metric.fetchedAt}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Rapoarte și Analize Imobiliare"
          description="Investigații privind piața rezidențială, spațiile comerciale și autorizațiile de construire."
        />
      </div>

      {/* Data Disclaimer */}
      <DataDisclaimer type="real-estate" />

      {/* Newsletter Box */}
      <NewsletterBox
        overline="AiX Real Estate Brief"
        headline="Sinteza Lunară Imobiliară &amp; Cadastrală"
        description="Primiți direct pe email rapoartele ANCPI și analizele din sectorul construcțiilor."
      />
    </div>
  );
}

