import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  industryDossiers,
  getIndustryDossier,
} from '@/lib/industry-intelligence-data';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/common/json-ld';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CompanyIdentityImage } from '@/components/company-intelligence/CompanyIdentityImage';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import {
  Layers,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Coins,
  Compass,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface IndustryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industryDossiers.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryDossier(slug);

  if (!ind) {
    return {
      title: 'Sector Industrial Negăsit | AiX Media',
    };
  }

  const canonicalUrl = `${siteConfig.url}/business/industries/${slug}`;

  return {
    title: `${ind.name} — Analiză Sectorială & Industry Intelligence | AiX Media`,
    description: ind.executiveSummary,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ro-RO': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: `${ind.name} — Analiză Sectorială & Industry Intelligence | AiX Media`,
      description: ind.executiveSummary,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ind.name} — Analiză Sectorială & Industry Intelligence | AiX Media`,
      description: ind.executiveSummary,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: IndustryDetailPageProps) {
  const { slug } = await params;
  const ind = getIndustryDossier(slug);

  if (!ind) {
    notFound();
  }

  const canonicalUrl = `${siteConfig.url}/business/industries/${slug}`;

  // Structured Data Schema for Industry Research Report
  const industrySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${ind.name} — Raport de Cercetare Sectorială și Date Economice`,
    description: ind.executiveSummary,
    url: canonicalUrl,
    inLanguage: 'ro-RO',
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    author: {
      '@type': 'Organization',
      name: 'AiX Media Intelligence Research Desk',
    },
    about: {
      '@type': 'Thing',
      name: ind.name,
      description: ind.marketDefinition,
    },
  };

  return (
    <div className="space-y-10 py-6 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      <JsonLd data={industrySchema} />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Business Intelligence', href: '/business' },
          { label: 'Sectoare Industriale', href: '/business#industries' },
          { label: ind.name },
        ]}
      />

      {/* 1. HERO HEADER BANNER */}
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>RAPORT SECTORIAL INSTITUȚIONAL</span>
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
              PROVENIENȚĂ: {ind.marketSizeClassification.toUpperCase()}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {ind.name}
          </h1>

          <p className="text-base sm:text-lg text-amber-300/90 font-serif leading-relaxed max-w-4xl">
            {ind.heroTagline}
          </p>
        </div>

        {/* 4 Financial Key Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-800/80 relative z-10 font-mono">
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              Dimensiune Piață ({ind.marketSizeClassification})
            </div>
            <div className="text-lg sm:text-xl font-bold text-amber-400">
              {ind.marketSize}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              Dinamica Anuală ({ind.growthClassification})
            </div>
            <div className="text-lg sm:text-xl font-bold text-emerald-400">
              {ind.growthYoY}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              Intensitate Capital
            </div>
            <div className="text-lg sm:text-xl font-bold text-sky-400">
              {ind.capitalContext.capitalIntensity}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              Lideri Monitorizați
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {ind.leaders.length} Corporații Cheie
            </div>
          </div>
        </div>

        {/* Source & Provenance Bar */}
        <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Info className="w-4 h-4" />
            <span>Sursă &amp; Metodologie de Calcul:</span>
          </div>
          <p className="text-neutral-300 font-serif leading-relaxed">
            {ind.methodology}
          </p>
          <div className="text-[11px] text-neutral-500 pt-1">
            Sursă oficială: <strong className="text-neutral-400">{ind.sourceProvenance}</strong>
          </div>
        </div>
      </div>

      {/* 2. OVERVIEW & MARKET DEFINITION */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            <span>Secțiunea 1 • Context &amp; Definiție</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Prezentare Generală a Sectorului
          </h2>
        </div>

        <div className="space-y-4 font-serif text-neutral-200 leading-relaxed text-sm sm:text-base">
          <p className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 text-amber-100/90 font-medium">
            {ind.executiveSummary}
          </p>
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-neutral-400 uppercase">
              Perimetru &amp; Delimitare Sectorială
            </h3>
            <p className="text-neutral-300">{ind.marketDefinition}</p>
          </div>
        </div>
      </section>

      {/* 3. MARKET LEADERS DOSSIERS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Secțiunea 2 • Corporate Leaders</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">
              Jucătorii Dominanți din Industrie
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {ind.leaders.length} Corporații Verificate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ind.leaders.map((leader, idx) => {
            const hasDossier = leader.slug && leader.slug.length > 0;
            const cardContent = (
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-all space-y-3 h-full flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CompanyIdentityImage
                        name={leader.name}
                        symbol={leader.symbol}
                        industry={leader.sector}
                        slug={leader.slug}
                        size="md"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-white group-hover:text-amber-400 transition-colors text-base leading-snug">
                          {leader.name}
                        </h3>
                        <div className="text-xs font-mono text-neutral-400">
                          {leader.sector}
                        </div>
                      </div>
                    </div>

                    {leader.symbol && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold shrink-0">
                        {leader.symbol}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-serif text-neutral-300 leading-relaxed">
                    {leader.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase">
                      {leader.metricLabel}
                    </span>
                    <span className="text-white font-bold text-sm">
                      {leader.metricValue}
                    </span>
                  </div>

                  {hasDossier ? (
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-xs">
                      Dosar Companie <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-neutral-500 text-[10px] uppercase font-mono">
                      Date Registru
                    </span>
                  )}
                </div>
              </div>
            );

            if (hasDossier) {
              return (
                <Link
                  key={idx}
                  href={`/companies/${leader.slug}`}
                  className="block"
                >
                  {cardContent}
                </Link>
              );
            }

            return <div key={idx}>{cardContent}</div>;
          })}
        </div>
      </section>

      {/* 4. MARKET DRIVERS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>Secțiunea 3 • Catalizatori &amp; Factori Cheie</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Driverii de Creștere ai Pieței
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ind.keyDrivers.map((driver, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>
                <h3 className="font-serif font-bold text-white text-base">
                  {driver.title}
                </h3>
              </div>
              <p className="text-xs font-serif text-neutral-300 leading-relaxed pt-1">
                {driver.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MULTI-DIMENSIONAL RISK MATRIX */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Secțiunea 4 • Analiză Prudențială</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Matricea Riscurilor Sectoriale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ind.risks.map((risk, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px] font-bold uppercase">
                  {risk.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    risk.severity === 'Ridicată'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : risk.severity === 'Medie'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  Severitate: {risk.severity}
                </span>
              </div>

              <h3 className="font-serif font-bold text-white text-base">
                {risk.title}
              </h3>
              <p className="text-xs font-serif text-neutral-300 leading-relaxed">
                {risk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CAPITAL & MAJOR PROJECTS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Coins className="w-4 h-4" />
            <span>Secțiunea 5 • Alocare de Capital</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Contextul Investițional &amp; Proiecte Majore
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">
                Intensitate Capital
              </div>
              <div className="text-base font-bold text-white">
                {ind.capitalContext.capitalIntensity}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">
                Condiții de Finanțare
              </div>
              <p className="font-serif text-neutral-300 text-xs leading-relaxed">
                {ind.capitalContext.financingConditions}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">
                Activitate Investițională
              </div>
              <p className="font-serif text-neutral-300 text-xs leading-relaxed">
                {ind.capitalContext.investmentActivity}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-mono text-xs font-bold text-neutral-400 uppercase">
              Proiecte Majore Verificate în Industrie
            </h3>
            {ind.capitalContext.majorProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-white text-base">
                    {proj.name}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs shrink-0">
                    {proj.value}
                  </span>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  Entitate Conducătoare: <strong className="text-white">{proj.leadEntity}</strong> • Status: <span className="text-emerald-400">{proj.status}</span>
                </div>
                <p className="text-xs font-serif text-neutral-300 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STRATEGIC OUTLOOK & WHAT TO MONITOR */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Secțiunea 6 • Perspectivă Strategică</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Direcția de Creștere &amp; Indicatori de Urmărit
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-amber-100 font-serif text-sm leading-relaxed">
          <strong>Direcție Strategică:</strong> {ind.strategicOutlook.growthDirection}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <h3 className="font-mono text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Catalizatori de Creștere</span>
            </h3>
            <ul className="space-y-1.5 text-xs font-serif text-neutral-300">
              {ind.strategicOutlook.catalysts.map((cat, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <h3 className="font-mono text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Constrângeri &amp; Blocaje</span>
            </h3>
            <ul className="space-y-1.5 text-xs font-serif text-neutral-300">
              {ind.strategicOutlook.constraints.map((con, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <h3 className="font-mono text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Ce Trebuie Monitorizat</span>
            </h3>
            <ul className="space-y-1.5 text-xs font-serif text-neutral-300">
              {ind.strategicOutlook.monitoringItems.map((mon, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>{mon}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. RELATED INTELLIGENCE & VERTICAL LINKS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="font-serif text-xl font-bold text-white">
            Ecosistem de Intelligence Conex
          </h3>
          <p className="text-xs font-mono text-neutral-400 mt-0.5">
            Navighează spre alte analize, companii și date de piață relevante
          </p>
        </div>

        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link
            href="/companies"
            className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-neutral-200 flex items-center gap-2 transition-colors"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Toate Companiile BVB</span>
          </Link>

          <Link
            href="/business"
            className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-neutral-200 flex items-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Business Intelligence Desk</span>
          </Link>

          <Link
            href="/markets"
            className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-neutral-200 flex items-center gap-2 transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Piețe &amp; Cotații BVB</span>
          </Link>

          {ind.relatedIntelligence.hasRealEstateLink && (
            <Link
              href="/real-estate"
              className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-neutral-200 flex items-center gap-2 transition-colors"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Piața Imobiliară ANCPI</span>
            </Link>
          )}

          <Link
            href="/news"
            className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-neutral-200 flex items-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Știri Economice</span>
          </Link>
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
