'use client';

import React, { useState } from 'react';
import { CompanyProfile } from '@/lib/business-intelligence-types';
import { CompanyIdentityImage } from '@/components/company-intelligence/CompanyIdentityImage';
import {
  Building2,
  TrendingUp,
  ChevronRight,
  Briefcase,
  AlertTriangle,
  Award,
} from 'lucide-react';

interface CompanyIntelligenceModuleProps {
  companies: CompanyProfile[];
}

export function CompanyIntelligenceModule({ companies }: CompanyIntelligenceModuleProps) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile>(companies[0]!);

  return (
    <section id="companies" className="space-y-6 pt-4 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            Company Intelligence
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Profilurile Marilor Companii din România
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {companies.length} Corporații Verificate BVB &amp; Mediul Privat
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Company Selection Cards (Scrollable List) */}
        <div className="lg:col-span-5 space-y-3 max-h-[680px] overflow-y-auto pr-1 no-scrollbar">
          {companies.map((comp) => {
            const isSelected = selectedCompany.id === comp.id;
            return (
              <div
                key={comp.id}
                onClick={() => setSelectedCompany(comp)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-500/60 shadow-xl'
                    : 'bg-neutral-950/60 border-neutral-800/80 hover:bg-neutral-900/60 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CompanyIdentityImage
                    src={comp.logo}
                    name={comp.name}
                    symbol={comp.symbol}
                    industry={comp.industry}
                    slug={comp.slug}
                    size="md"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-white text-sm truncate">{comp.name}</span>
                      {comp.symbol && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded">
                          {comp.symbol}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-400 font-serif truncate">{comp.industry}</div>
                    <div className="text-[11px] font-mono text-neutral-300 mt-1 flex items-center gap-3">
                      <span>Venituri: <strong className="text-white">{comp.revenue}</strong></span>
                      <span>Profit: <strong className="text-emerald-400">{comp.profit}</strong></span>
                    </div>
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 transition-transform shrink-0 ${
                    isSelected ? 'text-amber-400 translate-x-1' : 'text-neutral-600'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right Side: Detailed Selected Company Profile Terminal View */}
        <div className="lg:col-span-7 bg-neutral-900 rounded-3xl border border-neutral-800 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-4">
              <CompanyIdentityImage
                src={selectedCompany.logo}
                name={selectedCompany.name}
                symbol={selectedCompany.symbol}
                industry={selectedCompany.industry}
                slug={selectedCompany.slug}
                size="lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl font-bold text-white">{selectedCompany.name}</h3>
                  {selectedCompany.symbol && (
                    <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-md">
                      BVB: {selectedCompany.symbol}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-neutral-400 mt-0.5">
                  {selectedCompany.industry} • SEDIU: {selectedCompany.headquarters}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-end gap-1">
              <div className="text-[10px] font-mono uppercase text-neutral-400">CEO / Conducere</div>
              <div className="text-sm font-mono font-bold text-amber-300">{selectedCompany.ceo}</div>
            </div>
          </div>

          {/* 4 Financial Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">Cifră Afaceri</div>
              <div className="text-base font-bold text-white">{selectedCompany.revenue}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">Profit Net</div>
              <div className="text-base font-bold text-emerald-400">{selectedCompany.profit}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">Angajați</div>
              <div className="text-base font-bold text-white">{selectedCompany.employees.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">Ritm Creștere</div>
              <div className="text-base font-bold text-amber-400">{selectedCompany.growth}</div>
            </div>
          </div>

          {/* Business Model & Structure Details */}
          <div className="space-y-4 text-xs font-serif leading-relaxed text-neutral-300">
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                Model de Afaceri &amp; Activitate
              </h4>
              <p className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
                {selectedCompany.businessModel}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-serif">
              <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/60 space-y-1">
                <div className="font-mono text-[11px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Oportunități Cheie</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-neutral-300">
                  {selectedCompany.opportunities.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/60 space-y-1">
                <div className="font-mono text-[11px] uppercase font-bold text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Riscuri Sectoriale</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-neutral-300">
                  {selectedCompany.risks.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Corporate Developments Timeline */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                Evoluții Corporative Recente
              </h4>
              <div className="space-y-1.5 font-mono text-[11px]">
                {selectedCompany.recentDevelopments.map((dev, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-neutral-200">
                    {dev}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
