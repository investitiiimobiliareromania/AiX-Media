import React from "react";
import { IntelligenceMetric } from "@/config/category-configs";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import { SourceBadge } from "@/components/common/SourceBadge";

interface IntelligenceDashboardProps {
  metrics: IntelligenceMetric[];
  title?: string;
  description?: string;
  categorySlug?: string;
}

export function IntelligenceDashboard({
  metrics,
  title = "Tablou de Bord & Indicatori Macroeconomici",
  description = "Indicatori oficiali de referință preluați din rapoartele instituționale BNR și ANCPI.",
}: IntelligenceDashboardProps) {
  const hasAvailableData = metrics.some((m) => m.value !== "Unavailable" && m.value !== null);

  return (
    <section className="my-8 p-6 md:p-8 rounded-2xl bg-[#111317] border border-[#262932] relative overflow-hidden shadow-xl text-neutral-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#262932] mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase font-bold tracking-widest">
            <Activity className="w-4 h-4 text-amber-500" />
            Terminal Date Instituționale
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold text-white mt-1">{title}</h2>
          <p className="text-xs text-neutral-400 mt-1 font-serif leading-relaxed">{description}</p>
        </div>

        {hasAvailableData ? (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Date Oficiale Verificate
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-[#171920] px-3 py-1.5 rounded-lg border border-[#262932]">
            <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
            Sursă în curs de actualizare
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const isUnavailable = metric.value === "Unavailable" || metric.value === null;
          const displayValue = isUnavailable ? "Date indisponibile" : metric.value;

          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#171920] border border-[#262932] hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="font-medium text-neutral-300">{metric.label}</span>
                {metric.isPositive !== undefined && metric.change && !isUnavailable && (
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
                <div
                  className={`${
                    isUnavailable
                      ? "text-sm font-semibold text-neutral-500"
                      : "text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors"
                  } font-mono tracking-tight`}
                >
                  {displayValue}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#262932] space-y-2">
                <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
                  <BarChart3 className="w-3 h-3 text-amber-500" />
                  <span>{isUnavailable ? "Sursă de date neconectată" : metric.subtext}</span>
                </div>
                {metric.source && (
                  <div className="pt-1">
                    <SourceBadge
                      source={metric.source}
                      publishedAt={metric.publishedAt || metric.date}
                      fetchedAt={metric.fetchedAt}
                      isDelayed={metric.isDelayed}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

