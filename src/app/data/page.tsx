import { type Metadata } from "next";
import { getAllIndicators } from "@/lib/data-intelligence/data-hub-service";
import { DataHubOverview } from "@/components/data/DataHubOverview";
import { PremiumHero } from "@/components/media/PremiumHero";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import { Database } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    absolute: "AiX Data • Hub-ul de Indicatori Economici, Monetari & Piețe | AiX Media",
  },
  description:
    "Bază de date verificată cu indicatori macroeconomici România (INS, BNR, Min. Finanțelor), indici monetari (IRCC, ROBOR, curs valutar), tranzacții imobiliare ANCPI și cotații bursiere BVB.",
  alternates: {
    canonical: `${siteConfig.url}/data`,
    languages: {
      "ro-RO": `${siteConfig.url}/data`,
      "x-default": `${siteConfig.url}/data`,
    },
  },
  openGraph: {
    title: "AiX Data • Hub-ul de Indicatori Economici, Monetari & Piețe | AiX Media",
    description:
      "Bază de date verificată cu indicatori macroeconomici România (INS, BNR, Min. Finanțelor), indici monetari (IRCC, ROBOR, curs valutar), tranzacții imobiliare ANCPI și cotații bursiere BVB.",
    url: `${siteConfig.url}/data`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiX Data • Hub-ul de Indicatori Economici, Monetari & Piețe | AiX Media",
    description:
      "Bază de date verificată cu indicatori macroeconomici România (INS, BNR, Min. Finanțelor), indici monetari (IRCC, ROBOR, curs valutar), tranzacții imobiliare ANCPI și cotații bursiere BVB.",
  },
};

export default function DataHubPage() {
  const indicators = getAllIndicators();

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "AiX Media Economic, Monetary and Real Estate Indicator Registry",
    description:
      "Authoritative aggregation of verified Romanian macroeconomic statistics, BNR monetary benchmarks, ANCPI cadastral real estate transactions, and BVB market indicators.",
    url: `${siteConfig.url}/data`,
    creator: {
      "@type": "Organization",
      name: "AiX Media Editorial & Intelligence Desk",
      url: siteConfig.url,
    },
    temporalCoverage: "2025/2026",
    spatialCoverage: "Romania, European Union, Global",
    isAccessibleForFree: true,
  };

  return (
    <div className="space-y-10 pb-16 pt-4 text-neutral-100">
      <Script
        id="aix-data-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      {/* Hero Header */}
      <PremiumHero
        eyebrow="AIX DATA INTELLIGENCE"
        headline="Baza de Date a Indicatorilor Verificați"
        description="Indicatori macroeconomici, monetari, imobiliari și financiari din surse oficiale primare (INS, BNR, ANCPI, BVB, Ministerul Finanțelor). Fiecare număr are sursă, perioadă și dată de verificare."
        ctaLabel="Explorează Indicatorii"
        ctaHref="#indicators"
      />

      {/* Core Indicator Matrix */}
      <section id="indicators" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-3 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              Indicatori Verificați
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              Registrul Complet de Date
            </h2>
          </div>
          <div className="text-xs font-mono text-neutral-400">
            Total indicatori activi: <strong className="text-amber-400">{indicators.length}</strong>
          </div>
        </div>

        <DataHubOverview initialIndicators={indicators} />
      </section>

      {/* Contextual Intelligence Cross-Links */}
      <section className="p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 shadow-xl">
        <div className="border-b border-[var(--border)] pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            NAVIGARE CONTEXTUALĂ
          </span>
          <h3 className="font-serif text-xl font-bold text-white mt-1">
            Explorează Verticele Editoriale Conexe
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <Link
            href="/real-estate"
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 transition-all block space-y-1"
          >
            <span className="text-amber-400 font-bold block">Piața Imobiliară →</span>
            <p className="text-neutral-400 text-[11px] font-serif">
              Tranzacții ANCPI, prețuri și autorizații de construire.
            </p>
          </Link>

          <Link
            href="/credits"
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 transition-all block space-y-1"
          >
            <span className="text-amber-400 font-bold block">Credite &amp; Dobânzi →</span>
            <p className="text-neutral-400 text-[11px] font-serif">
              Calculator ipotecar, evoluție IRCC și marje bancare.
            </p>
          </Link>

          <Link
            href="/markets"
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 transition-all block space-y-1"
          >
            <span className="text-amber-400 font-bold block">Piețe Financiare →</span>
            <p className="text-neutral-400 text-[11px] font-serif">
              Indicii BVB, titluri de stat Fidelis și burse internaționale.
            </p>
          </Link>

          <Link
            href="/companies"
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 transition-all block space-y-1"
          >
            <span className="text-amber-400 font-bold block">Companii BVB →</span>
            <p className="text-neutral-400 text-[11px] font-serif">
              Dosiere financiare, profitabilitate și dividende.
            </p>
          </Link>
        </div>
      </section>

      {/* Statutory Disclaimer & Newsletter */}
      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Data Alerts"
        headline="Fii la Curent cu Noile Date Economice"
        description="Primește alerte la publicarea noilor rapoarte INS, comunicatelor BNR și statisticilor cadastrale ANCPI."
      />
    </div>
  );
}
