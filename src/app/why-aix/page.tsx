import { type Metadata } from "next";
import { PremiumHero } from "@/components/media/PremiumHero";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Database,
  Calendar,
  Layers,
  Search,
  Scale,
  ArrowRight,
  TrendingUp,
  Building2,
  Lock,
  Plane,
  Coins,
  FileCheck,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "De Ce AiX Media • Metodologie Editorială & Integritatea Datelor | AiX Media",
  },
  description:
    "Află metodologia editorială AiX Media: surse primare verificate, distincția strictă între date oficiale și analiză, și suportul decizional inteligent.",
  alternates: {
    canonical: `${siteConfig.url}/why-aix`,
    languages: {
      "ro-RO": `${siteConfig.url}/why-aix`,
      "x-default": `${siteConfig.url}/why-aix`,
    },
  },
  openGraph: {
    title: "De Ce AiX Media • Metodologie Editorială & Integritatea Datelor | AiX Media",
    description:
      "Află metodologia editorială AiX Media: surse primare verificate, distincția strictă între date oficiale și analiză, și suportul decizional inteligent.",
    url: `${siteConfig.url}/why-aix`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Ce AiX Media • Metodologie Editorială & Integritatea Datelor | AiX Media",
    description:
      "Află metodologia editorială AiX Media: surse primare verificate, distincția strictă între date oficiale și analiză, și suportul decizional inteligent.",
  },
};

