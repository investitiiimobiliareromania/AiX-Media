import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getMarketData } from "@/lib/market-data";

type BreakingNewsTickerProps = {
  className?: string;
};

export async function BreakingNewsTicker({ className }: BreakingNewsTickerProps) {
  const snapshot = await getMarketData();
  const currencies = snapshot.currencies;
  const equities = snapshot.equities;
  const commodities = snapshot.commodities;

  // Map currencies and indices to ticker format
  const bnrCurrencies = currencies.filter(c => c.value !== null);
  
  const tickerSignals = [
    ...bnrCurrencies.map(c => ({ label: c.symbol, value: c.value!.toFixed(4), source: "BNR", href: "/markets" })),
    ...equities.map(e => ({ label: e.symbol, value: "Indisponibil", source: "BVB", href: "/markets" })),
    ...commodities.filter(co => co.value !== null).map(co => ({ label: co.symbol, value: co.value!.toFixed(2), source: "BNR", href: "/markets" })),
  ];

  const allSignals = [...tickerSignals, ...tickerSignals];

  return (
    <div
      className={`border-b border-neutral-200 bg-neutral-50 text-neutral-800 ${className || ""}`}
      aria-label="Market intelligence ticker"
      role="complementary"
    >
      <Container className="flex items-stretch">
        <div className="flex shrink-0 items-center gap-2 border-r border-neutral-200 px-4 py-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-600" aria-hidden />
          <span className="text-xs font-mono font-bold tracking-wider text-amber-800 uppercase">
            Curs BNR
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden py-2.5" aria-hidden>
          <div className="ticker-track flex w-max items-center gap-8 px-4 font-mono text-xs">
            {allSignals.map((signal, index) => (
              <Link
                key={`signal-${index}`}
                href={signal.href}
                className="flex shrink-0 items-center gap-2 text-xs transition-opacity hover:opacity-70 text-neutral-700"
                tabIndex={-1}
              >
                <span className="font-semibold text-neutral-950">{signal.label}</span>
                <span className="font-bold text-neutral-900">{signal.value}</span>
                <span className="text-[10px] text-neutral-500">({signal.source})</span>
                <span className="text-neutral-300" aria-hidden>•</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
