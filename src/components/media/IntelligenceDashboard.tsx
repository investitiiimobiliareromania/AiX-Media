import React from "react";
import { IntelligenceMetric } from "@/config/category-configs";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import { SourceBadge } from "@/components/SourceBadge";

interface IntelligenceDashboardProps {
  metrics: IntelligenceMetric[];
  title?: string;
  description?: string;
  categorySlug?: string;
}

export function IntelligenceDashboard({
  metrics,
  title = "Market Intelligence Dashboard",
  description = "Institutional economic indicators and sector performance metrics.",
}: IntelligenceDashboardProps) {
  return (
    <section className="my-10 p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-neutral-800 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-semibold tracking-wider">
            <Activity className="w-4 h-4" />
            Live Intelligence Engine
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">{title}</h2>
          <p className="text-xs text-neutral-400 mt-1">{description}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Periodic Updates
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>{metric.label}</span>
              {metric.isPositive !== undefined && (
                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    metric.isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {metric.isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {metric.change}
                </span>
              )}
            </div>

            <div className="my-3">
              <div className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight">
                {metric.value}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/50 space-y-1.5">
              <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
                <BarChart3 className="w-3 h-3 text-amber-400" />
                <span>{metric.subtext}</span>
              </div>
              {metric.source && (
                <div className="pt-0.5">
                  <SourceBadge source={metric.source} date={metric.date} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
