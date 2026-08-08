import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { SourceBadge } from "@/components/SourceBadge";
import { ArrowLeft, Building2, TrendingUp, DollarSign, Calendar, ExternalLink, ShieldCheck, Landmark, Receipt, FileText } from "lucide-react";
import { bvbCompanies } from "@/lib/bvb-data";

interface CompanyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CompanyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = bvbCompanies.find(c => c.slug === slug);

  if (!company) {
    return { title: "Company Profile Not Found | AiX Media" };
  }

  return {
    title: `${company.name} (${company.symbol}) Profile & Financials | AiX Media`,
    description: company.description,
    alternates: { canonical: `/companies/${company.slug}` },
  };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { slug } = await params;
  const company = bvbCompanies.find(c => c.slug === slug);

  if (!company) {
    notFound();
  }

  const relatedArticles = getAllArticles().slice(0, 3);

  // Helper formatting functions
  const formatCurrency = (val: number | null | undefined, unit: string = "RON") => {
    if (val === null || val === undefined) return "Unavailable";
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B ${unit}`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M ${unit}`;
    return `${val.toLocaleString()} ${unit}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
        <Link href="/companies" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Company Profiles
        </Link>
        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-semibold">
          {company.sector}
        </span>
      </div>

      {/* Header Info Banner */}
      <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-amber-500/40 bg-neutral-950 shrink-0">
              <Image src={company.logo} alt={company.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{company.name}</h1>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Ticker: <span className="text-amber-400 font-bold">{company.symbol}</span> • ISIN: <span className="text-white font-medium">{company.isin}</span>
              </p>
            </div>
          </div>

          <div className="text-center md:text-right font-mono bg-neutral-950 p-4 rounded-xl border border-neutral-800 shrink-0">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Reported Market Price</div>
            <div className="text-xl font-bold text-white mt-0.5">{company.stockPrice}</div>
            <div className="text-[9px] text-neutral-500 mt-1">As of: {company.asOf}</div>
          </div>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-4 relative z-10">
          {company.description}
        </p>

        {/* Legal Identity Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/60 font-mono text-xs text-neutral-400">
          <div>
            <span className="text-neutral-600 block text-[10px] uppercase tracking-wider">Headquarters</span>
            <span className="text-white">{company.headquarters}</span>
          </div>
          <div>
            <span className="text-neutral-600 block text-[10px] uppercase tracking-wider">CUI (Tax ID)</span>
            <span className="text-white">{company.cui}</span>
          </div>
          <div>
            <span className="text-neutral-600 block text-[10px] uppercase tracking-wider">Registration Number</span>
            <span className="text-white">{company.registrationNumber}</span>
          </div>
        </div>
      </div>

      {/* Grid: Market Data vs Financial Reporting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Market Data Panel */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-neutral-800 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Reported Market Data
          </h2>
          <div className="divide-y divide-neutral-900 font-mono text-xs space-y-3.5">
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">BVB Market Segment</span>
              <span className="text-white font-bold">{company.market} ({company.categoryName})</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Shares Outstanding</span>
              <span className="text-white font-bold">{company.sharesOutstanding?.toLocaleString() || "Unavailable"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Share Capital</span>
              <span className="text-white font-bold">{formatCurrency(company.shareCapital)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Market Capitalization</span>
              <span className="text-white font-bold">{company.marketCap}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Price‑to‑Earnings (P/E)</span>
              <span className="text-white font-bold">{company.peRatio}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-medium">Dividend Yield</span>
              <span className="text-amber-400 font-bold">{company.dividendYield}</span>
            </div>
          </div>
          <div className="pt-2">
            <SourceBadge source={company.source} publishedAt={company.asOf} fetchedAt={company.retrievedAt} />
          </div>
        </div>

        {/* Financial Teardown Panel */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-neutral-800 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Landmark className="w-5 h-5 text-amber-400" />
            Verified Financial Teardown
          </h2>
          <div className="divide-y divide-neutral-900 font-mono text-xs space-y-3.5">
            <div className="flex justify-between py-1 text-amber-400 font-semibold">
              <span>Reporting Period</span>
              <span>{company.reportedPeriod}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Annual Revenue</span>
              <span className="text-white font-bold">{formatCurrency(company.revenueValue)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">EBITDA</span>
              <span className="text-white font-bold">{formatCurrency(company.ebitda)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Net Profit / Income</span>
              <span className={`font-bold ${company.netProfit && company.netProfit > 0 ? "text-emerald-400" : "text-white"}`}>
                {formatCurrency(company.netProfit)}
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Total Assets</span>
              <span className="text-white font-bold">{formatCurrency(company.totalAssets)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400">Total Liabilities &amp; Debt</span>
              <span className="text-white font-bold">{formatCurrency(company.totalDebt)}</span>
            </div>
          </div>
          <div className="pt-2">
            <SourceBadge source={`${company.source} (${company.reportedPeriod} Report)`} publishedAt={company.reportedAt} fetchedAt={company.retrievedAt} />
          </div>
        </div>

      </div>

      {/* Corporate Events Area */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
          <FileText className="w-5 h-5 text-amber-400" />
          Recent Corporate Disclosures & Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {company.corporateEvents.map((evt, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Event Date: {evt.date}</span>
                <h3 className="text-xs font-bold text-white font-mono mt-1 leading-normal">{evt.title}</h3>
              </div>
              <div className="pt-3 border-t border-neutral-900/60 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                <span>Source: {evt.source}</span>
                {company.sourceUrl && (
                  <a
                    href={company.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 flex items-center gap-0.5"
                  >
                    BVB Link
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Timeline */}
      <section className="p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-neutral-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Calendar className="w-5 h-5 text-amber-400" />
          Strategic Milestones & History
        </h2>
        <div className="space-y-3 font-mono text-xs">
          {company.timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded bg-neutral-950 border border-neutral-900">
              <span className="text-amber-400 font-bold w-14 shrink-0">{item.year}</span>
              <span className="text-neutral-300">{item.event}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Source Disclosures Disclaimer */}
      <div className="p-4 rounded bg-neutral-950 border border-neutral-900 text-[11px] leading-relaxed text-neutral-500 font-mono space-y-2">
        <p>
          <strong>Data Freshness & Provenance Notice:</strong> All data is fetched from public BVB issuer pages and published disclosures. Financial values are reported historically for the stated periods. Retained values represent the latest available official reports. Live exchange cotații are not integrated; stock prices are indicative as of the stated publication cycle date.
        </p>
      </div>

      {/* Coverage News */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Coverage & Analysis Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
