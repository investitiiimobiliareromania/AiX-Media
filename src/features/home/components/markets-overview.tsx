import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SectionHeader } from "@/components/editorial/section-header";
import { Container, Section } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { getMarketData } from "@/lib/market-data";

export async function MarketsOverview() {
  const snapshot = await getMarketData();
  const getMetric = (symbol: string) => {
    const list = [
      ...snapshot.currencies,
      ...snapshot.interestRates,
      ...snapshot.equities,
      ...snapshot.commodities,
    ];
    return list.find(item => item.symbol === symbol);
  };

  const groups = [
    {
      title: "Indices",
      instruments: [
        { symbol: "BET", name: "Bucharest Exchange Trading", metric: getMetric("BET") },
        { symbol: "BET-TR", name: "BET Total Return Index", metric: getMetric("BET-TR") },
        { symbol: "BET-NG", name: "BET Energy & Utilities", metric: getMetric("BET-NG") },
      ],
    },
    {
      title: "Currencies",
      instruments: [
        { symbol: "EUR/RON", name: "Euro / Romanian Leu", metric: getMetric("EUR/RON") },
        { symbol: "USD/RON", name: "US Dollar / Romanian Leu", metric: getMetric("USD/RON") },
        { symbol: "GBP/RON", name: "British Pound / Leu", metric: getMetric("GBP/RON") },
        { symbol: "CHF/RON", name: "Swiss Franc / Leu", metric: getMetric("CHF/RON") },
      ],
    },
    {
      title: "Commodities & Crypto",
      instruments: [
        { symbol: "XAU/USD", name: "Gold Spot", metric: getMetric("XAU/USD") },
        { symbol: "BRENT", name: "Brent Crude Oil", metric: getMetric("BRENT") },
        { symbol: "BTC/USD", name: "Bitcoin", metric: getMetric("BTC/USD") },
      ],
    },
  ];

  return (
    <Section spacing="lg" aria-labelledby="markets-title" className="border-t border-border bg-black">
      <Container size="wide">
        <SectionHeader
          overline="Markets"
          title="Markets Overview"
          description="Curated market indicators for major financial markets. Data retrieved from official public sources."
          headingLevel="h2"
        />

        <div className="mt-10 grid gap-px bg-neutral-900 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="bg-black p-6 space-y-4 border border-neutral-900">
              {/* Group header */}
              <div className="border-b border-neutral-900 pb-3">
                <h3 className="text-xs font-semibold tracking-[0.16em] text-amber-500 uppercase">
                  {group.title}
                </h3>
              </div>

              {/* Instruments */}
              <div className="divide-y divide-neutral-900">
                {group.instruments.map((inst) => {
                  const m = inst.metric;
                  const isAvailable = m && m.value !== null;
                  const displayValue = isAvailable ? m.value?.toFixed(4) : "Unavailable";

                  return (
                    <div
                      key={inst.symbol}
                      className="flex items-center justify-between py-3.5 transition-colors hover:bg-neutral-900/40"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-mono text-sm font-medium text-white flex items-center gap-1.5">
                          {inst.symbol}
                          {m && (
                            <span className="text-[9px] text-neutral-500 font-normal">
                              ({m.source})
                            </span>
                          )}
                        </p>
                        <p className="truncate text-[11px] text-neutral-400">
                          {inst.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="font-mono text-xs font-bold text-white tabular-nums">
                          {displayValue}
                        </span>
                        {m && (
                          <span className="text-[9px] text-neutral-500 font-mono mt-0.5">
                            {isAvailable && m.publishedAt ? `Ref: ${m.publishedAt}` : "Offline"}
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

        {/* Disclaimer Area */}
        <div className="mt-8 p-4 rounded bg-neutral-950 border border-neutral-900 text-[11px] leading-relaxed text-neutral-500 font-mono space-y-2 max-w-4xl">
          <p>
            <strong>Disclaimer:</strong> Market information is provided for informational purposes only. Data is sourced from the indicated provider and may be delayed, revised, or temporarily unavailable. AiX Media does not guarantee continuous availability or real-time accuracy of third-party data.
          </p>
          <p>
            BNR exchange rates are official published reference rates and are not equivalent to live interbank or trading-market quotations. Data retrieved from the publicly available BNR source.
          </p>
        </div>
      </Container>
    </Section>
  );
}
