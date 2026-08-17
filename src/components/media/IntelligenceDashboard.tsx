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
  description = "Indicatori oficiali de referință preluați din rapoartele instituționale.",
}: IntelligenceDashboardProps) {
  const hasAvailableData = metrics.some((m) => m.value !== "Unavailable" && m.value !== null);

  return (
    <section className="my-8 p-6 md:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 relative overflow-hidden shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 font-mono text-xs uppercase font-bold tracking-wider">
            <Activity className="w-4 h-4 text-amber-600" />
            Monitorizare Date Oficiale
          </div>
          <h2 className="text-xl md:text-2xl font-black text-neutral-950 mt-1">{title}</h2>
          <p className="text-xs text-neutral-600 mt-1">{description}</p>
        </div>

        {hasAvailableData ? (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Date Oficiale Verificate
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
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
              className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-center justify-between text-xs text-neutral-600 font-mono">
                <span className="font-medium text-neutral-700">{metric.label}</span>
                {metric.isPositive !== undefined && metric.change && !isUnavailable && (
                  <span
                    className={`flex items-center gap-0.5 font-bold ${
                      metric.isPositive ? "text-emerald-700" : "text-rose-700"
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
                      ? "text-sm font-semibold text-neutral-400"
                      : "text-2xl md:text-3xl font-black text-neutral-950"
                  } font-mono tracking-tight`}
                >
                  {displayValue}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                <div className="text-[11px] text-neutral-500 font-mono flex items-center gap-1.5">
                  <BarChart3 className="w-3 h-3 text-amber-600" />
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
