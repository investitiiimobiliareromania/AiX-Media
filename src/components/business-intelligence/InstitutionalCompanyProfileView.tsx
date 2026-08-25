'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InstitutionalCompanyDossier } from '@/lib/institutional-company-dossiers';
import { Article } from '@/lib/media/models/article';
import { SafeImage } from '@/components/common/SafeImage';
import { ArticleCard } from '@/components/media/ArticleCard';
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  FileText,
  ShieldCheck,
  Award,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  PieChart,
  Users,
  CheckCircle2,
  Info,
  Workflow,
  Target,
  BarChart3,
} from 'lucide-react';

interface InstitutionalCompanyProfileViewProps {
  dossier: InstitutionalCompanyDossier;
  relatedArticles: Article[];
}

type FinancialTab = 'income' | 'balance' | 'cashflow';

export function InstitutionalCompanyProfileView({
  dossier,
  relatedArticles,
}: InstitutionalCompanyProfileViewProps) {
  const [activeStatementTab, setActiveStatementTab] = useState<FinancialTab>('income');

  const formatRon = (val: number | undefined | null) => {
    if (val === undefined || val === null) return 'Not available';
    if (Math.abs(val) >= 1e9) return `${(val / 1e9).toFixed(2)}B RON`;
    if (Math.abs(val) >= 1e6) return `${(val / 1e6).toFixed(2)}M RON`;
    return `${val.toLocaleString()} RON`;
  };

  const latestFin = dossier.financialHistory[0]!;

  // Financial ratios calculation
  const netMargin = latestFin ? ((latestFin.netProfit / latestFin.revenue) * 100).toFixed(1) : 'N/A';
  const ebitdaMargin = latestFin && latestFin.ebitda ? ((latestFin.ebitda / latestFin.revenue) * 100).toFixed(1) : 'N/A';
  const roe = latestFin ? ((latestFin.netProfit / latestFin.equity) * 100).toFixed(1) : 'N/A';
  const roa = latestFin ? ((latestFin.netProfit / latestFin.totalAssets) * 100).toFixed(1) : 'N/A';

  return (
    <div className="space-y-10">
      {/* Top Breadcrumb & Data Coverage Score Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3 font-mono text-xs text-neutral-400">
        <Link
          href="/companies"
          className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la Terminalul Companiilor</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL DATA COVERAGE: {dossier.coverageScore.overall}%</span>
          </span>
          <span className="text-neutral-500">•</span>
          <span>Actualizat: {dossier.lastUpdated}</span>
        </div>
      </div>

      {/* 1. INSTITUTIONAL COMPANY HEADER BANNER */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0 shadow-md">
              <SafeImage
                src={dossier.logo}
                slug={dossier.slug}
                alt={dossier.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">{dossier.legalName}</h1>
                {dossier.symbol && (
                  <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                    BVB: {dossier.symbol}
                  </span>
                )}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                SECTOR: <span className="text-white font-semibold">{dossier.industry}</span> ({dossier.subIndustry})
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                ISIN: {dossier.isin || 'Not available'} • CUI: {dossier.cui || 'Not available'} • REG: {dossier.registrationNumber || 'Not available'}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end font-mono space-y-1.5 shrink-0 bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800/80">
            <div className="text-[10px] uppercase text-neutral-400">Statut Operativ Verificat</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{dossier.status}</span>
            </div>
            <div className="text-[11px] text-neutral-400">Fondat: {dossier.founded} • Sediu: {dossier.headquarters}</div>
          </div>
        </div>

        {/* Executive Summary Teardown */}
        <div className="pt-4 border-t border-neutral-800/80 space-y-2 relative z-10">
          <h2 className="font-mono text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            Executive Summary &amp; Poziționare de Piață
          </h2>
          <p className="text-sm font-serif text-neutral-200 leading-relaxed max-w-4xl">
            {dossier.executiveSummary}
          </p>
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs font-mono text-amber-300">
            Poziție de Piață: {dossier.marketPosition}
          </div>
        </div>
      </div>

      {/* 2. HOW THE BUSINESS WORKS (VISUAL DIAGRAM) */}
      <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-xl font-bold text-white">How the Business Works (Model de Afaceri)</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Flux de Valoare Corporativă</span>
        </div>

        {/* Diagram Step Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5 relative">
            <div className="text-[10px] text-amber-400 font-bold uppercase">1. Capital</div>
            <div className="text-neutral-200 leading-snug font-semibold">{dossier.businessWorkDiagram.capital}</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">2. Operations</div>
            <div className="text-neutral-200 leading-snug font-semibold">{dossier.businessWorkDiagram.operations}</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-sky-400 font-bold uppercase">3. Products / Services</div>
            <div className="text-neutral-200 leading-snug font-semibold">{dossier.businessWorkDiagram.products}</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-purple-400 font-bold uppercase">4. Customers</div>
            <div className="text-neutral-200 leading-snug font-semibold">{dossier.businessWorkDiagram.customers}</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-amber-300 font-bold uppercase">5. Revenue &amp; FCF</div>
            <div className="text-neutral-200 leading-snug font-semibold">{dossier.businessWorkDiagram.revenue}</div>
          </div>
        </div>

        {/* Business Segments Table */}
        <div className="pt-4 border-t border-neutral-800 space-y-2">
          <h3 className="font-mono text-xs font-bold uppercase text-white">Segmente de Business &amp; Linii de Venituri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-serif text-xs">
            {dossier.segments.map((seg, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-white">{seg.name}</span>
                  <span className="text-amber-400 font-bold text-xs">{seg.sharePct} Share</span>
                </div>
                <p className="text-neutral-300">{seg.description}</p>
                <div className="text-[11px] font-mono text-neutral-400 pt-1">
                  Marjă: <strong className="text-emerald-400">{seg.margin}</strong> • Țintă: {seg.targetMarket}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BANKING VS INDUSTRIAL FINANCIAL PROFILE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-2xl font-bold text-white">
              Financial Intelligence (FY 2025 Auditat IFRS)
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Verified Data • Raport Anual Official</span>
        </div>

        {/* Banking Metrics View vs Industrial Metrics View */}
        {dossier.isBanking && dossier.bankingMetrics ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Net Interest Margin (NIM)</div>
              <div className="text-lg font-bold text-amber-400">{dossier.bankingMetrics.nim}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Rată NPL (Neperformante)</div>
              <div className="text-lg font-bold text-white">{dossier.bankingMetrics.nplRatio}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Solvabilitate CET1</div>
              <div className="text-lg font-bold text-emerald-400">{dossier.bankingMetrics.cet1}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Cost-to-Income</div>
              <div className="text-lg font-bold text-white">{dossier.bankingMetrics.costToIncome}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Creștere Credite YoY</div>
              <div className="text-lg font-bold text-amber-300">{dossier.bankingMetrics.loanGrowth}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Creștere Depozite YoY</div>
              <div className="text-lg font-bold text-white">{dossier.bankingMetrics.depositGrowth}</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Venituri (Cifră Afaceri)</div>
              <div className="text-lg font-bold text-white">{formatRon(latestFin?.revenue)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">EBITDA</div>
              <div className="text-lg font-bold text-white">{formatRon(latestFin?.ebitda)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Profit Net</div>
              <div className="text-lg font-bold text-emerald-400">{formatRon(latestFin?.netProfit)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">Marjă Netă</div>
              <div className="text-lg font-bold text-amber-400">{netMargin}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">ROE (Rentabilitate Capital)</div>
              <div className="text-lg font-bold text-white">{roe}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-[10px] uppercase text-neutral-400">ROA (Rentabilitate Active)</div>
              <div className="text-lg font-bold text-white">{roa}%</div>
            </div>
          </div>
        )}
      </section>

      {/* 4. MULTI-YEAR AUDITED FINANCIAL HISTORY TABLE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="font-serif text-xl font-bold text-white">Istoric Financiar Auditat (Multi-An)</h2>
          <span className="text-xs font-mono text-neutral-400">Sume exprimate în RON</span>
        </div>

        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/80 font-mono text-[11px] uppercase text-neutral-400">
                  <th className="py-3 px-4">An Audit</th>
                  <th className="py-3 px-4 text-right">Venituri</th>
                  <th className="py-3 px-4 text-right">EBITDA</th>
                  <th className="py-3 px-4 text-right">Profit Net</th>
                  <th className="py-3 px-4 text-right">Active Totale</th>
                  <th className="py-3 px-4 text-right">Capital Propriu</th>
                  <th className="py-3 px-4 text-right">Datorii L.T.</th>
                  <th className="py-3 px-4 text-right">CAPEX</th>
                  <th className="py-3 px-4 text-right">Angajați</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-xs">
                {dossier.financialHistory.map((row) => (
                  <tr key={row.year} className="hover:bg-neutral-800/40">
                    <td className="py-3.5 px-4 font-bold text-amber-400">{row.year}</td>
                    <td className="py-3.5 px-4 text-right text-white font-semibold">{formatRon(row.revenue)}</td>
                    <td className="py-3.5 px-4 text-right text-white">{formatRon(row.ebitda)}</td>
                    <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">{formatRon(row.netProfit)}</td>
                    <td className="py-3.5 px-4 text-right text-neutral-300">{formatRon(row.totalAssets)}</td>
                    <td className="py-3.5 px-4 text-right text-neutral-300">{formatRon(row.equity)}</td>
                    <td className="py-3.5 px-4 text-right text-neutral-300">{formatRon(row.longTermDebt)}</td>
                    <td className="py-3.5 px-4 text-right text-amber-300">{formatRon(row.capex)}</td>
                    <td className="py-3.5 px-4 text-right text-neutral-300">{row.employees.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FINANCIAL STATEMENTS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 gap-3">
          <h2 className="font-serif text-xl font-bold text-white">Financial Statements (Tabbed Viewer)</h2>

          <div className="flex items-center gap-2 font-mono text-xs">
            {[
              { id: 'income', label: 'Income Statement' },
              { id: 'balance', label: 'Balance Sheet' },
              { id: 'cashflow', label: 'Cash Flow Statement' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStatementTab(tab.id as FinancialTab)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeStatementTab === tab.id
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 font-mono text-xs space-y-3">
          {activeStatementTab === 'income' && (
            <div className="divide-y divide-neutral-800 space-y-2">
              <div className="flex justify-between py-1 text-neutral-400"><span>Venituri Totale (Revenue)</span><span className="text-white font-bold">{formatRon(latestFin?.revenue)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Costul Veniturilor</span><span className="text-white">{formatRon(latestFin?.costOfRevenue)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Profit Brut (Gross Profit)</span><span className="text-white font-bold">{formatRon(latestFin?.grossProfit)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Cheltuieli Operaționale (OpEx)</span><span className="text-white">{formatRon(latestFin?.opEx)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>EBITDA</span><span className="text-white font-bold">{formatRon(latestFin?.ebitda)}</span></div>
              <div className="flex justify-between py-1 text-emerald-400 font-bold"><span>Profit Net Auditat</span><span>{formatRon(latestFin?.netProfit)}</span></div>
            </div>
          )}

          {activeStatementTab === 'balance' && (
            <div className="divide-y divide-neutral-800 space-y-2">
              <div className="flex justify-between py-1 text-neutral-400"><span>Numerar și Echivalente (Cash)</span><span className="text-white font-bold">{formatRon(latestFin?.cash)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Active Curente</span><span className="text-white">{formatRon(latestFin?.currentAssets)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Active Imobilizate</span><span className="text-white">{formatRon(latestFin?.nonCurrentAssets)}</span></div>
              <div className="flex justify-between py-1 text-amber-400 font-bold"><span>Total Active</span><span>{formatRon(latestFin?.totalAssets)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Datorii Curente</span><span className="text-white">{formatRon(latestFin?.currentLiabilities)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Datorii pe Termen Lung</span><span className="text-white">{formatRon(latestFin?.longTermDebt)}</span></div>
              <div className="flex justify-between py-1 text-emerald-400 font-bold"><span>Capital Propriu (Equity)</span><span>{formatRon(latestFin?.equity)}</span></div>
            </div>
          )}

          {activeStatementTab === 'cashflow' && (
            <div className="divide-y divide-neutral-800 space-y-2">
              <div className="flex justify-between py-1 text-neutral-400"><span>Flux de Numerar din Exploatare</span><span className="text-emerald-400 font-bold">{formatRon(latestFin?.operatingCashFlow)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Flux de Numerar din Investiții</span><span className="text-white">{formatRon(latestFin?.investingCashFlow)}</span></div>
              <div className="flex justify-between py-1 text-neutral-400"><span>Cheltuieli de Capital (CAPEX)</span><span className="text-amber-300">{formatRon(latestFin?.capex)}</span></div>
              <div className="flex justify-between py-1 text-amber-400 font-bold"><span>Free Cash Flow (FCF)</span><span>{formatRon(latestFin?.freeCashFlow)}</span></div>
            </div>
          )}
        </div>
      </section>

      {/* 6. COMPETITIVE LANDSCAPE & STRATEGIC PRIORITIES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Target className="w-5 h-5 text-amber-400" />
            Competitive Landscape (Competitori Cheie)
          </h3>
          <div className="space-y-3 font-serif text-xs">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-amber-400 block mb-1">Competitori Principali</span>
              <div className="flex flex-wrap gap-1.5">
                {dossier.competitors.map((comp, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 block mb-1">Avantaje Competitive</span>
              <ul className="list-disc list-inside space-y-1 text-neutral-300">
                {dossier.competitiveAdvantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            Priorități Strategice (&ldquo;What Matters Now&rdquo;)
          </h3>
          <div className="space-y-2 font-serif text-xs">
            {dossier.strategicPriorities.map((prio, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-neutral-200 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{prio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONNECTED REAL COMPANY NEWS */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-neutral-800">
          <h2 className="font-serif text-2xl font-bold text-white">Latest Intelligence &amp; Rapoarte ({dossier.name})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
