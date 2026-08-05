import Link from "next/link";
import { categoriesList } from "@/constants/categories";

export function CategoriesSection() {
  return (
    <section className="py-12" aria-labelledby="categories-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 border-b border-neutral-800 pb-4">
          <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
            Coverage
          </span>
          <h2 id="categories-title" className="text-2xl font-bold text-white mt-1">
            Editorial Verticals
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Ten intelligence verticals engineered for C-level executives, investors, and decision-makers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesList.map((category, index) => (
            <Link
              key={category.slug}
              href={category.href}
              className="group flex flex-col justify-between p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all hover:bg-neutral-900"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs text-amber-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {category.description}
                </p>
              </div>
              <span className="mt-6 text-xs font-mono text-neutral-400 group-hover:text-amber-400 transition-colors">
                Enter section →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
