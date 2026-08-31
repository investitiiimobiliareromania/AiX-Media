import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import { Shield, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Insurance Intelligence & Risk Protection | AiX Media",
  description:
    "Ghiduri și analize de inteligență în asigurări: protecția patrimoniului imobiliar, polițe PAD vs. facultative, CASCO corporate și managementul riscului.",
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

  const keyProtectionPillars = [
    {
      title: "Asigurarea Locuinței (PAD vs. Facultativă)",
      description: "Diferențele dintre acoperirea legală de bază (PAD - 20.000 EUR) și polițele facultative comprehensive pentru riscuri de incendiu, explozie și avarii de apă.",
      tag: "INSURANCE GUIDE",
    },
    {
      title: "Corporate Risk Management & Business Interruption",
      description: "Mitigarea riscurilor financiare pentru spații comerciale, depozite logistice și flote auto prin clauze de oprire accidentală a activității.",
      tag: "RISK INTELLIGENCE",
    },
    {
      title: "Protecția Patrimoniului Imobiliar",
      description: "Cadre practice pentru evaluarea corectă a bunurilor la valoarea de înlocuire și asigurarea răspunderii civile față de terți.",
      tag: "INSURANCE INSIGHT",
    },
  ];

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
              <Shield className="w-4 h-4 text-amber-500" />
              Insurance Intelligence &amp; Risk Protection
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Protecția Patrimoniului și Ghiduri de Management al Riscului
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
              Analize structurate și ghiduri informative despre asigurările de proprietăți, riscuri catastrofice, polițe corporate și mitigarea daunelor patrimoniale.
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

      {/* Evergreen Protection Insights & Guides */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border)] pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            Cadre de Protecție &amp; Ghiduri Practic
          </span>
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
            Ghiduri &amp; Recomandări de Inteligență în Asigurări
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyProtectionPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {pillar.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--border)] text-xs font-mono text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Ghid Structurat Evergreen</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Insurance Articles & Insights */}
      {insuranceArticles.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Analize &amp; Riscuri
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Analize de Risc &amp; Asigurări Imobiliare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* Dedicated CTA Section */}
      <section className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Insurance Analysis &amp; Advisory
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Dorești o evaluare detaliată a riscurilor pentru patrimoniul tău?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-serif">
            Accesează suport dedicat prin platforma de consultanță în asigurări și protecția activelor.
          </p>
        </div>
        <a
          href="https://insurance.cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Protejează-ți Patrimoniul</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Insurance Intelligence Brief"
        headline="Sinteza Periodică de Management al Riscului"
        description="Primiți direct pe email recomandările și ghidurile privind asigurările de proprietate și riscurile patrimoniale."
      />
    </div>
  );
}
