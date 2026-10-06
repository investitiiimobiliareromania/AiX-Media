"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  Search,
  BookOpen,
  Clock,
  ShieldCheck,
  Building2,
  TrendingUp,
  Coins,
  FileCheck,
  Plane,
  Hammer,
  Scale,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { EducationalArticle } from "@/lib/education/education-service";

interface AcademyHubOverviewProps {
  initialArticles: EducationalArticle[];
}

const categoryIcons: Record<string, React.ElementType> = {
  insurance: ShieldCheck,
  "real-estate": Building2,
  credit: Coins,
  markets: TrendingUp,
  dubai: FileCheck,
  aviation: Plane,
  construction: Hammer,
  money: DollarSign,
  tax: Scale,
  economy: Sparkles,
  business: BookOpen,
};

const categoryLabels: Record<string, string> = {
  all: "Toate Categoriile",
  insurance: "Asigurări & Risc",
  "real-estate": "Imobiliare & Cadastru",
  credit: "Credite & Dobânzi",
  money: "Bani & Lichiditate",
  tax: "Fiscalitate & Taxe",
  markets: "Piețe & BVB",
  dubai: "Dubai Real Estate",
  economy: "Macroeconomie",
  aviation: "Aviație Executivă",
  construction: "Construcții",
};

export function AcademyHubOverview({ initialArticles }: AcademyHubOverviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialArticles.map((a) => a.category)));
    return ["all", ...unique];
  }, [initialArticles]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter */}
      <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-amber-500" />
              Ghiduri Educaționale &amp; Suport Decizional
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Bază permanentă de cunoștințe verificată: {initialArticles.length} ghiduri structurate
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Caută în ghiduri (ex: RCA, IRCC, Randament)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || BookOpen;
            const label = categoryLabels[cat] || cat.toUpperCase();
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-neutral-950 font-bold shadow-md"
                    : "bg-[var(--surface-subtle)] text-neutral-400 hover:text-white border border-[var(--border)]"
                }`}
              >
                {cat !== "all" && <Icon className="w-3.5 h-3.5" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3">
          <BookOpen className="w-8 h-8 text-neutral-500 mx-auto" />
          <p className="text-base text-neutral-300 font-serif">Nu au fost găsite ghiduri conform criteriilor selectate.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-mono text-amber-400 underline hover:text-amber-300"
          >
            Resetează filtrele de căutare
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const Icon = categoryIcons[article.category] || BookOpen;
            return (
              <Link
                key={article.id}
                href={`/academy/${article.slug}`}
                className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group hover:translate-y-[-2px]"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{article.categoryLabel}</span>
                    </span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed font-serif line-clamp-3">
                    {article.shortAnswer}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Ghid Decizional</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Citește Ghidul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
