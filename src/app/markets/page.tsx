import { type Metadata } from "next";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Activity, ExternalLink } from "lucide-react";
import { getMarketData } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "Piețe de Capital & Cotații Oficiale BNR | AiX Media",
  description:
    "Cotații de referință oficiale BNR (EUR/RON, USD/RON), indicii ROBOR, IRCC și dinamica companiilor listate la Bursa de Valori București.",
  alternates: { canonical: "/markets" },
};

export default async function MarketsPage() {
  const articles = getAllArticles("markets");
  const snapshot = await getMarketData();

  const getMetric = (symbol: string) => {
    const list = [
      ...snapshot.currencies,
      ...snapshot.interestRates,
      ...snapshot.equities,
      ...snapshot.commodities,
    ];
    return list.find((item) => item.symbol === symbol);
  };

  const eurRon = getMetric("EUR/RON");
  const usdRon = getMetric("USD/RON");
  const robor3m = getMetric("ROBOR 3M");
  const ircc = getMetric("IRCC");
  const bnrRate = getMetric("BNR RATE");

  const marketsMetrics = [
    {
      label: "EUR / RON (Curs Oficial)",
      value: eurRon && eurRon.value !== null ? eurRon.value.toFixed(4) : "Indisponibil",
      subtext: "Curs oficial de referință publicat de BNR",
      source: "BNR",
      publishedAt: eurRon?.publishedAt,
      fetchedAt: eurRon?.fetchedAt || new Date().toISOString(),
      isDelayed: false,
    },
    {
      label: "USD / RON (Curs Oficial)",
      value: usdRon && usdRon.value !== null ? usdRon.value.toFixed(4) : "Indisponibil",
      subtext: "Curs oficial de referință publicat de BNR",
      source: "BNR",
      publishedAt: usdRon?.publishedAt,
      fetchedAt: usdRon?.fetchedAt || new Date().toISOString(),
      isDelayed: false,
    },
    {
      label: "ROBOR 3M",
      value: robor3m && robor3m.value !== null ? `${robor3m.value}%` : "Indisponibil",
      subtext: "Rata medie a dobânzii pe piața interbancară",
      source: "BNR",
      publishedAt: robor3m?.publishedAt,
      fetchedAt: robor3m?.fetchedAt || new Date().toISOString(),
      isDelayed: true,
    },
    {
      label: "Indicele IRCC",
      value: ircc && ircc.value !== null ? `${ircc.value}%` : "Indisponibil",
      subtext: "Indice de referință pentru creditele consumatorilor",
      source: "BNR",
      publishedAt: ircc?.publishedAt,
      fetchedAt: ircc?.fetchedAt || new Date().toISOString(),
      isDelayed: true,
    },
  ];

  const premiumSignals = [
    { label: "EUR / RON", value: eurRon && eurRon.value !== null ? eurRon.value.toFixed(4) : "Indisponibil", change: "BNR Oficial", isPositive: true },
    { label: "USD / RON", value: usdRon && usdRon.value !== null ? usdRon.value.toFixed(4) : "Indisponibil", change: "BNR Oficial", isPositive: true },
    { label: "Dobândă BNR", value: bnrRate && bnrRate.value !== null ? `${bnrRate.value}%` : "Indisponibil", change: "Politică Monetară", isPositive: true },
  ];

  const instrumentsList = [
    ...snapshot.currencies,
    ...snapshot.interestRates,
    ...snapshot.equities,
    ...snapshot.commodities,
  ];

  return (
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="Date Financiare Oficiale"
        headline="Cotații Oficiale BNR &amp; Indicatori Monetari"
        description="Monitorizarea cursului oficial de schimb valutar, a dobânzilor de referință ROBOR/IRCC și a rapoartelor BNR."
        ctaLabel="Explorează Rapoartele"
        ctaHref="#articles"
        secondaryCtaLabel="Tabel Instrumente"
        secondaryCtaHref="#instruments"
        marketSignals={premiumSignals}
      />

      {/* Market Instruments Table */}
      <section id="instruments" className="p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 shadow-xl text-neutral-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-4 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Tablou Oficial Instrumente &amp; Valute
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-white mt-1">
              Valute, Dobânzi &amp; Indici de Referință
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-300 bg-[var(--surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border)] shadow-xs">
            Feed Oficial BNR Conectat
          </span>
        </div>

        <div className="overflow-x-auto bg-[var(--surface-elevated)] rounded-xl border border-[var(--border)] shadow-xs">
          <table className="w-full text-left border-collapse text-xs font-mono text-neutral-300">
            <thead>
              <tr className="border-b border-[var(--border)] text-neutral-400 bg-[var(--surface-elevated)]">
                <th className="py-3 px-4 font-bold">Instrument</th>
                <th className="py-3 px-4 font-bold">Denumire</th>
                <th className="py-3 px-4 font-bold">Sursă</th>
                <th className="py-3 px-4 text-right font-bold">Valoare</th>
                <th className="py-3 px-4 font-bold">Data Referință</th>
                <th className="py-3 px-4 font-bold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E0]">
              {instrumentsList.map((inst) => {
                const isAvail = inst.value !== null;
                return (
                  <tr key={inst.symbol} className="hover:bg-[var(--surface-elevated)] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{inst.symbol}</td>
                    <td className="py-3.5 px-4 text-neutral-300">{inst.name || "—"}</td>
                    <td className="py-3.5 px-4">
                      {inst.sourceUrl ? (
                        <a
                          href={inst.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-400 text-neutral-200 underline inline-flex items-center gap-1 font-semibold transition-colors"
                        >
                          {inst.source}
                          <ExternalLink className="w-3 h-3 text-neutral-500" />
                        </a>
                      ) : (
                        inst.source
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white font-mono">
                      {isAvail
                        ? `${inst.value?.toFixed(inst.unit === "RON" ? 4 : 2)}${
                            inst.unit === "%" ? "%" : inst.unit === "RON" ? " RON" : ""
                          }`
                        : "Indisponibil"}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400 font-mono">
                      {isAvail && inst.publishedAt ? inst.publishedAt : inst.referencePeriod || "N/A"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          isAvail
                            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                            : "bg-[var(--surface-elevated)] text-neutral-500 border border-[var(--border)]"
                        }`}
                      >
                        {isAvail ? "Oficial" : "Indisponibil"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <IntelligenceDashboard
        metrics={marketsMetrics}
        title="Indicatori Monetari & Cotații de Referință"
        description="Date prelucrate din comunicatele oficiale BNR."
      />

      <div id="articles">
        <EditorialGrid
          articles={articles}
          title="Analize Financiare & Piețe de Capital"
          description="Rapoarte privind lichiditatea bursieră, politica monetară și emisiunile de titluri de stat."
        />
      </div>

      <DataDisclaimer type="market" />

      <NewsletterBox
        overline="AiX Markets Brief"
        headline="Sinteza Săptămânală a Piețelor"
        description="Primiți direct pe email evoluția dobânzilor de referință și sintezele financiare oficiale."
      />
    </div>
  );
}

