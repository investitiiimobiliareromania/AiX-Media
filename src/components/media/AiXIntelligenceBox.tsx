import React from "react";
import { getLatestBriefing } from "@/lib/media/service";
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export function AiXIntelligenceBox() {
  const briefing = getLatestBriefing();

  return (
    <section className="my-10 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0d0c07] via-[#080808] to-[#040404] border border-amber-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
        {/* Left Header */}
        <div className="space-y-3 lg:w-1/3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            AiX Intelligence AI Engine
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">
            {briefing.title}
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed font-mono">
            Automated macro synthesis compiled from central bank filings, BVB exchange feeds, and regional market signals.
          </p>
        </div>

        {/* Right Synthesis Columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* What Changed Today */}
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              What Changed Today
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 font-mono">
              {briefing.whatChanged.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why It Matters */}
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Why It Matters for Executives
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 font-mono">
              {briefing.whyItMatters.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
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
