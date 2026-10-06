import React from "react";
import { DataIndicator } from "@/lib/data-intelligence/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Info,
} from "lucide-react";

interface DataIndicatorCardProps {
  indicator: DataIndicator;
}

export function DataIndicatorCard({ indicator }: DataIndicatorCardProps) {
  const isUp = indicator.direction === "up";
  const isDown = indicator.direction === "down";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "LATEST OFFICIAL":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "LAST CLOSE":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
    }
  };

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg">
      {/* Top Meta */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            {indicator.categoryLabel}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${getStatusBadge(
              indicator.status
            )}`}
          >
            {indicator.status}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-white tracking-tight leading-snug">
          {indicator.name}
        </h3>
      </div>

      {/* Main Metric & Change */}
      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-2xl md:text-3xl font-serif font-bold text-amber-400">
            {indicator.value}
          </div>
          {indicator.change && (
            <div
              className={`flex items-center gap-1 font-mono text-xs font-bold ${
                isUp ? "text-emerald-400" : isDown ? "text-rose-400" : "text-neutral-400"
              }`}
            >
              {isUp && <TrendingUp className="w-3.5 h-3.5" />}
              {isDown && <TrendingDown className="w-3.5 h-3.5" />}
              {!isUp && !isDown && <Minus className="w-3.5 h-3.5" />}
              <span>
                {indicator.change} {indicator.changePct ? `(${indicator.changePct})` : ""}
              </span>
            </div>
          )}
        </div>

        {indicator.previousValue && (
          <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between border-t border-neutral-900 pt-1.5">
            <span>Valoare anterioară:</span>
            <span className="text-neutral-300 font-semibold">{indicator.previousValue}</span>
          </div>
        )}
      </div>

      {/* Provenance & Dates */}
      <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 pt-2 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Perioadă raportată:</span>
          <span className="text-neutral-200 font-medium">{indicator.period}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Publicat la:</span>
          <span className="text-neutral-300">{indicator.publishedAt}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Verificat AiX:</span>
          <span className="text-neutral-300">{indicator.verifiedAt}</span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-neutral-900/60">
          <span className="text-neutral-500">Sursă autorizată:</span>
          {indicator.sourceUrl ? (
            <a
              href={indicator.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold truncate max-w-[200px]"
            >
              <span className="truncate">{indicator.sourceName}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="text-neutral-300 font-semibold">{indicator.sourceName}</span>
          )}
        </div>
      </div>

      {/* Explainer: Why It Matters */}
      <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 text-[11px] font-serif text-neutral-300 leading-relaxed space-y-1">
        <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-amber-500 tracking-wider">
          <Info className="w-3 h-3" />
          De ce contează
        </div>
        <p>{indicator.whyItMatters}</p>
      </div>
    </div>
  );
}
