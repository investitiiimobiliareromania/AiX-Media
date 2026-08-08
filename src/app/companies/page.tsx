"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllCompanies } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Building2, Search, ArrowRight } from "lucide-react";
import { BvbCompanyProfile } from "@/lib/bvb-data";

export default function CompaniesPage() {
  const [query, setQuery] = useState("");
  const allCompanies = getAllCompanies();

  const filteredCompanies = query
    ? allCompanies.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase()) ||
          ((c as unknown as BvbCompanyProfile).isin && (c as unknown as BvbCompanyProfile).isin.toLowerCase().includes(query.toLowerCase())) ||
          (c.sector && c.sector.toLowerCase().includes(query.toLowerCase()))
      )
    : allCompanies;

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow="AiX Enterprise Intelligence"
        headline="Institutional Profiles of Romania's Corporate Champions"
        description="Comprehensive teardowns of market capitalization, revenue trajectories, executive leadership, and strategic milestones for top listed and private companies."
        ctaLabel="Explore All Profiles"
        ctaHref="#catalog"
      />

      <section id="catalog" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-800 pb-3 gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            BVB Listed & Regional Enterprise Champions ({filteredCompanies.length})
          </h2>
          
          {/* Search Bar inside Catalog */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ticker, ISIN or sector..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
          </div>
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((comp) => (
              <Link
                key={comp.id}
                href={`/companies/${comp.slug}`}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all hover:bg-neutral-900 space-y-4 shadow-xl block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0">
                      <Image src={comp.logo} alt={comp.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-white leading-snug">{comp.name}</h3>
                      <span className="text-xs font-mono text-amber-400 font-semibold">{comp.symbol} • BVB Listed</span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0">
                    <div className="text-sm md:text-base font-bold text-white">{comp.stockPrice}</div>
                    <div className="text-[10px] text-neutral-500 uppercase mt-0.5">Indicative price</div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">{comp.description}</p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 font-mono text-[11px]">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Market Cap</span>
                    <span className="text-white font-bold">{comp.marketCap}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Revenue</span>
                    <span className="text-white font-bold">{comp.revenue}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Div Yield</span>
                    <span className="text-amber-400 font-bold">{comp.dividendYield}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-neutral-500 font-mono text-sm border border-dashed border-neutral-800 rounded-xl">
            No corporate champions found matching your criteria.
          </div>
        )}
      </section>

      <NewsletterBox />
    </div>
  );
}
