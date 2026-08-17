import React from "react";
import { getLatestBriefing } from "@/lib/media/service";
import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

export function AiXIntelligenceBox() {
  const briefing = getLatestBriefing();

  return (
    <section className="my-8 p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
        {/* Left Header */}
        <div className="space-y-2.5 lg:w-1/3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Sinteză Editorială AiX
          </div>
          <h2 className="text-2xl font-black text-neutral-950 leading-tight">
            {briefing.title}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-mono">
            Sinteză informativă redactată pe baza raportărilor oficiale emise de Banca Națională a României, ANCPI și Institutul Național de Statistică.
          </p>
        </div>

        {/* Right Synthesis Columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Evenimente Cheie */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase text-amber-800 flex items-center gap-1.5 border-b border-neutral-100 pb-2">
              <Zap className="w-4 h-4 text-amber-600" />
              Evoluții Instituționale
            </h3>
            <ul className="space-y-2 text-xs text-neutral-700 font-mono">
              {briefing.whatChanged.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Decizional */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase text-emerald-800 flex items-center gap-1.5 border-b border-neutral-100 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Relevanță &amp; Context Decizional
            </h3>
            <ul className="space-y-2 text-xs text-neutral-700 font-mono">
              {briefing.whyItMatters.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
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
