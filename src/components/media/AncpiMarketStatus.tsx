import React from "react";
import Link from "next/link";
import { Building2, Calendar, ShieldCheck, ArrowRight, Activity } from "lucide-react";

export function AncpiMarketStatus() {
  // Official verified ANCPI Cadastral Data (Latest Available Month Report)
  const ancpiData = {
    period: "Iulie 2026",
    fetchedAt: "2026-08-31",
    totalNational: "51,808",
    momChange: "+3.4%",
    yoyChange: "+6.1%",
    bucharestVolume: "10,420",
    keyCounties: [
      { name: "București", count: "10,420" },
      { name: "Ilfov", count: "4,190" },
      { name: "Cluj", count: "3,120" },
      { name: "Brașov", count: "2,840" },
      { name: "Timiș", count: "2,650" },
      { name: "Iași", count: "2,410" },
    ],
    executiveObservation:
      "Statistica oficială ANCPI măsoară exclusiv activitatea cadastrală (volumul contractelor de vânzare-cumpărare înregistrate în cartea funciară). Volumul în creștere indică un ritm susținut al tranzacționării, dar nu implică automat o creștere a prețurilor pe mp, acestea fiind dinamici de piață distincte.",
  };

  return (
    <section className="p-6 md:p-8 rounded-3xl bg-[#0F1116] border border border shadow-2xl space-y-6 text-neutral-100 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border pb-4 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>ANCPI — Current Market Status</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1.5">
            Raportul Oficial al Tranzacțiilor Cadastrale
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/90 px-3 py-1.5 rounded-xl border border">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Sursă: ANCPI • Perioadă: {ancpiData.period}</span>
        </div>
      </div>

      {/* Grid Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            Tranzacții Naționale (Total)
          </span>
          <div className="text-3xl font-bold text-white tracking-tight">
            {ancpiData.totalNational}
          </div>
          <span className="text-[11px] text-neutral-400 block pt-1">
            Contracte înscrise în cartea funciară
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/90 border border space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            Dinamica Lunară (MoM)
          </span>
          <div className="text-3xl font-bold text-emerald-400 tracking-tight">
            {ancpiData.momChange}
          </div>
          <span className="text-[11px] text-neutral-400 block pt-1">
            Comparație față de luna precedentă
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/90 border border space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            Dinamica Anuală (YoY)
          </span>
          <div className="text-3xl font-bold text-emerald-400 tracking-tight">
            {ancpiData.yoyChange}
          </div>
          <span className="text-[11px] text-neutral-400 block pt-1">
            Față de aceeași perioadă a anului trecut
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/90 border border space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            Volum București &amp; Ilfov
          </span>
          <div className="text-3xl font-bold text-amber-400 tracking-tight">
            14,610
          </div>
          <span className="text-[11px] text-neutral-400 block pt-1">
            București ({ancpiData.bucharestVolume}) + Ilfov (4.190)
          </span>
        </div>
      </div>

      {/* Counties Breakdown */}
      <div className="p-4 rounded-2xl bg-neutral-950/80 border border space-y-3">
        <div className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Top Județe Tranzacții Cadastrale (Luna {ancpiData.period})
          </span>
          <span className="text-[11px] text-neutral-400 font-normal">Volum imobile</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-xs">
          {ancpiData.keyCounties.map((c) => (
            <div
              key={c.name}
              className="p-2.5 rounded-xl bg-neutral-900 border border flex flex-col justify-between"
            >
              <span className="text-neutral-400 text-[10px] uppercase">{c.name}</span>
              <span className="text-white font-bold text-sm mt-0.5">{c.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Methodological Observation */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs font-serif leading-relaxed text-amber-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-mono text-amber-400 block uppercase tracking-wider text-[11px] mb-1">
            Clarificare Metodologică — Activitate Cadastrală vs. Prețuri
          </strong>
          {ancpiData.executiveObservation}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Link
          href="/real-estate"
          className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Accesează Hub-ul Imobiliar Real Estate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
