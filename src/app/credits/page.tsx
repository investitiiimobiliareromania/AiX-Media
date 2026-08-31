import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import {
  Landmark,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  PieChart,
  RefreshCw,
  Calculator,
  Percent,
  TrendingUp,
  Scale,
  DollarSign,
  Building,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { getMarketData } from "@/lib/market-data";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";

export const metadata: Metadata = {
  title: "Credit & Financing Information | AiX Media",
  description:
    "Informații despre credite ipotecare, dobânzi, IRCC, grad de îndatorare, refinanțare și structura finanțării.",
  alternates: {
    canonical: `${siteConfig.url}/credits`,
  },
};

export default async function CreditsPage() {
  const allArticles = await articleService.getPublishedArticles();
  const creditArticles = allArticles.filter(
    (art) =>
      art.category === "credits" ||
      art.category === "finance" ||
      art.title.toLowerCase().includes("credit") ||
      art.title.toLowerCase().includes("ircc") ||
      art.title.toLowerCase().includes("dobân") ||
      art.title.toLowerCase().includes("refinanț")
  );

  const snapshot = await getMarketData();
  const getMetric = (symbol: string) => {
    const list = [
      ...snapshot.currencies,
      ...snapshot.interestRates,
      ...snapshot.equities,
      ...snapshot.commodities,
    ];
    return list.find((item) => item.symbol === symbol);
  };

  const robor = getMetric("ROBOR 3M");
  const ircc = getMetric("IRCC");
  const bnrRate = getMetric("BNR RATE");

  const creditMetrics = [
    {
      label: "Indicele IRCC",
      value: ircc && ircc.value !== null ? `${ircc.value}%` : "5.86%",
      change: "",
      subtext: "Referință oficială BNR credite consumatori",
      isPositive: true,
      source: "BNR",
    },
    {
      label: "ROBOR 3M",
      value: robor && robor.value !== null ? `${robor.value}%` : "5.58%",
      change: "",
      subtext: "Indice mediu piață interbancară",
      isPositive: true,
      source: "BNR",
    },
    {
      label: "Rata Dobânzii BNR",
      value: bnrRate && bnrRate.value !== null ? `${bnrRate.value}%` : "6.50%",
      change: "",
      subtext: "Dobânda de politică monetară",
      isPositive: true,
      source: "BNR",
    },
    {
      label: "Grad Max. Îndatorare",
      value: "40% - 45%",
      change: "",
      subtext: "Plafon reglementat BNR",
      isPositive: true,
      source: "BNR",
    },
  ];

  const refinancingChecklist = [
    { num: "01", text: "Soldul actual al creditului rămas de rambursat" },
    { num: "02", text: "Rata dobânzii actuale (fixă vs. variabilă)" },
    { num: "03", text: "Perioada rămasă din contractul inițial" },
    { num: "04", text: "Valoarea ratei lunare actuale" },
    { num: "05", text: "Costurile totale ale refinanțării (evaluare imobil, taxe notariale, comision)" },
    { num: "06", text: "Noua rată a dobânzii propusă" },
    { num: "07", text: "Noua perioadă de rambursare aleasă" },
    { num: "08", text: "Costul total rămas pe creditul vechi" },
    { num: "09", text: "Costul total estimat al noului credit după refinanțare" },
    { num: "10", text: "Punctul de rentabilitate (Break-even time al economiei nete)" },
  ];

  return (
    <div className="space-y-16 pb-24 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Header Banner */}
      <section className="p-8 md:p-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
              <Landmark className="w-4 h-4 text-amber-500" />
              Credit &amp; Financing Information
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Informații Despre Creditare &amp; Dobânzi
            </h1>
            <p className="text-base md:text-lg text-neutral-300 font-serif leading-relaxed">
              Informații despre credite ipotecare, dobânzi, IRCC, grad de îndatorare, refinanțare și structura finanțării.
            </p>
          </div>

          <a
            href="https://credite.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]"
          >
            <span>Explore Credit Advisory</span>
            <ArrowRight className="w-4 h-4" />
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* 2. Official BNR Monetary Metrics Dashboard */}
      <IntelligenceDashboard
        metrics={creditMetrics}
        title="Indicatori Monetari &amp; Dobânzi BNR"
        description="Cotații oficiale de referință privind indicii IRCC, ROBOR și rata dobânzii BNR."
      />

      {/* 3. TIPURI DE CREDITE (01 TO 05 VISUAL CARDS) */}
      <section className="space-y-8">
        <div className="border-b border-[var(--border)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Categorii &amp; Structuri
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Tipuri de Credite &amp; Instrumente Financiar-Bancare
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">5 Categorii Principale</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 01 — CREDIT IPOTECAR */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">01</span>
                <Landmark className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Credit Ipotecar
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Împrumut garantat cu o ipotecă imobiliară asupra locuinței achiziționate sau a altei proprietăți. Caracterizat prin perioade lungi (până la 30 ani) și cerințe clare privind avansul minim și veniturile eligibile.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Garantie ipotecara pe imobil</li>
                <li className="flex items-center gap-1.5">• Avans minim reglementat (15% - 25%)</li>
                <li className="flex items-center gap-1.5">• Evaluare tehnica a proprietatii</li>
              </ul>
            </div>
          </div>

          {/* 02 — CREDIT IMOBILIAR */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">02</span>
                <Building className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Credit Imobiliar
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Diferențiat conceptual de creditul ipotecar prin natura garantării sau destinația fondurilor (construcții, terenuri, extinderi). Rămâne un instrument de finanțare a activelor imobiliare pe termen lung.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Destinat terenurilor / construcției</li>
                <li className="flex items-center gap-1.5">• Eliberare tranșe în funcție de stadiul lucrărilor</li>
                <li className="flex items-center gap-1.5">• Condiții specifice de garanție</li>
              </ul>
            </div>
          </div>

          {/* 03 — ACHIZIȚIA UNEI LOCUINȚE (PROCES VIZUAL) */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">03</span>
                <Calculator className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Achiziția unei Locuințe (Flux Proces)
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Etapele parcurse de la verificarea veniturilor până la virarea fondurilor:
              </p>

              {/* Visual Steps Flow */}
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between text-neutral-300">
                  <span>1. Venit &amp; Îndatorare</span>
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                </div>
                <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between text-neutral-300">
                  <span>2. Pre-analiză &amp; Avans</span>
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                </div>
                <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between text-neutral-300">
                  <span>3. Evaluare Imobil &amp; Aprobare</span>
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                </div>
                <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between text-amber-400 font-bold">
                  <span>4. Contract Notarial &amp; Finanțare</span>
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* 04 — REFINANȚARE IPOTECARĂ */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">04</span>
                <RefreshCw className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Refinanțarea Ipotecară
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Înlocuirea unui credit existent cu un împrumut nou, în condiții de dobândă mai avantajoase, pentru scăderea ratei lunare sau scurtarea perioadei de rambursare.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Reducerea marjei sau trecerea la dobândă fixă</li>
                <li className="flex items-center gap-1.5">• Recalcularea costului total rămas</li>
                <li className="flex items-center gap-1.5">• Analiza cheltuielilor notariale de transfer</li>
              </ul>
            </div>
          </div>

          {/* 05 — CREDIT DE NEVOI PERSONALE */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">05</span>
                <DollarSign className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Credit de Nevoi Personale
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Împrumut negarantat cu o durată mai scurtă (maximum 5 ani legal). Are o dobândă nominală mai ridicată și influențează direct capacitatea de îndatorare pentru un eventual credit ipotecar.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Fără justificare a destinației fondurilor</li>
                <li className="flex items-center gap-1.5">• Perioadă maximă de rambursare: 5 ani</li>
                <li className="flex items-center gap-1.5">• Impact direct pe gradul lunar de îndatorare</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRUCTURA DOBÂNZILOR: FIXĂ VS. VARIABILĂ */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-8 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Percent className="w-4 h-4" />
            Mecanisme de Dobândă
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Dobândă Fixă vs. Dobândă Variabilă
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Alegerea structurii optime determină predictibilitatea ratelor lunare și bugetul de capital alocat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dobândă Fixă */}
          <div className="p-6 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white">Dobândă Fixă</h3>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[11px] font-mono font-bold">
                Predictibilitate
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-serif">
              Rata dobânzii rămâne neschimbată pe o perioadă stabilită contractual (de regulă 3 - 5 ani inițiali).
            </p>
            <div className="space-y-2 pt-2 text-xs font-serif text-neutral-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Rate lunare fixe, fără fluctuații pe perioada stabilită.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Protecție totală împotriva creșteilor indicilor pietei monetare (IRCC / ROBOR).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Permite refinanțarea sau renegocierea la expirarea perioadei fixe.</span>
              </div>
            </div>
          </div>

          {/* Dobândă Variabilă */}
          <div className="p-6 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white">Dobândă Variabilă</h3>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[11px] font-mono font-bold">
                Indice de Piață + Marjă
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-serif">
              Formată dintr-un indice de referință reglementat (IRCC sau ROBOR) plus marja fixă a băncii (ex: IRCC + 2.10%).
            </p>
            <div className="space-y-2 pt-2 text-xs font-serif text-neutral-300">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Rata se actualizează trimestrial sau semestrial în funcție de cotația indicelui.</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Beneficiază automat de scăderile dobânzilor de referință ale BNR.</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Implică risc de dobândă în perioadele de presiune inflaționistă.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IRCC VS. ROBOR: EXPLICAȚII METROLOGICE */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Scale className="w-4 h-4" />
            Indicatori Monetari BNR
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Ce este IRCC &amp; Cum se Compară cu ROBOR?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 font-serif text-xs text-neutral-300 leading-relaxed">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Indicele IRCC (Trimestrial)
            </h3>
            <p>
              Indicele de Referință pentru Creditele Consumatorilor (IRCC) se calculează ca medie ponderată a ratelor de dobândă ale tranzacțiilor pe piața monetară interbancară.
            </p>
            <p>
              Este aplicabil tuturor creditelor acordate populației cu dobândă variabilă contractate după mai 2019 (OG 19/2019). Are un decalaj legal de aplicare de un trimestru față de perioada de observare.
            </p>
          </div>

          <div className="space-y-3 font-serif text-xs text-neutral-300 leading-relaxed">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Indicele ROBOR 3M
            </h3>
            <p>
              ROBOR (Romanian Interbank Offered Rate) reprezintă rata medie a dobânzii la care băncile comerciale oferă credite altor bănci în lei pe piața interbancară.
            </p>
            <p>
              Rămâne aplicabil creditelor ipotecare contractate anterior lunii mai 2019 și anumitor împrumuturi corporative. Se actualizează în funcție de termenul din contract (3 luni sau 6 luni).
            </p>
          </div>
        </div>
      </section>

      {/* 6. GRAD DE ÎNDATORARE (CAPACITATEA DE ÎNDATORARE) */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <PieChart className="w-4 h-4" />
            Reglementare BNR
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Capacitatea de Îndatorare &amp; Plafonul BNR (40% - 45%)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Gradul maxim de îndatorare reprezintă raportul dintre totalul ratelor lunare de plată și venitul net lunar eligibil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4 font-serif text-xs text-neutral-300 leading-relaxed">
            <p>
              Regulamentul BNR limitează gradul de îndatorare la <strong>40% din venitul net lunar</strong> pentru creditele în monedă națională (RON) și la <strong>45% pentru cumpărătorii primei locuințe</strong> rezidențiale.
            </p>
            <p>
              În calculul obligațiilor lunare sunt incluse: ratele creditelor ipotecare existente, ratele creditelor de nevoi personale, limitele de card de credit utilizate/neutilizate (de regulă 3%-5% din limită) și overdraft-ul.
            </p>

            {/* DEMO BOX: EXEMPLU ILUSTRATIV */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-amber-400 font-bold uppercase">Exemplu Ilustrativ (Calcul Simulat)</span>
                <span className="text-neutral-400">NU este o ofertă bancară</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono pt-1">
                <div>
                  <span className="text-neutral-400 block">Venit Net Familial:</span>
                  <span className="text-white font-bold">10.000 RON</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Plafon Max BNR (40%):</span>
                  <span className="text-amber-400 font-bold">4.000 RON / lună</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Capacitate Nouă Rată:</span>
                  <span className="text-emerald-400 font-bold">Max 4.000 RON</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white">Factori Eligibili Venit:</h4>
            <ul className="space-y-2 text-xs font-serif text-neutral-300">
              <li className="flex items-center gap-2">• Venituri din salarii &amp; bonusuri verificate ANAF</li>
              <li className="flex items-center gap-2">• Dividende și dividende istorice companii</li>
              <li className="flex items-center gap-2">• Venituri din chirii cu contract înregistrat</li>
              <li className="flex items-center gap-2">• Activități independente &amp; PFA</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. AVANSUL & RAPORTUL LTV (LOAN-TO-VALUE) */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Building className="w-4 h-4" />
            Finanțare &amp; Capital Propiu
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Avansul Minim &amp; Raportul LTV (Loan-to-Value)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-serif text-xs text-neutral-300">
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold block">Avans Minim RON</span>
            <p className="leading-relaxed">
              De regulă 15% pentru prima locuință rezidențială cumpărată în RON. Poate varia în funcție de politica fiecărei bănci și de profilul solicitantului.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold block">Avans Valută (EUR)</span>
            <p className="leading-relaxed">
              Pentru creditele acordate în valută (EUR), avansul minim reglementat este mai ridicat (20% - 35%), pentru mitigarea riscului valutar.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold block">Raportul LTV</span>
            <p className="leading-relaxed">
              Loan-to-Value (LTV) reprezintă procentul pe care creditul îl deține din valoarea evaluată a imobilului. Un LTV mai mic scade costul marjei bancare.
            </p>
          </div>
        </div>
      </section>

      {/* 8. COSTUL REAL AL CREDITULUI (DOBÂNDĂ VS. DAE & COST TOTAL) */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <FileCheck className="w-4 h-4" />
            Costuri Complete
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Costul Real al Creditului: Dobândă vs. DAE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Dobânda Anuală Efectivă (DAE) sintetizează toate costurile asociate împrumutului pe întreaga perioadă.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-serif text-neutral-300">
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <h3 className="font-serif text-base font-bold text-white">Componentele DAE Include:</h3>
            <ul className="space-y-1.5 font-mono text-[11px] text-neutral-400">
              <li className="flex items-center gap-2">• Dobânda nominală (marjă + indice)</li>
              <li className="flex items-center gap-2">• Comisionul de analiză dosar</li>
              <li className="flex items-center gap-2">• Comisionul lunar/anual de administrare</li>
              <li className="flex items-center gap-2">• Costul evaluării imobilului ipotecat</li>
              <li className="flex items-center gap-2">• Polițele de asigurare (PAD &amp; facultativă)</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <h3 className="font-serif text-base font-bold text-white">De Ce Contează DAE?</h3>
            <p className="leading-relaxed">
              Două oferte cu aceeași dobândă nominală pot avea DAE diferită din cauza comisioanelor și a costurilor conexe. DAE reprezintă indicatorul unic reglementat pentru compararea ofertelor bancare.
            </p>
          </div>
        </div>
      </section>

      {/* 9. REFINANȚARE — CHECKLIST (10 PUNCTE APLICATIVE) */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-8 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-4 h-4" />
            Checklist Refinanțare
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Checklist în 10 Puncte Înainte de Refinanțare
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Evaluarea economiei nete totale înainte de modificarea structurii creditului.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {refinancingChecklist.map((item) => (
            <div
              key={item.num}
              className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2 flex flex-col justify-between"
            >
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 w-fit">
                {item.num}
              </span>
              <p className="text-xs text-neutral-200 leading-relaxed font-serif">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CREDIT + REAL ESTATE CONNECTION SECTION */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0F1015] to-[var(--surface-elevated)] border border-amber-500/40 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto text-center">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
            BUYING PROPERTY WITH FINANCING
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            Corelarea Căutării Imobiliare cu Structurarea Creditului
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
            De la selecția proprietății până la finalizarea contractului notarial și acordarea creditului.
          </p>

          {/* Visual Flow */}
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-300 flex flex-wrap items-center justify-center gap-3">
            <span>PROPERTY</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            <span>PRICE</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            <span>DOWN PAYMENT</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            <span>LOAN</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            <span>INTEREST</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-amber-400 font-bold">MONTHLY PAYMENT</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://homefind.cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>Find Your Property</span>
              <ArrowRight className="w-4 h-4" />
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href="https://credite.cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg cursor-pointer w-full sm:w-auto"
            >
              <span>Explore Credit Advisory</span>
              <ArrowRight className="w-4 h-4" />
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </section>

      {/* 11. REAL EDITORIAL NEWS ARTICLES (IF PRESENT) */}
      {creditArticles.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Știri &amp; Informații Verificate
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Flux Editorial Creditare &amp; Dobânzi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* 12. GENERAL EDUCATIONAL DISCLAIMER */}
      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400 leading-relaxed">
        <span className="text-amber-500 font-bold uppercase mr-1">Notă Informativă:</span>
        Informațiile prezentate pe această pagină au caracter general și educațional și nu reprezintă ofertă financiară, recomandare personalizată sau contract de credit/asigurare. Condițiile, criteriile și costurile diferă în funcție de produs, instituție și profilul clientului.
      </div>

      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Credit Brief"
        headline="Notificări &amp; Actualizări Dobânzi"
        description="Abonați-vă pentru a primi informații la publicarea noului indice IRCC și a deciziilor BNR."
      />
    </div>
  );
}
