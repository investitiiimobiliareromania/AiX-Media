"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllCompanies } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Building2, Search, ExternalLink } from "lucide-react";
import { BvbCompanyProfile } from "@/lib/bvb-data";

export default function CompaniesPage() {
  const [query, setQuery] = useState("");
  const allCompanies = getAllCompanies();

  const filteredCompanies = query
    ? allCompanies.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase()) ||
          ((c as unknown as BvbCompanyProfile).isin &&
            (c as unknown as BvbCompanyProfile).isin.toLowerCase().includes(query.toLowerCase())) ||
          (c.sector && c.sector.toLowerCase().includes(query.toLowerCase()))
      )
    : allCompanies;

  return (
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="Inteligență Corporativă BVB"
        headline="Profiluri Instituționale &amp; Rapoarte Financiare"
        description="Date oficiale de raportare anuală auditată pentru principalele societăți comerciale listate la Bursa de Valori București."
        ctaLabel="Explorează Profilurile"
        ctaHref="#catalog"
        marketSignals={[
          { label: "Banca Transilvania", value: "TLV (BVB)", change: "ROTLVAACNOR1", isPositive: true },
          { label: "Hidroelectrica", value: "H2O (BVB)", change: "RO4609590897", isPositive: true },
          { label: "OMV Petrom", value: "SNP (BVB)", change: "ROSNPPACNOR9", isPositive: true },
        ]}
      />

      <section id="catalog" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#262932] pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
              <Building2 className="w-4 h-4" />
              Catalog Companii Listate ({filteredCompanies.length})
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
              Societăți Verificate &amp; Raportări Financiare
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută după nume, simbol (TLV), ISIN sau sector..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#171920] border border-[#262932] text-white text-xs placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none transition-colors shadow-xs"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((comp) => {
              const bvbComp = comp as unknown as BvbCompanyProfile;
              return (
                <Link
                  key={comp.id}
                  href={`/companies/${comp.slug}`}
                  className="p-6 rounded-2xl bg-[#111317] border border-[#262932] hover:border-amber-500/50 hover:bg-[#171920] transition-all space-y-4 block shadow-lg group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#262932] bg-[#0c0d12] shrink-0">
                        <Image src={comp.logo} alt={comp.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                          {comp.name}
                        </h3>
                        <span className="text-xs font-mono text-neutral-400 font-semibold">
                          Simbol: <strong className="text-amber-400">{comp.symbol}</strong> • {bvbComp.isin || "BVB"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <div className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1f222b] border border-[#262932] text-neutral-300">
                        Piața Reglementată
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-serif line-clamp-2">
                    {comp.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#262932] font-mono text-[11px]">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Venituri Raportate</span>
                      <span className="text-white font-bold">{comp.revenue}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Profit Net</span>
                      <span className="text-white font-bold">{comp.netIncome}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Sursă Date</span>
                      <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                        BVB Issuer <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-neutral-400 font-mono text-sm border border-dashed border-[#262932] rounded-2xl bg-[#111317]">
            Nu a fost găsită nicio companie conform criteriilor de căutare.
          </div>
        )}
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}

