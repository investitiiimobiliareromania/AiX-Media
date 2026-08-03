import { TrendingDown, TrendingUp, Minus } from "lucide-react";

import { Overline } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";
import { SectionHeader } from "@/components/editorial/section-header";
import { cn } from "@/lib/utils";
import type { IntelligenceMetric } from "@/config/category-configs";

interface IntelligenceDashboardProps {
  metrics: IntelligenceMetric[];
  categorySlug: string;
  title?: string;
  description?: string;
}

export function IntelligenceDashboard({
  metrics,
  title = "Market Intelligence",
  description,
}: IntelligenceDashboardProps) {
  return (
    <Section
      spacing="lg"
      id="intelligence"
      className="border-t border-border"
      aria-labelledby="intelligence-title"
    >
      <Container size="wide">
        <SectionHeader
          overline="Intelligence Dashboard"
          title={title}
          description={description}
          headingLevel="h2"
        />

        {/* Metrics grid — equal-width columns with hairline borders */}
        <div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric, i) => (
            <MetricCard key={`${metric.label}-${i}`} metric={metric} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-4 text-[0.65rem] tracking-wide text-muted-foreground/50">
          Market data is curated from public sources. Last updated Q1 2025. Not financial advice.
        </p>
      </Container>
    </Section>
  );
}

function MetricCard({ metric }: { metric: IntelligenceMetric }) {
  const TrendIcon =
    metric.trend === "up"
      ? TrendingUp
      : metric.trend === "down"
        ? TrendingDown
        : Minus;

  const trendColor =
    metric.trend === "up"
      ? "text-emerald-400"
      : metric.trend === "down"
        ? "text-red-400"
        : "text-muted-foreground/60";

  return (
    <div className="group flex flex-col justify-between bg-surface/40 p-6 transition-colors hover:bg-surface/80">
      {/* Top: label */}
      <Overline className="text-[0.58rem] leading-relaxed text-muted-foreground/60">
        {metric.label}
      </Overline>

      {/* Middle: value */}
      <div className="my-3 flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-medium tabular-nums text-foreground md:text-3xl">
          {metric.value}
        </span>
        {metric.unit && (
          <span className="font-mono text-xs text-muted-foreground">{metric.unit}</span>
        )}
      </div>

      {/* Bottom: description + trend */}
      <div className="flex items-end justify-between gap-2">
        <span className="text-[0.6rem] leading-tight text-muted-foreground/50">
          {metric.description}
        </span>
        {metric.trendValue && (
          <div className={cn("flex items-center gap-1 flex-shrink-0", trendColor)}>
            <TrendIcon className="h-3 w-3" aria-hidden />
            <span className="font-mono text-[0.6rem] font-medium">{metric.trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
