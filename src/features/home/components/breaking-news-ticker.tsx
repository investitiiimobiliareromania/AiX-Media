import Link from "next/link";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface IntelligenceSignal {
  label: string;
  value: string;
  change?: string;
  href: string;
  trend: "up" | "down" | "neutral";
}

const intelligenceSignals: IntelligenceSignal[] = [
  { label: "BET Index", value: "18,420.5", change: "+2.3%", href: "/markets", trend: "up" },
  { label: "EUR/RON", value: "4.9765", change: "+0.02%", href: "/markets", trend: "neutral" },
  { label: "Bucharest Apartments", value: "€1,850/m²", change: "+4.2% YoY", href: "/real-estate", trend: "up" },
  { label: "BNR Policy Rate", value: "6.50%", change: "−0.25%", href: "/finance", trend: "down" },
  { label: "ROBOR 3M Rate", value: "5.58%", change: "-0.05%", href: "/finance", trend: "down" },
  { label: "Cluj-Napoca Apts.", value: "€2,100/m²", change: "+6.1% YoY", href: "/real-estate", trend: "up" },
  { label: "10Y Bond Yield", value: "6.42%", change: "−15bps", href: "/markets", trend: "down" },
  { label: "Gold Spot", value: "$2,348/oz", change: "+0.6%", href: "/markets", trend: "up" },
];

const allSignals = [...intelligenceSignals, ...intelligenceSignals];

type BreakingNewsTickerProps = {
  className?: string;
};

export function BreakingNewsTicker({ className }: BreakingNewsTickerProps) {
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
            Live
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden py-3" aria-hidden>
          <div className="ticker-track flex w-max items-center gap-10 px-4">
            {allSignals.map((signal, index) => {
              const trendColor =
                signal.trend === "up"
                  ? "text-emerald-400"
                  : signal.trend === "down"
                    ? "text-red-400"
                    : "text-muted-foreground/70";

              return (
                <Link
                  key={`signal-${index}`}
                  href={signal.href}
                  className="flex shrink-0 items-center gap-2 text-xs transition-opacity hover:opacity-70"
                  tabIndex={-1}
                >
                  <span className="font-mono text-muted-foreground/70">{signal.label}</span>
                  <span className="font-mono font-medium text-foreground">{signal.value}</span>
                  {signal.change && (
                    <span className={cn("font-mono font-medium", trendColor)}>
                      {signal.change}
                    </span>
                  )}
                  <span className="text-border" aria-hidden>·</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
