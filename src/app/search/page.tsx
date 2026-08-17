"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAllArticles, getAllCompanies } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Search, Compass, Building2 } from "lucide-react";
import { BvbCompanyProfile } from "@/lib/bvb-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const allArticles = getAllArticles();
  const companies = getAllCompanies();

  const filteredArticles = query
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : allArticles;

  const filteredCompanies = query
    ? companies.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase()) ||
          ((c as unknown as BvbCompanyProfile).isin &&
            (c as unknown as BvbCompanyProfile).isin.toLowerCase().includes(query.toLowerCase())) ||
          (c.sector && c.sector.toLowerCase().includes(query.toLowerCase()))
      )
    : companies;

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 pb-16">
      {/* Search Header */}
      <div className="p-8 md:p-12 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs text-center">
        <div className="inline-flex items-center gap-2 text-amber-700 font-mono text-xs uppercase font-bold tracking-wider">
          <Search className="w-4 h-4" />
          Căutare Inteligență Economică
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-neutral-950">
          Căutare în Baza de Date &amp; Rapoartele AiX Media
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
          Căutați articole economice, profiluri de companii BVB, rapoarte de analiză și indicatori imobiliari.
        </p>

        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Căutare (ex: 'BVB', 'Imobiliare', 'Banca Transilvania', 'BNR', 'ROBOR')..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-neutral-300 text-neutral-900 text-sm placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none transition-colors shadow-xs"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Companies Results */}
      {filteredCompanies.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2 border-b border-neutral-200 pb-3">
            <Building2 className="w-5 h-5 text-amber-700" />
            Companii Listate ({filteredCompanies.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((comp) => (
              <Link
                key={comp.id}
                href={`/companies/${comp.slug}`}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors block space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-950 font-bold px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200">
                    {comp.symbol}
                  </span>
                  <span className="text-neutral-500">{comp.isin}</span>
                </div>
                <h3 className="text-sm font-bold text-neutral-950 truncate">{comp.name}</h3>
                <p className="text-[11px] text-neutral-500 line-clamp-1">{comp.sector}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Results */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2 border-b border-neutral-200 pb-3">
          <Compass className="w-5 h-5 text-amber-700" />
          Rapoarte &amp; Articole Verificate ({filteredArticles.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
    </div>
  );
}
