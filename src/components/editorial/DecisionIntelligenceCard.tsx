"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ListChecks,
  AlertOctagon,
  Sparkles,
} from "lucide-react";

export interface DecisionIntelligenceProps {
  whyYes?: string[];
  whyNot?: string[];
  whyNow?: string;
  benefits?: string[];
  risks?: string[];
  whatToCheck?: string[];
  commonMistakes?: string[];
  keyTakeaway?: string;
  title?: string;
}

export function DecisionIntelligenceCard({
  whyYes = [],
  whyNot = [],
  whyNow,
  benefits = [],
  risks = [],
  whatToCheck = [],
  commonMistakes = [],
  keyTakeaway,
  title = "AiX Decision Intelligence Matrix",
}: DecisionIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<"pros-cons" | "benefits-risks" | "checklist">("pros-cons");

  return (
    <div className="my-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-[var(--border)] bg-gradient-to-r from-amber-500/10 via-transparent to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Cadru Editorial &amp; Suport Decizional</span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            {title}
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="inline-flex rounded-xl bg-neutral-900/80 p-1 border border-[var(--border)] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("pros-cons")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "pros-cons"
                ? "bg-amber-500 text-neutral-950 font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Why Yes / Why Not
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("benefits-risks")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "benefits-risks"
                ? "bg-amber-500 text-neutral-950 font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Beneficii &amp; Riscuri
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("checklist")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "checklist"
                ? "bg-amber-500 text-neutral-950 font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Checklist &amp; Greșeli
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* WHY NOW BANNER (if present) */}
        {whyNow && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                De Ce Acum? (Why Now)
              </span>
              <p className="text-sm text-neutral-200 leading-relaxed font-serif">{whyNow}</p>
            </div>
          </div>
        )}

        {/* TAB 1: WHY YES / WHY NOT */}
        {activeTab === "pros-cons" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WHY YES */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>De Ce Da (Why Yes)</span>
              </div>
              <ul className="space-y-2.5">
                {whyYes.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-400 font-bold font-mono shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHY NOT */}
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>De Ce Nu (Why Not)</span>
              </div>
              <ul className="space-y-2.5">
                {whyNot.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-400 font-bold font-mono shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: BENEFITS & RISKS */}
        {activeTab === "benefits-risks" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BENEFITS */}
            <div className="p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Beneficii Reale</span>
              </div>
              <ul className="space-y-2.5">
                {benefits.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 font-mono shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RISKS */}
            <div className="p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Riscuri &amp; Limitări</span>
              </div>
              <ul className="space-y-2.5">
                {risks.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-500 font-mono shrink-0">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: CHECKLIST & COMMON MISTAKES */}
        {activeTab === "checklist" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WHAT TO CHECK */}
            <div className="p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
                <ListChecks className="w-4 h-4 text-sky-400" />
                <span>Ce Trebuie Să Verifici (Checklist)</span>
              </div>
              <ul className="space-y-2.5">
                {whatToCheck.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-sky-400 font-mono shrink-0">[{idx + 1}]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMMON MISTAKES */}
            <div className="p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4 text-amber-400" />
                <span>Greșeli Frecvente</span>
              </div>
              <ul className="space-y-2.5">
                {commonMistakes.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 font-mono shrink-0">▲</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* KEY TAKEAWAY */}
        {keyTakeaway && (
          <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--surface-subtle)] p-4 rounded-xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 shrink-0">
              Concluzia Cheie (Key Takeaway)
            </span>
            <p className="text-xs text-white font-serif italic">{keyTakeaway}</p>
          </div>
        )}
      </div>
    </div>
  );
}
