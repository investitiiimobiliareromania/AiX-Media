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
    <div className="space-y-8 pb-16 pt-4">
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
      <section id="instruments" className="p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-700 font-bold tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Tablou Oficial Instrumente &amp; Valute
            </div>
            <h2 className="text-xl md:text-2xl font-black text-neutral-950 mt-1">
              Valute, Dobânzi &amp; Indici de Referință
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-700 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs">
            Feed Oficial BNR Conectat
          </span>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <table className="w-full text-left border-collapse text-xs font-mono text-neutral-700">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 bg-neutral-50">
                <th className="py-3 px-4 font-bold">Instrument</th>
                <th className="py-3 px-4 font-bold">Denumire</th>
                <th className="py-3 px-4 font-bold">Sursă</th>
                <th className="py-3 px-4 text-right font-bold">Valoare</th>
                <th className="py-3 px-4 font-bold">Data Referință</th>
                <th className="py-3 px-4 font-bold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {instrumentsList.map((inst) => {
                const isAvail = inst.value !== null;
                return (
                  <tr key={inst.symbol} className="hover:bg-neutral-50/60">
                    <td className="py-3.5 px-4 font-bold text-neutral-950">{inst.symbol}</td>
                    <td className="py-3.5 px-4 text-neutral-600">{inst.name || "—"}</td>
                    <td className="py-3.5 px-4">
                      {inst.sourceUrl ? (
                        <a
                          href={inst.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-700 text-neutral-900 underline inline-flex items-center gap-1 font-semibold"
                        >
                          {inst.source}
                          <ExternalLink className="w-3 h-3 text-neutral-400" />
                        </a>
                      ) : (
                        inst.source
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-neutral-950">
                      {isAvail
                        ? `${inst.value?.toFixed(inst.unit === "RON" ? 4 : 2)}${
                            inst.unit === "%" ? "%" : inst.unit === "RON" ? " RON" : ""
                          }`
                        : "Indisponibil"}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">
                      {isAvail && inst.publishedAt ? inst.publishedAt : inst.referencePeriod || "N/A"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          isAvail
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-500 border border-neutral-200"
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
