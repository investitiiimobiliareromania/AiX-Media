import React from "react";
import { Article } from "@/lib/media/models/article";
import { ArticleCard } from "./ArticleCard";

interface EditorialGridProps {
  articles: Article[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

export function EditorialGrid({
  articles,
  title = "Rapoarte și Analize Recente",
  description = "Rapoarte economice, analize imobiliare și sinteze de piață din surse oficiale verificate.",
  columns = 3,
}: EditorialGridProps) {
  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="my-8 space-y-6">
      {(title || description) && (
        <div className="border-b border-neutral-200 pb-4">
          <h2 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">{title}</h2>
          {description && <p className="text-xs text-neutral-600 mt-1">{description}</p>}
        </div>
      )}

      <div className={`grid gap-6 ${gridClass}`}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
