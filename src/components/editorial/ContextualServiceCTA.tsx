import React from "react";
import { ArrowRight, ExternalLink, Building2, Landmark, Shield } from "lucide-react";

interface ContextualServiceCTAProps {
  category?: string;
  title?: string;
  excerpt?: string;
  content?: string;
}

export function ContextualServiceCTA({
  category = "",
  title = "",
  excerpt = "",
  content = "",
}: ContextualServiceCTAProps) {
  const fullText = `${category} ${title} ${excerpt} ${content}`.toLowerCase();

  // Strict evaluation logic — ONE article gets at most ONE contextual CTA
  let selectedService: {
    title: string;
    subtext: string;
    buttonText: string;
    href: string;
    icon: React.ElementType;
    badge: string;
  } | null = null;

  // 1. Credit & Financing match
  if (
    category === "credits" ||
    category === "finance" ||
    fullText.includes("dobân") ||
    fullText.includes("ircc") ||
    fullText.includes("robor") ||
    fullText.includes("ipotecar") ||
    fullText.includes("refinanțare") ||
    fullText.includes("îndatorare") ||
    fullText.includes("creditare")
  ) {
    selectedService = {
      badge: "CREDIT ADVISORY",
      title: "Ai nevoie de structurarea unei finanțări imobiliare?",
      subtext: "Evaluează opțiunile de creditare ipotecară și refinanțare pentru proprietăți cu consultanți specializați.",
      buttonText: "Explore Credit Advisory",
      href: "https://credite.cristianvaduva.com",
      icon: Landmark,
    };
  }
  // 2. Insurance & Risk match
  else if (
    category === "insurance" ||
    fullText.includes("asigurare") ||
    fullText.includes("asigurări") ||
    fullText.includes("patrimoniu") ||
    fullText.includes("casco") ||
    fullText.includes("rca") ||
    fullText.includes("risc") ||
    fullText.includes("daune") ||
    fullText.includes("protecție")
  ) {
    selectedService = {
      badge: "INSURANCE ADVISORY",
      title: "Protejează-ți patrimoniul și activele imobiliare",
      subtext: "Solicită o analiză dedicată de risc pentru proprietăți rezidențiale, comerciale sau flote corporate.",
      buttonText: "Request Insurance Analysis",
      href: "https://insurance.cristianvaduva.com",
      icon: Shield,
    };
  }
  // 3. Real Estate match
  else if (
    category === "real-estate" ||
    fullText.includes("tranzacț") ||
    fullText.includes("imobilia") ||
    fullText.includes("ancpi") ||
    fullText.includes("locuinț") ||
    fullText.includes("apartament") ||
    fullText.includes("vilă") ||
    fullText.includes("penthouse") ||
    fullText.includes("dezvoltator")
  ) {
    selectedService = {
      badge: "HOMEFIND REAL ESTATE",
      title: "Market intelligence is useful. Finding the right property is better.",
      subtext: "Descoperă proprietăți selectate și oportunități imobiliare prin platforma HomeFind.",
      buttonText: "Explore HomeFind",
      href: "https://homefind.cristianvaduva.com",
      icon: Building2,
    };
  }

  // If no specific service matches, do not render a generic ad banner
  if (!selectedService) {
    return null;
  }

  const IconComponent = selectedService.icon;

  return (
    <aside
      aria-label="Contextual Ecosystem Service Advisory"
      className="my-8 p-6 md:p-7 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 text-white shadow-xl relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <IconComponent className="w-4 h-4 text-amber-500" />
            <span>{selectedService.badge}</span>
          </div>

          <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
            {selectedService.title}
          </h4>

          <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed max-w-2xl">
            {selectedService.subtext}
          </p>
        </div>

        <a
          href={selectedService.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[44px]"
        >
          <span>{selectedService.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
    </aside>
  );
}
