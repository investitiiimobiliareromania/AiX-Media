import { Container } from "@/components/layout/container";
import { marketGroups } from "@/constants/markets";
import { cn } from "@/lib/utils";

type MarketStripProps = {
  className?: string;
};

export function MarketStrip({ className }: MarketStripProps) {
  const instruments = marketGroups.flatMap((group) => group.instruments).slice(0, 6);

  return (
    <div className={cn("hidden border-b border-border bg-surface md:block", className)}>
      <Container>
        <div
          className="flex items-center gap-6 overflow-x-auto py-2"
          aria-label="Market symbols"
        >
          {instruments.map((instrument) => (
            <div
              key={instrument.symbol}
              className="flex shrink-0 items-center gap-3 font-mono text-xs"
            >
              <span className="text-foreground">{instrument.symbol}</span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">—</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
