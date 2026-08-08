import Link from "next/link";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
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
    ...equities.map(e => ({ label: e.symbol, value: "Unavailable", source: "BVB", href: "/markets" })),
    ...bnrCurrencies.map(c => ({ label: c.symbol, value: c.value!.toFixed(4), source: "BNR", href: "/markets" })),
    ...commodities.slice(0, 2).map(co => ({ label: co.symbol, value: "Unavailable", source: co.source, href: "/markets" })),
  ];

  const allSignals = [...tickerSignals, ...tickerSignals];

  return (
    <div
      className={cn("border-b border-border bg-surface/60", className)}
      aria-label="Market intelligence ticker"
      role="complementary"
    >
      <Container className="flex items-stretch">
        <div className="flex shrink-0 items-center gap-2 border-r border-border px-4 py-3">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
            Market
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden py-3" aria-hidden>
          <div className="ticker-track flex w-max items-center gap-10 px-4">
            {allSignals.map((signal, index) => (
              <Link
                key={`signal-${index}`}
                href={signal.href}
                className="flex shrink-0 items-center gap-2 text-xs transition-opacity hover:opacity-70"
                tabIndex={-1}
              >
                <span className="font-mono text-muted-foreground/70">{signal.label}</span>
                <span className="font-mono font-medium text-foreground">{signal.value}</span>
                <span className="text-[10px] text-muted-foreground/45">({signal.source})</span>
                <span className="text-border" aria-hidden>·</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
