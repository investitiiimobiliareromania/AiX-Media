'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { institutionalDossiers } from '@/lib/institutional-company-dossiers';
import { bvbCompanies, BvbCompanyProfile } from '@/lib/bvb-data';
import { SafeImage } from '@/components/common/SafeImage';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { CompanyTerminalDashboard } from '@/components/company-intelligence/CompanyTerminalDashboard';
import { IndustryIntelligenceModule } from '@/components/company-intelligence/IndustryIntelligenceModule';
import { CompanyRankingsModule } from '@/components/company-intelligence/CompanyRankingsModule';
import { Building2, Award, ChevronRight } from 'lucide-react';

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedOwnership, setSelectedOwnership] = useState('all');
  const [sortBy, setSortBy] = useState('revenue');

  // All companies dataset
  const allCompanies: BvbCompanyProfile[] = bvbCompanies;

  // Filtering & Sorting logic
  const filteredCompanies = allCompanies.filter((c) => {
    const textMatch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.isin && c.isin.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    const sectorMatch = selectedSector === 'all' || c.sector === selectedSector;
    const ownershipMatch =
      selectedOwnership === 'all' ||
      (selectedOwnership === 'public' && c.market === 'Main Market') ||
      (selectedOwnership === 'private' && c.market !== 'Main Market');

    return textMatch && sectorMatch && ownershipMatch;
  });

  // Sorting logic
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === 'revenue') {
      return (b.revenueValue || 0) - (a.revenueValue || 0);
    }
    if (sortBy === 'profit') {
      return (b.netProfit || 0) - (a.netProfit || 0);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. CORPORATE TERMINAL DASHBOARD & FILTERS */}
      <CompanyTerminalDashboard
        companies={allCompanies}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        selectedOwnership={selectedOwnership}
        onOwnershipChange={setSelectedOwnership}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* 2. INDUSTRY INTELLIGENCE & SECTOR ANALYSIS */}
      <IndustryIntelligenceModule />

      {/* 3. COMPANY RANKINGS & LEADERBOARDS */}
      <CompanyRankingsModule companies={allCompanies} />

      {/* 4. FEATURED INSTITUTIONAL DOSSIERS SPOTLIGHT */}
      <section className="space-y-6 pt-4 border-t border-neutral-800">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-2xl font-bold text-white">Institutional Corporate Dossiers Spotlight</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Rapoarte Auditate IFRS 2025</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {institutionalDossiers.map((dossier) => (
            <Link
              key={dossier.id}
              href={`/companies/${dossier.slug}`}
              className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 transition-all space-y-4 block shadow-xl group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0">
                    <SafeImage
                      src={dossier.logo}
                      slug={dossier.slug}
                      alt={dossier.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {dossier.name}
                    </h3>
                    <div className="text-xs font-mono text-neutral-400 mt-0.5">
                      BVB: <strong className="text-amber-400">{dossier.symbol}</strong> • {dossier.industry}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[10px] font-mono font-bold uppercase">
                  COVERAGE: {dossier.coverageScore.overall}%
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-2">
                {dossier.executiveSummary}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 font-mono text-[11px]">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Venituri FY 2025</span>
                  <span className="text-white font-bold">
                    {(dossier.financialHistory[0]!.revenue / 1e9).toFixed(2)}B RON
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Profit Net</span>
                  <span className="text-emerald-400 font-bold">
                    {(dossier.financialHistory[0]!.netProfit / 1e9).toFixed(2)}B RON
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block uppercase">Angajați</span>
                  <span className="text-neutral-200">{dossier.financialHistory[0]!.employees.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. COMPLETE DIRECTORY CATALOG GRID */}
      <section className="space-y-6 pt-4 border-t border-neutral-800">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-2xl font-bold text-white">
              Catalog Registru Companii ({sortedCompanies.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Date Auditate 2025/2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCompanies.map((comp) => (
            <Link
              key={comp.id}
              href={`/companies/${comp.slug}`}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all space-y-3 block shadow-md group"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0">
                  <SafeImage
                    src={comp.logo}
                    slug={comp.slug}
                    alt={comp.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {comp.name}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400">
                    Simbol: <strong className="text-amber-400">{comp.symbol}</strong> • {comp.sector}
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-2">
                {comp.description}
              </p>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between font-mono text-[11px]">
                <span className="text-neutral-400">Venituri: <strong className="text-white">{comp.revenue}</strong></span>
                <span className="text-emerald-400 font-bold">Profit: {comp.netIncome}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
