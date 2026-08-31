import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import { Shield, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Insurance & Risk Information | AiX Media",
  description:
    "Informații relevante despre asigurări, protecția proprietăților și riscuri.",
  alternates: {
    canonical: `${siteConfig.url}/insurance`,
  },
};

export default async function InsurancePage() {
  const allArticles = await articleService.getPublishedArticles();
  const insuranceArticles = allArticles.filter(
    (art) =>
      art.category === "insurance" ||
      art.title.toLowerCase().includes("asigurare") ||
      art.title.toLowerCase().includes("patrimoniu") ||
      art.title.toLowerCase().includes("risc")
  );

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Minimalist Editorial Header Banner */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
              <Shield className="w-4 h-4 text-amber-500" />
              Insurance &amp; Risk Information
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Insurance &amp; Protecția Patrimoniului
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
              Informații relevante despre asigurări, protecția proprietăților și riscuri.
            </p>
          </div>

          <a
            href="https://insurance.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]"
          >
            <span>Request Insurance Analysis</span>
            <ArrowRight className="w-4 h-4" />
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* Main Insurance Articles or Premium Empty State */}
      {insuranceArticles.length > 0 ? (
        <section className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Știri &amp; Informații
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Informații Asigurări &amp; Protecția Imobiliară
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      ) : (
        <section className="p-8 md:p-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
              INSURANCE &amp; RISK PROTECTION
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Need protection for your property or assets?
            </h2>
            <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
              Platforma AiX Media direcționează utilizatorii către soluțiile dedicate de analiză și consultanță în asigurări.
            </p>
            <div className="pt-2">
              <a
                href="https://insurance.cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <span>Request Insurance Analysis</span>
                <ArrowRight className="w-4 h-4" />
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Platform Service CTA Section */}
      <section className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            External Platform Advisory
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Ai nevoie de o evaluare specializată a riscurilor pentru proprietatea ta?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-serif">
            Accesează platforma dedicată de consultanță în asigurări și protecția patrimoniului.
          </p>
        </div>
        <a
          href="https://insurance.cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Request Insurance Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Insurance Brief"
        headline="Notificări &amp; Informații Asigurări"
        description="Abonați-vă pentru a primi informații actualizate privind domeniul asigurărilor și protecției proprietăților."
      />
    </div>
  );
}
