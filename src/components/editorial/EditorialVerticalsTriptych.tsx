import React from "react";
import { Building2, Shield, Landmark, ArrowRight, ExternalLink } from "lucide-react";

export function EditorialVerticalsTriptych() {
  const verticals = [
    {
      id: "real-estate",
      number: "01",
      pillar: "REAL ESTATE",
      question: "Ce cumperi?",
      action: "Market & News",
      title: "Real Estate",
      description: "Informații din piața imobiliară, date ANCPI, construcții rezidențiale și evoluții din România și Europa.",
      ctaText: "Acces la platforma dedicată căutării de proprietăți.",
      buttonText: "Explore HomeFind",
      href: "https://homefind.cristianvaduva.com",
      icon: Building2,
      accentBg: "from-amber-500/10 via-amber-500/5 to-transparent",
      accentBorder: "group-hover:border-amber-500/50",
      accentBadge: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      accentButton: "bg-amber-500 text-neutral-950 hover:bg-amber-400 font-bold",
    },
    {
      id: "credits",
      number: "02",
      pillar: "CREDIT & FINANCING",
      question: "Cum finanțezi?",
      action: "Financing Info",
      title: "Credit & Financing",
      description: "Informații relevante despre creditare ipotecară, evoluția ratelor dobânzilor BNR, IRCC și refinanțare.",
      ctaText: "Consultă opțiunile de finanțare cu specialiști dedicați.",
      buttonText: "Explore Credit Advisory",
      href: "https://credite.cristianvaduva.com",
      icon: Landmark,
      accentBg: "from-amber-500/10 via-amber-500/5 to-transparent",
      accentBorder: "group-hover:border-amber-500/50",
      accentBadge: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      accentButton: "bg-amber-500 text-neutral-950 hover:bg-amber-400 font-bold",
    },
    {
      id: "insurance",
      number: "03",
      pillar: "INSURANCE",
      question: "Cum protejezi?",
      action: "Risk & Protection",
      title: "Insurance",
      description: "Informații despre asigurările de locuință, protecția proprietăților și gestionarea riscurilor patrimoniale.",
      ctaText: "Solicită o evaluare dedicată a riscurilor pentru proprietăți.",
      buttonText: "Request Insurance Analysis",
      href: "https://insurance.cristianvaduva.com",
      icon: Shield,
      accentBg: "from-amber-500/10 via-amber-500/5 to-transparent",
      accentBorder: "group-hover:border-amber-500/50",
      accentBadge: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      accentButton: "bg-amber-500 text-neutral-950 hover:bg-amber-400 font-bold",
    },
  ];

  return (
    <section aria-labelledby="editorial-triptych-heading" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--border)] pb-4 gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            AiX Ecosystem Pillars
          </span>
          <h2
            id="editorial-triptych-heading"
            className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-1"
          >
            Informații Imobiliare, Finanțare &amp; Asigurări
          </h2>
        </div>
        <p className="text-xs font-mono text-neutral-400 max-w-md leading-relaxed font-serif">
          Informații din piață și trimitere către platformele dedicate de servicii.
        </p>
      </div>

      {/* 3-Column Editorial Triptych Module */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {verticals.map((vert) => {
          const IconComponent = vert.icon;
          return (
            <div
              key={vert.id}
              className={`group relative rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] ${vert.accentBorder} p-6 md:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden`}
            >
              {/* Background Subtle Luxury Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${vert.accentBg} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10 space-y-4">
                {/* Header Row: Pillar badge & Question Pill */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      {vert.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                      {vert.pillar}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-300">
                    {vert.question}
                  </span>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                      {vert.action}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5 group-hover:text-amber-400 transition-colors">
                      {vert.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">
                  {vert.description}
                </p>
              </div>

              {/* Bottom CTA Block */}
              <div className="relative z-10 pt-6 mt-4 border-t border-[var(--border)] space-y-3">
                <p className="text-[11px] font-serif text-neutral-400 italic">
                  {vert.ctaText}
                </p>

                <a
                  href={vert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full ${vert.accentButton} py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center gap-2 shadow-md cursor-pointer`}
                >
                  <span>{vert.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
