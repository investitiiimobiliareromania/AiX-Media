import Link from "next/link";

interface ArticleCardProps {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  author?: string;
  readTime?: string;
  isLarge?: boolean;
}

export function ArticleCard({ category, title, excerpt, date, href, author, readTime, isLarge = false }: ArticleCardProps) {
  return (
    <article className="flex flex-col group h-full">
      <div className="mb-4 text-xs font-bold uppercase tracking-widest text-red-600">
        {category}
      </div>
      <Link href={href} className="flex-1 block">
        <h3 className={`font-bold font-heading leading-tight mb-3 group-hover:underline underline-offset-4 decoration-2 ${isLarge ? 'text-3xl md:text-5xl tracking-tight' : 'text-xl'}`}>
          {title}
        </h3>
        <p className={`text-muted-foreground leading-relaxed mb-4 text-pretty ${isLarge ? 'text-lg md:text-xl' : 'text-sm'}`}>
          {excerpt}
        </p>
      </Link>
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-4 border-t border-border mt-auto flex items-center justify-between">
        <span>{date}{author ? ` • ${author}` : ''}</span>
        {readTime && <span>{readTime}</span>}
      </div>
    </article>
  );
}
