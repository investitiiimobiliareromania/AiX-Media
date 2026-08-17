import { SectionHeader } from "@/components/editorial/section-header";
import { Container, Section } from "@/components/layout/container";
import { getMarketData } from "@/lib/market-data";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";

export async function MarketsOverview() {
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

  const groups = [
    {
      title: "Valute Oficiale BNR",
      instruments: [
        { symbol: "EUR/RON", name: "Euro / Leu Românesc", metric: getMetric("EUR/RON") },
        { symbol: "USD/RON", name: "Dolar SUA / Leu Românesc", metric: getMetric("USD/RON") },
        { symbol: "GBP/RON", name: "Lira Sterlină / Leu", metric: getMetric("GBP/RON") },
        { symbol: "CHF/RON", name: "Franc Elvețian / Leu", metric: getMetric("CHF/RON") },
      ],
    },
    {
      title: "Rate Dobândă & Benchmark",
      instruments: [
        { symbol: "ROBOR 3M", name: "Rata Interbancară 3 Luni", metric: getMetric("ROBOR 3M") },
        { symbol: "ROBOR 6M", name: "Rata Interbancară 6 Luni", metric: getMetric("ROBOR 6M") },
        { symbol: "IRCC", name: "Indice Referință Credite Consumatori", metric: getMetric("IRCC") },
        { symbol: "BNR RATE", name: "Rata Dobânzii de Politică Monetară", metric: getMetric("BNR RATE") },
      ],
    },
    {
      title: "Metal Prețios & Valori",
      instruments: [
        { symbol: "XAU/RON", name: "Gramul de Aur (BNR)", metric: getMetric("XAU/RON") },
      ],
    },
  ];

  return (
    <Section spacing="lg" aria-labelledby="markets-title" className="border-t border-neutral-200 bg-neutral-50">
      <Container size="wide">
        <SectionHeader
          overline="Piețe Financiare"
          title="Prezentare Generală a Piețelor &amp; Curs Oficial BNR"
          description="Indicatori financiari și monetari preluați direct din sursele oficiale BNR."
          headingLevel="h2"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="bg-white p-6 space-y-4 rounded-2xl border border-neutral-200 shadow-xs">
              {/* Group header */}
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="text-xs font-bold tracking-[0.16em] text-amber-800 uppercase font-mono">
                  {group.title}
                </h3>
              </div>

              {/* Instruments */}
              <div className="divide-y divide-neutral-100 font-mono text-xs">
                {group.instruments.map((inst) => {
                  const m = inst.metric;
                  const isAvailable = m && m.value !== null;
                  const displayValue = isAvailable
                    ? `${m.value?.toFixed(m.unit === "RON" ? 4 : 2)}${m.unit === "%" ? "%" : m.unit === "RON" ? " RON" : ""}`
                    : "Indisponibil";

                  return (
                    <div
                      key={inst.symbol}
                      className="flex items-center justify-between py-3 transition-colors hover:bg-neutral-50/60"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-mono text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                          {inst.symbol}
                          {m && (
                            <span className="text-[10px] text-neutral-400 font-normal">
                              ({m.source})
                            </span>
                          )}
                        </p>
                        <p className="truncate text-[11px] text-neutral-500 font-sans">
                          {inst.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="font-mono text-xs font-bold text-neutral-950 tabular-nums">
                          {displayValue}
                        </span>
                        {m && (
                          <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                            {isAvailable && m.publishedAt ? `Ref: ${m.publishedAt}` : "Oficial"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <DataDisclaimer type="market" />
        </div>
      </Container>
    </Section>
  );
}
