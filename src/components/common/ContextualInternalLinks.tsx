import React from "react";
import Link from "next/link";
import { Building2, TrendingUp, Home, ArrowRight, Layers, FileText } from "lucide-react";
import { bvbCompanies } from "@/lib/bvb-data";

interface ContextualInternalLinksProps {
  currentText: string;
  category?: string;
  currentSlug?: string;
}

export function ContextualInternalLinks({
  currentText,
  category,
  currentSlug,
}: ContextualInternalLinksProps) {
  const textLower = currentText.toLowerCase();

  // Match companies mentioned in the content
  const matchedCompanies = bvbCompanies.filter((comp) => {
    if (comp.slug === currentSlug) return false;
    const nameMatch = textLower.includes(comp.name.toLowerCase()) || textLower.includes(comp.slug.replace(/-/g, ' '));
    const symbolMatch = comp.symbol && comp.symbol.length >= 3 && (textLower.includes(`$${comp.symbol.toLowerCase()}`) || textLower.includes(`(${comp.symbol.toLowerCase()})`));
    return nameMatch || symbolMatch;
  });

  // Default relevant companies if none directly matched
  const displayCompanies =
    matchedCompanies.length > 0
      ? matchedCompanies.slice(0, 3)
      : bvbCompanies.filter((c) => c.slug !== currentSlug).slice(0, 2);

  // Identify relevant vertical links
  const verticalLinks = [];

  if (category === "real-estate" || textLower.includes("imobil") || textLower.includes("apartament") || textLower.includes("ancpi")) {
    verticalLinks.push({
      title: "Terminalul Imobiliar & ANCPI",
      description: "Statistici oficiale cadastrale, autorizații de construire INS și indici rezidențiali.",
      href: "/real-estate",
      icon: Home,
    });
  }

  if (category === "markets" || textLower.includes("bvb") || textLower.includes("bet") || textLower.includes("bnr") || textLower.includes("bursa")) {
    verticalLinks.push({
      title: "Markets Intelligence Terminal",
      description: "Cotații de referință BNR, dobânzi ROBOR/IRCC și evoluția indicilor BVB.",
      href: "/markets",
      icon: TrendingUp,
    });
  }

  if (category === "business" || textLower.includes("fuziuni") || textLower.includes("achizitii") || textLower.includes("venituri")) {
    verticalLinks.push({
      title: "Business Intelligence & Companii",
      description: "Clasamentul marilor corporații românești și dinamica tranzacțiilor M&A.",
      href: "/business",
      icon: Layers,
    });
  }

  if (category === "credits" || textLower.includes("credit") || textLower.includes("ipoteca") || textLower.includes("ircc") || textLower.includes("robor")) {
    verticalLinks.push({
      title: "Ghiduri & Analize Credite",
      description: "Indicatori bancari, credite ipotecare și evoluția IRCC/ROBOR.",
      href: "/credits",
      icon: TrendingUp,
    });
  }

  if (category === "insurance" || textLower.includes("asigur") || textLower.includes("rca") || textLower.includes("asf")) {
    verticalLinks.push({
      title: "Piața Asigurărilor & Reglementări",
      description: "Analize RCA, asigurări de bunuri și rapoarte ASF.",
      href: "/insurance",
      icon: Layers,
    });
  }

  if (category === "investments" || textLower.includes("investi") || textLower.includes("titluri de stat") || textLower.includes("fidelis")) {
    verticalLinks.push({
      title: "Investiții & Instrumente Financiare",
      description: "Titluri de stat, fonduri mutuale și strategii de alocare a capitalului.",
      href: "/investments",
      icon: TrendingUp,
    });
  }

  // Always offer at least 2 structural nodes
  if (verticalLinks.length === 0) {
    verticalLinks.push({
      title: "Companii Listate la BVB",
      description: "Dosare corporative, cifre de afaceri auditate și indicatori financiari.",
      href: "/companies",
      icon: Building2,
    });
    verticalLinks.push({
      title: "Sinteze & Știri Economice",
      description: "Flux de informații verificate din surse oficiale publice.",
      href: "/news",
      icon: FileText,
    });
  }

  return (
    <aside
      aria-label="Conexiuni Contextuale & Intelligence"
      className="my-8 p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-5 shadow-lg text-neutral-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            Internal Linking &amp; Intelligence
          </span>
          <h4 className="font-serif text-base font-bold text-white mt-0.5">
            Conexiuni Relevante &amp; Dosare Asociate
          </h4>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Rețeaua AiX Media
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Dossiers Links */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Dosare Corporative Asociate</span>
          </div>

          <div className="space-y-2">
            {displayCompanies.map((comp) => (
              <Link
                key={comp.slug}
                href={`/companies/${comp.slug}`}
                className="group flex items-center justify-between p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-amber-500/50 hover:bg-[var(--surface-editorial)] transition-all"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {comp.name}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 truncate">
                    {comp.symbol ? `BVB: ${comp.symbol}` : comp.sector} • Profil Financiar
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Intelligence Verticals Links */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Verticale de Cercetare Conexe</span>
          </div>

          <div className="space-y-2">
            {verticalLinks.map((v) => {
              const Icon = v.icon;
              return (
                <Link
                  key={v.href}
                  href={v.href}
                  className="group flex items-center justify-between p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-amber-500/50 hover:bg-[var(--surface-editorial)] transition-all"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5 truncate">
                      <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{v.title}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 font-serif mt-0.5">
                      {v.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
