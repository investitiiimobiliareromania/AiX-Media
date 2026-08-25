'use client';

import React from 'react';
import {
  Activity,
  TrendingUp,
  Building,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  Globe2,
  Cpu,
} from 'lucide-react';

export function BusinessOverviewDashboard() {
  return (
    <section id="overview" className="space-y-6 pt-2">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">Business Overview</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Romania Business Snapshot • Q3 2026</span>
      </div>

      {/* Snapshot 8-Box Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Romania Business Snapshot */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span className="uppercase font-semibold flex items-center gap-1.5 text-amber-400">
              <Globe2 className="w-3.5 h-3.5" />
              Romania Snapshot
            </span>
            <span>2026</span>
          </div>
          <div className="text-2xl font-serif font-bold text-white">PIB: +3.2% Est.</div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Economia României este susținută de investițiile mari în infrastructură, consumul privat și absorbția fondurilor PNRR.
          </p>
        </div>

        {/* 2. Market Activity */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span className="uppercase font-semibold flex items-center gap-1.5 text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              Market Activity
            </span>
            <span>BVB BET</span>
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400 flex items-center gap-1">
            <span>342.5 Mld RON</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Capitalizarea emitenților listati la BVB crește cu +12.4% YoY, condusă de bănci și companii energetice.
          </p>
        </div>

        {/* 3. Major Investments */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span className="uppercase font-semibold flex items-center gap-1.5 text-sky-400">
              <Building className="w-3.5 h-3.5" />
              Major Investments
            </span>
            <span>Energie &amp; Tech</span>
          </div>
          <div className="text-2xl font-serif font-bold text-white">380MW Data Center</div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Proiecte masive de infrastructură digitală și 100M EUR creditare BEI contractată de UniCredit.
          </p>
        </div>

        {/* 4. M&A Activity */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span className="uppercase font-semibold flex items-center gap-1.5 text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              M&amp;A Activity
            </span>
            <span>2.85 Mld EUR</span>
          </div>
          <div className="text-2xl font-serif font-bold text-white">Tranzacții Record</div>
          <p className="text-xs text-neutral-300 font-serif leading-relaxed">
            Consolidări majore pe piețele bancară, retail și energie regenerabilă pe parcursul anilor 2025-2026.
          </p>
        </div>

        {/* 5. Companies to Watch */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 shadow-lg">
          <div className="text-[11px] font-mono uppercase text-amber-400 font-bold">Companies to Watch</div>
          <div className="text-sm font-serif font-bold text-white">Banca Transilvania, Hidroelectrica, One United</div>
          <p className="text-xs text-neutral-300 font-serif">Liderii de piață care dictează ritmul bursier și investițiile imobiliare.</p>
        </div>

        {/* 6. Industries to Watch */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 shadow-lg">
          <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">Industries to Watch</div>
          <div className="text-sm font-serif font-bold text-white">Energie Verde, Tehnologie AI &amp; Construcții</div>
          <p className="text-xs text-neutral-300 font-serif">Sectoarele cu cea mai mare rată de creștere anuală a investițiilor.</p>
        </div>

        {/* 7. Business Risks */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 shadow-lg">
          <div className="text-[11px] font-mono uppercase text-red-400 font-bold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Business Risks</span>
          </div>
          <div className="text-sm font-serif font-bold text-white">Reforma Fiscală &amp; Costul Muncii</div>
          <p className="text-xs text-neutral-300 font-serif">Ajustările privind salarizarea și modificările de taxare pentru firme.</p>
        </div>

        {/* 8. Emerging Opportunities */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 shadow-lg">
          <div className="text-[11px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Emerging Opportunities</span>
          </div>
          <div className="text-sm font-serif font-bold text-white">Automatizare AI &amp; Gaz Offshore</div>
          <p className="text-xs text-neutral-300 font-serif">Neptun Deep și hub-urile de inovare tehnologică din regiune.</p>
        </div>
      </div>
    </section>
  );
}
