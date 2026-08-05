import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompanyBySlug, getAllArticles } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { ArrowLeft, Building2, TrendingUp, DollarSign, Calendar, ShieldCheck } from "lucide-react";

interface CompanyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CompanyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

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
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const relatedArticles = getAllArticles().slice(0, 3);

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
      <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-amber-500/40 bg-neutral-950 shrink-0">
              <Image src={company.logo} alt={company.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">{company.name}</h1>
              <p className="text-xs font-mono text-amber-400">{company.symbol} • {company.headquarters}</p>
            </div>
          </div>

          <div className="text-center md:text-right font-mono bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div className="text-xs text-neutral-400">Stock Price (BVB)</div>
            <div className="text-2xl font-bold text-white mt-0.5">{company.stockPrice}</div>
            <div className={`text-xs ${company.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {company.priceChange}
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-4">
          {company.description}
        </p>

        {/* Financial Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">Market Cap</span>
            <span className="text-lg font-bold text-white">{company.marketCap}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">Annual Revenue</span>
            <span className="text-lg font-bold text-white">{company.revenue}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">Net Income</span>
            <span className="text-lg font-bold text-white">{company.netIncome}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">Dividend Yield</span>
            <span className="text-lg font-bold text-amber-400">{company.dividendYield}</span>
          </div>
        </div>
      </div>

      {/* Strategic Timeline */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Calendar className="w-5 h-5 text-amber-400" />
          Strategic Milestones & History
        </h2>
        <div className="space-y-3 font-mono text-xs">
          {company.timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded bg-neutral-900 border border-neutral-800">
              <span className="text-amber-400 font-bold w-14 shrink-0">{item.year}</span>
              <span className="text-neutral-300">{item.event}</span>
            </div>
          ))}
        </div>
      </section>

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
