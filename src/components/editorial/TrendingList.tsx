import Link from "next/link";

interface TrendingListProps {
  articles: Array<{
    title: string;
    href: string;
  }>;
}

export function TrendingList({ articles }: TrendingListProps) {
  return (
    <div className="bg-muted/30 border border-border p-6 md:p-8">
      <h3 className="font-bold text-xs uppercase tracking-widest text-red-600 mb-6 border-b border-border pb-4">
        Trending Now
      </h3>
      <div className="flex flex-col gap-6">
        {articles.map((article, i) => (
          <Link key={i} href={article.href} className="group flex gap-4">
            <span className="font-heading font-black text-2xl text-border group-hover:text-foreground transition-colors">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 className="font-bold text-sm leading-tight group-hover:underline underline-offset-4 decoration-2">
              {article.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
