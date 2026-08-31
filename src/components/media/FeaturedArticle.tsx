import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/media/models/article";
import { ArrowUpRight, Clock, Flame } from "lucide-react";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group block w-full rounded-2xl overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:col-span-7 overflow-hidden bg-[var(--surface-elevated)]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7F5] via-transparent to-transparent lg:hidden opacity-80" />
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[var(--surface-elevated)]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                Investigație Principală
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-300 text-[10px] font-mono font-semibold">
                {article.categoryLabel}
              </span>
              {article.breaking && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-500/40 text-rose-400 text-[10px] font-mono font-bold">
                  <Flame className="w-3 h-3 text-rose-400" />
                  Raport Oficial
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-amber-400 transition-colors leading-[1.2] tracking-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-400 line-clamp-3 leading-relaxed font-serif">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-amber-400 flex items-center justify-center font-bold text-[10px]">
                A
              </div>
              <span className="text-neutral-200 font-semibold truncate max-w-[160px]">
                {article.authorName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {article.readTime}
              </span>
              <span className="hidden sm:inline-flex items-center gap-0.5 text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                Citește raportul
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
