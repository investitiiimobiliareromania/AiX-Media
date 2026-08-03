import { TrendingDown, TrendingUp, Minus } from "lucide-react";

import { SectionHeader } from "@/components/editorial/section-header";
import { Container, Section } from "@/components/layout/container";
import { marketGroups } from "@/constants/markets";
import { cn } from "@/lib/utils";

export function MarketsOverview() {
  return (
    <Section spacing="lg" aria-labelledby="markets-title" className="border-t border-border">
      <Container size="wide">
        <SectionHeader
          overline="Markets"
          title="Markets Overview"
          description="Curated market indicators for Romania's major financial markets. Data sourced from public exchanges — Q1 2025."
          headingLevel="h2"
        />

        <div className="mt-10 grid gap-px bg-border lg:grid-cols-3">
          {marketGroups.map((group) => (
            <div key={group.title} className="bg-background">
              {/* Group header */}
              <div className="border-b border-border bg-surface/40 px-6 py-4">
                <h3 className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {group.title}
                </h3>
              </div>

              {/* Instruments */}
              <div className="divide-y divide-border">
                {group.instruments.map((instrument) => {
                  const TrendIcon =
                    instrument.trend === "up"
                      ? TrendingUp
                      : instrument.trend === "down"
                        ? TrendingDown
                        : Minus;

                  const trendColor =
                    instrument.trend === "up"
                      ? "text-emerald-400"
                      : instrument.trend === "down"
                        ? "text-red-400"
                        : "text-muted-foreground/50";

                  return (
                    <div
                      key={instrument.symbol}
                      className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface/40"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-medium text-foreground">
                          {instrument.symbol}
                        </p>
                        <p className="truncate text-xs text-muted-foreground/60">
                          {instrument.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm tabular-nums text-foreground">
                          {instrument.value ?? "—"}
                        </span>
                        <div className={cn("flex items-center gap-1", trendColor)}>
                          <TrendIcon className="h-3.5 w-3.5" aria-hidden />
                          <span className="font-mono text-xs tabular-nums">
                            {instrument.change ?? "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[0.65rem] tracking-wide text-muted-foreground/40">
          Static indicative data. Not financial advice. Live data integration coming in a later phase.
        </p>
      </Container>
    </Section>
  );
}
