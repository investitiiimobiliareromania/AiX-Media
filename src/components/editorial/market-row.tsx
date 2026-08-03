import type { MarketInstrument } from "@/constants/markets";
import { cn } from "@/lib/utils";

type MarketRowProps = {
  instrument: MarketInstrument;
  className?: string;
};

export function MarketRow({ instrument, className }: MarketRowProps) {
  const trendColor =
    instrument.trend === "up"
      ? "text-emerald-400"
      : instrument.trend === "down"
        ? "text-red-400"
        : "text-muted-foreground";

  const changePrefix =
    instrument.trend === "up" ? "↑" : instrument.trend === "down" ? "↓" : "→";

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border py-3 last:border-b-0",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="font-mono text-sm text-foreground">{instrument.symbol}</p>
        <p className="truncate text-xs text-muted-foreground">{instrument.name}</p>
      </div>
      <span className="font-mono text-sm tabular-nums text-foreground">
        {instrument.value ?? "—"}
      </span>
      <span
        className={cn(
          "w-16 text-right font-mono text-xs font-medium tabular-nums",
          trendColor,
        )}
      >
        {instrument.change ? `${changePrefix} ${instrument.change}` : "—"}
      </span>
    </div>
  );
}
