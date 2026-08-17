import React from "react";
import Link from "next/link";
import { MarketSignal } from "@/config/category-configs";
import { ArrowRight, Compass } from "lucide-react";

interface PremiumHeroProps {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  marketSignals?: MarketSignal[];
}

export function PremiumHero({
  eyebrow,
  headline,
  description,
  ctaLabel = "Explorează Rapoartele",
  ctaHref = "/news",
  secondaryCtaLabel = "Indicatori de Piață",
  secondaryCtaHref = "/markets",
  marketSignals = [],
}: PremiumHeroProps) {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden rounded-3xl bg-neutral-50 border border-neutral-200 mb-8 shadow-xs">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          {eyebrow}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-950 leading-tight tracking-tight">
          {headline}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href={ctaHref}
            className="px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className="px-6 py-3 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-900 font-semibold text-sm transition-all shadow-xs"
          >
            {secondaryCtaLabel}
          </Link>
        </div>

        {marketSignals.length > 0 && (
          <div className="pt-6 border-t border-neutral-200 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 text-left font-mono">
            {marketSignals.map((signal, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <div className="text-[11px] text-neutral-500">{signal.label}</div>
                <div className="text-base font-bold text-neutral-950 mt-0.5">{signal.value}</div>
                {signal.change && (
                  <div
                    className={`text-[10px] font-semibold ${
                      signal.isPositive ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {signal.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
