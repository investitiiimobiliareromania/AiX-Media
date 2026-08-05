import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoriesList } from "@/constants/categories";

const featuredBrief = {
  eyebrow: "Macro & Business Intelligence",
  headline: "Romania's Next Generation Business & Intelligence Platform",
  excerpt:
    "AiX Media covers Romania's most consequential macroeconomic pillars — real estate, capital markets, business, and investments — with the institutional rigor and editorial standard decision-makers require.",
  cta: { label: "Explore Real Estate Intelligence", href: "/real-estate" },
};

export function FeaturedStoryHero() {
  return (
    <section className="py-8" aria-labelledby="featured-story-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
              {featuredBrief.eyebrow}
            </span>
            <h2 id="featured-story-title" className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {featuredBrief.headline}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {featuredBrief.excerpt}
            </p>
            <Link
              href={featuredBrief.cta.href}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:underline pt-2"
            >
              <span>{featuredBrief.cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
            <h3 className="text-xs font-mono uppercase text-neutral-400 font-bold tracking-wider">
              Core Verticals
            </h3>
            <div className="space-y-2">
              {categoriesList.slice(0, 5).map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="flex items-center justify-between p-2 rounded hover:bg-neutral-800/60 text-xs font-mono text-neutral-200 hover:text-amber-400 transition-colors"
                >
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
