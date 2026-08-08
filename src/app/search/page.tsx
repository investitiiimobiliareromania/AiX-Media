"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAllArticles, getTvVideos, getPodcastEpisodes, getAllCompanies } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { Search, Compass, Building2, Mic, Film, TrendingUp } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const allArticles = getAllArticles();
  const videos = getTvVideos();
  const podcasts = getPodcastEpisodes();
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
          c.symbol.toLowerCase().includes(query.toLowerCase())
      )
    : companies;

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* AiX Search Bar */}
      <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-neutral-800 space-y-4 shadow-2xl text-center">
        <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
          <Search className="w-4 h-4" />
          AiX Intelligence Search
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white">Search AiX Terminal & Media Ecosystem</h1>
        <p className="text-xs text-neutral-400 max-w-xl mx-auto">
          Query articles, company profiles, market instruments, video documentaries, and podcast masterclasses.
        </p>

        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (e.g. 'BVB', 'Bucharest Real Estate', 'Banca Transilvania', 'Interest Rates')..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Companies Results */}
      {filteredCompanies.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Building2 className="w-5 h-5 text-amber-400" />
            Company Profiles ({filteredCompanies.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((comp) => (
              <Link
                key={comp.id}
                href={`/companies/${comp.slug}`}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition-colors block space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold">{comp.symbol}</span>
                  <span className="text-white font-bold">{comp.stockPrice}</span>
                </div>
                <h3 className="text-sm font-bold text-white truncate">{comp.name}</h3>
                <p className="text-[11px] text-neutral-400 line-clamp-1">{comp.sector}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Results */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Compass className="w-5 h-5 text-amber-400" />
          Articles & Investigations ({filteredArticles.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>
    </div>
  );
}
