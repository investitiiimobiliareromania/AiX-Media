'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, TrendingUp, Building2, Activity, ShieldCheck, Compass } from 'lucide-react';
import { Article } from '@/lib/media/models/article';

interface ArticleIntelligencePanelProps {
  article: Article;
  relatedArticles?: Article[];
}

export function ArticleIntelligencePanel({ article }: ArticleIntelligencePanelProps) {
  // Extract bespoke intelligence or derive custom article-specific analysis
  const intel = article.intelligence || deriveIntelligence(article);

  return (
    <div className="space-y-8 pt-8 border-t border-neutral-800">
      {/* 1. ARTICLE INTELLIGENCE BOARD */}
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-neutral-800 pb-3">
          <Zap className="w-4 h-4" />
          <span>AiX Media — Executive News Intelligence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif text-sm">
          {/* WHY IT MATTERS */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Why It Matters</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              {intel.whyItMatters}
            </p>
          </div>

          {/* BUSINESS IMPACT */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Business &amp; Sector Impact</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              {intel.businessImpact}
            </p>
          </div>

          {/* MARKET IMPACT */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-sky-400 uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Market &amp; BVB Connection</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              {intel.marketConnection}
            </p>
          </div>

          {/* WHAT TO WATCH NEXT */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>What to Watch Next</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              {intel.whatToWatchNext}
            </p>
          </div>
        </div>
      </div>

      {/* 2. CONNECTED ENTITIES (COMPANIES, MARKETS, SECTORS) */}
      <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h3 className="font-sans text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
          Conexiuni Intelligence Ecosystem
        </h3>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <Link
            href="/real-estate"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span>Real Estate Terminal: Romania &amp; ANCPI</span>
          </Link>

          <Link
            href="/companies"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Corporate Terminal: BVB Real Estate Companies</span>
          </Link>

          <Link
            href="/markets"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Markets Terminal: Rates &amp; IRCC</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function deriveIntelligence(article: Article) {
  const t = (article.title + ' ' + article.excerpt).toLowerCase();

  if (t.includes('ancpi') || t.includes('tranzacți')) {
    return {
      whyItMatters:
        'Volumul de tranzacții înregistrat în cadastrul oficial ANCPI măsoară lichiditatea reală și activitatea de autentificare a contractelor de vânzare-cumpărare.',
      businessImpact:
        'Dezvoltatorii imobiliari și proprietarii își evaluează viteza de rotație a stocurilor în funcție de numărul tranzacțiilor din polii urbane principali (București, Cluj, Timișoara).',
      marketConnection:
        'Conexiune cu activitatea de creditare ipotecară a băncilor comerciale (Banca Transilvania, BRD) și portofoliile de active imobiliare ale companiilor de real estate.',
      whatToWatchNext:
        'Următoarele rapoarte lunare ANCPI privind tranzacțiile de terenuri intravilane și contractele ipotecare autentificate.',
    };
  }

  if (t.includes('autorizați') || t.includes('construire') || t.includes('ins')) {
    return {
      whyItMatters:
        'Dinamica autorizațiilor eliberate de administrațiile locale anticipează volumul noilor proiecte rezidențiale care vor intra pe piață în următorii 1-2 ani.',
      businessImpact:
        'Constructorii, arhitecții și furnizorii de materiale își adaptează capacitățile de execuție în funcție de suprafețele utile autorizate.',
      marketConnection:
        'Conexiune directă cu dezvoltatorii listați la BVB (One United Properties) și producătorii de materiale de construcții (TeraPlast).',
      whatToWatchNext:
        'Indicele costurilor în construcții publicat de INS și evoluția autorizațiilor eliberate în regiunea București-Ilfov.',
    };
  }

  if (t.includes('bnr') || t.includes('dobând') || t.includes('ircc') || t.includes('robor')) {
    return {
      whyItMatters:
        'Evoluția ratelor dobânzilor de referință stabilește costul creditelor ipotecare și influențează direct capacitatea de cumpărare a populației.',
      businessImpact:
        'Dezvoltatorii rezidențiali își reconfigurează structura proiectelor și ofertele financiare în funcție de nivelul IRCC/ROBOR.',
      marketConnection:
        'Direct legat de veniturile din dobânzi ale băncilor de pe BVB (TLVA, BRD) și randamentele titlurilor de stat Fidelis.',
      whatToWatchNext:
        'Următoarea decizie de politică monetară BNR și publicarea noilor niveluri IRCC trimestriale.',
    };
  }

  if (t.includes('europa') || t.includes('germania') || t.includes('spania') || t.includes('eurostat')) {
    return {
      whyItMatters:
        'Evoluțiile din piețele imobiliare vest-europene oferă repere privind dinamica preturilor și randamentelor de închiriere în regiune.',
      businessImpact:
        'Investitorii instituționali analizează diferențialul de randament între piața din România (6.5-8%) și piețele vestice (3.5-4.5%).',
      marketConnection:
        'Fără conexiune BVB directă. Evoluția vizează fondurile de real estate transfrontaliere și investitorii privați europeni.',
      whatToWatchNext:
        'Publicarea indicelui Eurostat House Price Index (HPI) și deciziile de dobândă ale Băncii Centrale Europene (BCE).',
    };
  }

  // Default Real Estate intelligence fallback
  return {
    whyItMatters:
      'Informația oferă context asupra evoluției pieței imobiliare și sprijină deciziile de alocare a capitalului pe segmentul rezidențial și comercial.',
    businessImpact:
      'Jucătorii din imobiliare, dezvoltatorii și investitorii privați își dimensionează strategiile în funcție de tendințele de ofertă și cerere.',
    marketConnection:
      'Fără conexiune BVB directă. Impactul este concentrat pe piața imobiliară privată și evaluările de active rezidențiale.',
    whatToWatchNext:
      'Publicarea datelor oficiale ANCPI, INS și BNR pentru trimestrul în curs.',
  };
}
