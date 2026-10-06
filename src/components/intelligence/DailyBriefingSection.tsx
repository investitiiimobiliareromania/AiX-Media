import React from "react";
import { dailyBriefingItems } from "@/lib/data-intelligence/data-hub-service";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Compass,
} from "lucide-react";
import Link from "next/link";

export function DailyBriefingSection() {
  return (
    <section className="p-6 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl space-y-8 relative overflow-hidden">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-500" />
            AiX Intelligence • Daily Briefing
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mt-1">
            5 Lucruri Esențiale Care Contează Astăzi
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif mt-1">
            Sinteză executivă structurată pe surse oficiale primare: economie, imobiliare, credite, bursă și piețe globale.
          </p>
        </div>

        <Link
          href="/data"
          className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>Accesează Hub-ul AiX Data</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 5 Key Briefing Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyBriefingItems.map((item, index) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg ${
              index === 0 ? "lg:col-span-2 md:col-span-2 bg-gradient-to-br from-neutral-950 via-neutral-950 to-amber-950/20 border-amber-500/30" : ""
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {item.categoryLabel}
                </span>
                <span className="font-mono text-[10px] text-neutral-500">
                  Nr. {index + 1} din 5
                </span>
              </div>

              <h3 className="font-serif text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                {item.headline}
              </h3>

              <p className="text-xs md:text-sm text-neutral-300 font-serif leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Why It Matters Callout */}
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                De Ce Contează
              </div>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                {item.whyItMatters}
              </p>
            </div>

            {/* Provenance Footer */}
            <div className="text-[10px] font-mono text-neutral-400 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-900">
              <div className="flex items-center gap-1">
                <span className="text-neutral-500">Sursă:</span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-amber-400 flex items-center gap-0.5 underline font-semibold"
                >
                  <span>{item.sourceName}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              </div>
              <div className="text-neutral-500">
                Perioadă: <span className="text-neutral-400">{item.reportingPeriod}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
