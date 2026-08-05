import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/media/models/article";
import { Clock, Eye, ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  variant?: "standard" | "compact" | "horizontal";
}

export function ArticleCard({ article, variant = "standard" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/${article.category}/${article.slug}`}
        className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all hover:bg-neutral-900"
      >
        <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-neutral-950">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-black/80 text-amber-400 border border-amber-400/20 backdrop-blur-sm">
            {article.categoryLabel}
          </span>
        </div>
        <div className="flex flex-col justify-between flex-1 space-y-2">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono">
            <span>{article.authorName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/${article.category}/${article.slug}`}
        className="group block p-3.5 rounded-lg bg-neutral-900/40 border border-neutral-800/60 hover:border-amber-500/30 transition-all hover:bg-neutral-900/80"
      >
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
          <span className="text-amber-400 uppercase font-semibold">{article.categoryLabel}</span>
          <span>{article.readTime}</span>
        </div>
        <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
      </Link>
    );
  }

  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group flex flex-col rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all overflow-hidden hover:shadow-xl hover:shadow-black/50"
    >
      <div className="relative w-full h-48 bg-neutral-950 overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase bg-black/80 text-amber-400 border border-amber-400/20 backdrop-blur-md">
          {article.categoryLabel}
        </span>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-3 mt-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-neutral-300">{article.authorName}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-amber-400" />
            {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
