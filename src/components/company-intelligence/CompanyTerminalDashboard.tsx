'use client';

import React from 'react';
import { Search, Filter, ArrowUpDown, Building2, TrendingUp, Users, DollarSign, ShieldCheck } from 'lucide-react';
import { BvbCompanyProfile } from '@/lib/bvb-data';

interface CompanyTerminalDashboardProps {
  companies: BvbCompanyProfile[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSector: string;
  onSectorChange: (s: string) => void;
  selectedOwnership: string;
  onOwnershipChange: (o: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
}

export function CompanyTerminalDashboard({
  companies,
  searchQuery,
  onSearchChange,
  selectedSector,
  onSectorChange,
  selectedOwnership,
  onOwnershipChange,
  sortBy,
  onSortChange,
}: CompanyTerminalDashboardProps) {
  const publicCount = companies.filter((c) => c.market === 'Main Market').length;
  const privateCount = companies.filter((c) => c.market !== 'Main Market').length;

  const totalRevenueBillionRon = (
    companies.reduce((sum, c) => sum + (c.revenueValue || 0), 0) / 1000000000
  ).toFixed(1);

  const sectors = ['all', ...Array.from(new Set(companies.map((c) => c.sector)))];

  return (
    <div className="space-y-6">
      {/* Terminal Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/40 p-6 md:p-8 border border-neutral-800 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Corporate Intelligence Terminal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight">
              CORPORATE &amp; BVB COMPANIES INTELLIGENCE
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-serif max-w-3xl leading-relaxed">
              Bază instituțională de cercetare corporativă: dosare de business intelligence pentru marile companii românești, emitente BVB și lideri din energie, bancar, retail, automotive și tehnologie.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-0.5">
              <div className="text-[10px] text-neutral-400">Total Companii</div>
              <div className="text-xl font-bold text-white">{companies.length} Companii</div>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-0.5">
              <div className="text-[10px] text-neutral-400">Public BVB</div>
              <div className="text-xl font-bold text-amber-400">{publicCount} Emitenți</div>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-0.5">
              <div className="text-[10px] text-neutral-400">Privat / Lideri</div>
              <div className="text-xl font-bold text-emerald-400">{privateCount} Grupuri</div>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-0.5">
              <div className="text-[10px] text-neutral-400">Venit Agregat</div>
              <div className="text-xl font-bold text-sky-400">{totalRevenueBillionRon} Mld RON</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          {/* Instant Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Caută companie, CEO, CUI..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-950 text-white pl-9 pr-3 py-2 rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none placeholder-neutral-500"
            />
          </div>

          {/* Industry Sector Dropdown */}
          <div className="relative">
            <select
              value={selectedSector}
              onChange={(e) => onSectorChange(e.target.value)}
              className="w-full bg-neutral-950 text-neutral-200 px-3 py-2 rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Toate Industriile</option>
              {sectors.filter((s) => s !== 'all').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Ownership Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedOwnership}
              onChange={(e) => onOwnershipChange(e.target.value)}
              className="w-full bg-neutral-950 text-neutral-200 px-3 py-2 rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Toate Tipurile de Capital</option>
              <option value="public">Listat BVB Main Market</option>
              <option value="private">Privat / Lideri de Industrie</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-neutral-950 text-neutral-200 px-3 py-2 rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="revenue">Sortează: Venituri (Descrescător)</option>
              <option value="profit">Sortează: Profit Net (Descrescător)</option>
              <option value="name">Sortează: Nume Companie (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
