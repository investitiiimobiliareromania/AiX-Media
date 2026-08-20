import Link from "next/link";
import { categoriesList } from "@/constants/categories";

export function LatestNewsGrid() {
  return (
    <section className="py-8" aria-labelledby="latest-news-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
              Verticals
            </span>
            <h2 id="latest-news-title" className="text-2xl font-bold text-white mt-0.5">
              News Directory
            </h2>
          </div>
          <Link href="/news" className="text-xs font-mono text-amber-400 hover:underline">
            View All News →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="p-5 rounded-xl bg-[var(--surface-elevated)]/60 border border-neutral-800 hover:border-amber-500/40 transition-colors block space-y-2"
            >
              <span className="text-amber-400 font-mono text-xs font-semibold uppercase">
                {cat.name}
              </span>
              <h3 className="text-base font-bold text-white">{cat.label}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
