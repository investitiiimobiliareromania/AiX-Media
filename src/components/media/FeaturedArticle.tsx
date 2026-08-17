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
      className="group block w-full rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-amber-600/50 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:col-span-7 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-neutral-50/50">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                Investigație Principală
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-neutral-300 text-neutral-800 text-[11px] font-mono font-semibold">
                {article.categoryLabel}
              </span>
              {article.breaking && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-mono font-bold">
                  <Flame className="w-3 h-3 text-rose-600" />
                  Raport Oficial
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 group-hover:text-amber-700 transition-colors leading-tight tracking-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-[10px]">
                A
              </div>
              <span className="text-neutral-900 font-semibold truncate max-w-[160px]">
                {article.authorName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-neutral-500">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {article.readTime}
              </span>
              <span className="hidden sm:inline-flex items-center gap-0.5 text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
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
