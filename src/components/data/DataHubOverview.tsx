"use client";

import React, { useState, useMemo } from "react";
import { DataIndicator } from "@/lib/data-intelligence/types";
import { DataIndicatorCard } from "./DataIndicatorCard";
import {
  Search,
  BarChart3,
  Landmark,
  Building,
  TrendingUp,
  Coins,
  ShieldCheck,
} from "lucide-react";

interface DataHubOverviewProps {
  initialIndicators: DataIndicator[];
}

export function DataHubOverview({ initialIndicators }: DataHubOverviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "Toți Indicatorii", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: "romania-macro", label: "Macroeconomie România", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: "money-credit", label: "Bani, Dobânzi & BNR", icon: <Landmark className="w-3.5 h-3.5" /> },
    { id: "real-estate", label: "Piața Imobiliară (ANCPI & INS)", icon: <Building className="w-3.5 h-3.5" /> },
    { id: "markets", label: "Burse & Indici (BVB / Global)", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: "commodities", label: "Mărfuri & Active de Rezervă", icon: <Coins className="w-3.5 h-3.5" /> },
  ];

  const filteredIndicators = useMemo(() => {
    return initialIndicators.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialIndicators, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-300 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Caută indicator, sursă (INS, BNR, BVB)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl py-2 pl-9 pr-4 text-xs font-mono text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid of Indicator Cards */}
      {filteredIndicators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndicators.map((indicator) => (
            <DataIndicatorCard key={indicator.id} indicator={indicator} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] text-center space-y-3">
          <p className="text-sm font-serif text-neutral-400">
            Nu a fost găsit niciun indicator care să corespundă criteriilor de căutare.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-amber-400 text-xs font-mono font-bold"
          >
            Resetează filtrele
          </button>
        </div>
      )}

      {/* Provenance Audit Footer Note */}
      <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Toți indicatorii din această secțiune respectă standardul de proveniență primară AiX Data.</span>
        </div>
        <span className="text-neutral-500 text-[11px]">
          Fără date extrapolate • Fără cotații sintetice
        </span>
      </div>
    </div>
  );
}
