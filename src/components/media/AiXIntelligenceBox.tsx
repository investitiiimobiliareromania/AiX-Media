import React from "react";
import { getLatestBriefing } from "@/lib/media/service";
import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

export function AiXIntelligenceBox() {
  const briefing = getLatestBriefing();

  return (
    <section className="my-8 p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xl relative overflow-hidden text-neutral-100">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
        {/* Left Header */}
        <div className="space-y-3 lg:w-1/3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Sinteză Editorială AiX
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-tight">
            {briefing.title}
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed font-serif">
            Sinteză informativă redactată pe baza raportărilor oficiale emise de Banca Națională a României, ANCPI și Institutul Național de Statistică.
          </p>
        </div>

        {/* Right Synthesis Columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Evenimente Cheie */}
          <div className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 border-b border-[var(--border)] pb-2.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Evoluții Instituționale
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-mono">
              {briefing.whatChanged.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Decizional */}
          <div className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-[var(--border)] pb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Relevanță &amp; Context Decizional
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-mono">
              {briefing.whyItMatters.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-400 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

