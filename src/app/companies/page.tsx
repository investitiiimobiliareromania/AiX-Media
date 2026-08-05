import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllCompanies } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Building2, TrendingUp, DollarSign, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Company Intelligence Profiles | AiX Media",
  description:
    "Institutional company profiles, financial teardowns, leadership, and stock dynamics for top Romanian and CEE enterprise champions.",
  alternates: { canonical: "/companies" },
};

export default function CompaniesPage() {
  const companies = getAllCompanies();

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow="AiX Enterprise Intelligence"
        headline="Institutional Profiles of Romania's Corporate Champions"
        description="Comprehensive teardowns of market capitalization, revenue trajectories, executive leadership, and strategic milestones for top listed and private companies."
        ctaLabel="Explore All Profiles"
        ctaHref="#catalog"
      />

      <section id="catalog" className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            BVB Listed & Regional Enterprise Champions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((comp) => (
            <Link
              key={comp.id}
              href={`/companies/${comp.slug}`}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all hover:bg-neutral-900 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0">
                    <Image src={comp.logo} alt={comp.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{comp.name}</h3>
                    <span className="text-xs font-mono text-amber-400 font-semibold">{comp.symbol} • BVB Listed</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-base font-bold text-white">{comp.stockPrice}</div>
                  <div className={`text-xs ${comp.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {comp.priceChange}
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">{comp.description}</p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 font-mono text-[11px]">
                <div>
                  <span className="text-neutral-500 block">Market Cap</span>
                  <span className="text-white font-bold">{comp.marketCap}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Revenue</span>
                  <span className="text-white font-bold">{comp.revenue}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Div Yield</span>
                  <span className="text-amber-400 font-bold">{comp.dividendYield}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
