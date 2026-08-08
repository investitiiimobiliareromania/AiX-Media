import { Container } from "@/components/layout/container";
import { marketGroups } from "@/constants/markets";
import { cn } from "@/lib/utils";

type MarketStripProps = {
  className?: string;
};

export function MarketStrip({ className }: MarketStripProps) {
  const instruments = marketGroups.flatMap((g) => g.instruments).slice(0, 8);

  return (
    <div className={cn("hidden border-b border-border bg-surface/60 md:block", className)}>
      <Container>
        <div
          className="flex items-center gap-8 overflow-x-hidden py-2 flex-wrap"
          aria-label="Market overview strip"
        >
          {instruments.map((instrument) => {
            const trendColor =
              instrument.trend === "up"
                ? "text-emerald-400"
                : instrument.trend === "down"
                  ? "text-red-400"
                  : "text-muted-foreground/70";

            return (
              <div
                key={instrument.symbol}
                className="flex shrink-0 items-center gap-2 font-mono text-xs"
              >
                <span className="text-muted-foreground/80">{instrument.symbol}</span>
                {instrument.value && (
                  <span className="text-foreground tabular-nums">{instrument.value}</span>
                )}
                {instrument.change && (
                  <span className={cn("tabular-nums", trendColor)}>{instrument.change}</span>
                )}
              </div>
            );
          })}
          <span className="ml-auto shrink-0 text-[0.6rem] tracking-[0.14em] text-muted-foreground/40 uppercase">
            Static · Q1 2025
          </span>
        </div>
      </Container>
    </div>
  );
}