export default function WhyAixPage() {
  const verticalBenefits = [
    {
      title: "Real Estate & Cadastru",
      benefit: "Înțelegi volumele de tranzacții din cărțile funciare ANCPI și randamentele nete înainte de orice achiziție sau investiție.",
      icon: Building2,
      href: "/real-estate",
    },
    {
      title: "Credite & Dobânzi",
      benefit: "Înțelegi cum evoluează IRCC, marjele bancare și structura dobânzilor fixe vs variabile pentru a minimiza costul total de finanțare.",
      icon: Coins,
      href: "/credits",
    },
    {
      title: "Asigurări & Risc",
      benefit: "Înțelegi ce acoperă fiecare poliță (RCA, CASCO, PAD, Sănătate, Cyber) și elimini capcana subasigurării înainte de a semna.",
      icon: ShieldCheck,
      href: "/insurance",
    },
    {
      title: "Piețe & BVB",
      benefit: "Accesezi cifrele auditate din spatele indicelui BET și randamentele reale ale dividendelor plătite de marile companii românești.",
      icon: TrendingUp,
      href: "/markets",
    },
    {
      title: "Dubai Real Estate",
      benefit: "Verifici cadrul legal al conturilor Escrow DLD și compari randamentele nete cu cele din marile capitale europene fără promisiuni nerealiste.",
      icon: FileCheck,
      href: "/dubai",
    },
    {
      title: "Executive Aviation",
      benefit: "Evaluezi costul total și eficiența de timp a zborurilor charter private față de cursele de linie pe baze strict factuale.",
      icon: Plane,
      href: "https://fly.cristianvaduva.com",
    },
  ];

  const methodologyPrinciples = [
    {
      num: "01",
      title: "Surse Primare Mai Întâi",
      description:
        "Colectăm datele direct de la autoritățile de reglementare și emitenții oficiali: BNR, ASF, INS, ANCPI, BVB, PAID, Eurostat, ECB și DLD. Nu preluăm zvonuri sau speculații media secundare.",
      icon: Database,
    },
    {
      num: "02",
      title: "Distincția Strictă între Dată și Analiză",
      description:
        "Fiecare număr prezentat este o dată istorică sau statistică oficială verificabilă. Analizele noastre explică mecanismul economic, fără a altera cifrele de bază și fără a promite randamente garantate.",
      icon: Scale,
    },
    {
      num: "03",
      title: "Perioada de Raportare vs. Data Publicării",
      description:
        "Statistica reflectă întotdeauna o perioadă de raportare exactă (ex: T1, S1 sau luna precedentă). Nu confundăm niciodată data la care un raport a fost publicat cu perioada pe care o măsoară.",
      icon: Calendar,
    },
    {
      num: "04",
      title: "Fără Numere Inventate, Fără Urgență Artificială",
      description:
        "Nu rotunjim din burtă, nu folosim 'experți anonimi' și nu creăm panică sau FOMO. Informația este prezentată sobru, rece și structurat pentru decidenți.",
      icon: Lock,
    },
    {
      num: "05",
      title: "Datele Istorice Rămân Vizibile",
      description:
        "Nu ștergem și nu cosmetizăm datele vechi. Seriile de timp și registrele de tranzacții rămân accesibile pentru a putea analiza corelațiile și ciclurile economice reale.",
      icon: Layers,
    },
    {
      num: "06",
      title: "Arhitectura în 5 Pași: De la Titlu la Decizie",
      description:
        "Nu ne oprim la titlu. Orice informație majoră parcurge lanțul: Ce S-a Întâmplat → Datele Reale → De Ce Contează → Impact de Business → Ce Urmează.",
      icon: Search,
    },
  ];

  return (
    <div className="space-y-16 pb-24 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Hero Header */}
      <PremiumHero
        eyebrow="Metodologie &amp; Standard Editorial"
        headline="De Ce AiX Media: Informație Verificată, Date Primare &amp; Suport Decizional"
        description="AiX Media nu este un agregator de titluri de senzație. Conectăm datele oficiale, contextul macroeconomic, piețele de capital, sectorul imobiliar și asigurările într-un strat clar de inteligență decizională."
        ctaLabel="Explorează Hub-ul de Date"
        ctaHref="/data"
      />

      {/* 2. Arhitectura de Analiză (Headline -> Data -> Context -> Impact -> Watch) */}
      <section className="p-8 md:p-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-8 shadow-2xl relative overflow-hidden">
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            Arhitectura Noastră Editorială
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white tracking-tight">
            De Ce Nu Ne Oprim Niciodată Doar La Titlu
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
            O decizie financiară sau de business corectă nu poate fi luată pe baza unei fraze scoase din context.
            Fiecare material AiX Media este structurat pe 5 niveluri succesive de claritate:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
          {[
            { step: "01", name: "Ce S-a Întâmplat", desc: "Faptul concret raportat oficial" },
            { step: "02", name: "Datele & Cifrele", desc: "Statistici, procente, surse primare" },
            { step: "03", name: "De Ce Contează", desc: "Mecanismul economic subiacent" },
            { step: "04", name: "Impact Comercial", desc: "Efectul asupra companiilor și pieței" },
            { step: "05", name: "Ce Urmează", desc: "Indicatori și termene de urmărit" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-amber-500/40 transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 block mb-1">
                  Nivel {item.step}
                </span>
                <h3 className="font-serif text-base font-bold text-white">{item.name}</h3>
              </div>
              <p className="text-xs text-neutral-400 font-serif leading-relaxed mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Principiile Metodologiei & Integrității */}
      <section className="space-y-8">
        <div className="border-b border-[var(--border)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Garanția Rigorii
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Principiile Noastre Editoriale &amp; Standardul de Verificare
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Zero-Mock • Zero Fake Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodologyPrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400">{item.num}</span>
                    <Icon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-serif">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Beneficiul Tău pe Fiecare Verticală */}
      <section className="space-y-8">
        <div className="border-b border-[var(--border)] pb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            Valoare Practică Pentru Cititor
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Beneficiul Tău pe Fiecare Verticală de Informație
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticalBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5 text-amber-500" />
                    <span className="text-[11px] font-mono text-neutral-400">Verticală</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-serif">{item.benefit}</p>
                </div>

                <div className="pt-3 border-t border-[var(--border)]">
                  <Link
                    href={item.href}
                    className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span>Accesează Secțiunea</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
