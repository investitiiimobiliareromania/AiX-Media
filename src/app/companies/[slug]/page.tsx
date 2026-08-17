import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { SourceBadge } from "@/components/common/SourceBadge";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { ArrowLeft, TrendingUp, Calendar, ExternalLink, Landmark, FileText } from "lucide-react";
import { bvbCompanies } from "@/lib/bvb-data";

interface CompanyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CompanyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = bvbCompanies.find((c) => c.slug === slug);

  if (!company) {
    return { title: "Profil Companie | AiX Media" };
  }

  return {
    title: `${company.name} (${company.symbol}) Profil & Raportare Financiară | AiX Media`,
    description: company.description,
    alternates: { canonical: `/companies/${company.slug}` },
  };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { slug } = await params;
  const company = bvbCompanies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  const relatedArticles = getAllArticles().slice(0, 3);

  const formatCurrency = (val: number | null | undefined, unit: string = "RON") => {
    if (val === null || val === undefined) return "Indisponibil";
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B ${unit}`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M ${unit}`;
    return `${val.toLocaleString()} ${unit}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
        <Link href="/companies" className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Catalogul Companiilor
        </Link>
        <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 border border-neutral-200 uppercase font-semibold">
          {company.sector}
        </span>
      </div>

      {/* Header Info Banner */}
      <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-neutral-200 bg-white shrink-0 shadow-xs">
              <Image src={company.logo} alt={company.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-neutral-950">{company.name}</h1>
              <p className="text-xs font-mono text-neutral-600 mt-1">
                Simbol BVB: <strong className="text-neutral-950">{company.symbol}</strong> • ISIN:{" "}
                <span className="text-neutral-900 font-medium">{company.isin}</span>
              </p>
            </div>
          </div>

          <div className="text-center md:text-right font-mono bg-white p-4 rounded-xl border border-neutral-200 shrink-0 shadow-xs">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Cotație Raportată</div>
            <div className="text-xl font-bold text-neutral-950 mt-0.5">{company.stockPrice}</div>
            <div className="text-[9px] text-neutral-500 mt-1">Data referință: {company.asOf}</div>
          </div>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed border-t border-neutral-200 pt-4 relative z-10">
          {company.description}
        </p>

        {/* Legal Identity Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 font-mono text-xs text-neutral-600">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Sediu Social</span>
            <span className="text-neutral-950 font-medium">{company.headquarters}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Cod Fiscal (CUI)</span>
            <span className="text-neutral-950 font-medium">{company.cui}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Nr. Înregistrare</span>
            <span className="text-neutral-950 font-medium">{company.registrationNumber}</span>
          </div>
        </div>
      </div>

      {/* Grid: Market Data vs Financial Reporting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Data Panel */}
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <TrendingUp className="w-5 h-5 text-amber-700" />
            Date de Piață Raportate
          </h2>
          <div className="divide-y divide-neutral-100 font-mono text-xs space-y-3">
            <div className="flex justify-between py-1">
              <span className="text-neutral-600">Segment Bursier BVB</span>
              <span className="text-neutral-950 font-bold">{company.market} ({company.categoryName})</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Număr Acțiuni Emise</span>
              <span className="text-neutral-950 font-bold">{company.sharesOutstanding?.toLocaleString() || "Indisponibil"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Capital Social</span>
              <span className="text-neutral-950 font-bold">{formatCurrency(company.shareCapital)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Capitalizare Bursieră</span>
              <span className="text-neutral-950 font-bold">{company.marketCap}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Raport P/E</span>
              <span className="text-neutral-950 font-bold">{company.peRatio}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600 font-medium">Randament Dividend</span>
              <span className="text-amber-800 font-bold">{company.dividendYield}</span>
            </div>
          </div>
          <div className="pt-2">
            <SourceBadge source={company.source} sourceUrl={company.sourceUrl} publishedAt={company.asOf} fetchedAt={company.retrievedAt} />
          </div>
        </div>

        {/* Financial Teardown Panel */}
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Landmark className="w-5 h-5 text-amber-700" />
            Situații Financiare Oficiale
          </h2>
          <div className="divide-y divide-neutral-100 font-mono text-xs space-y-3">
            <div className="flex justify-between py-1 text-amber-900 font-semibold">
              <span>Perioadă Raportare</span>
              <span>{company.reportedPeriod}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Cifră de Afaceri / Venituri</span>
              <span className="text-neutral-950 font-bold">{formatCurrency(company.revenueValue)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">EBITDA</span>
              <span className="text-neutral-950 font-bold">{formatCurrency(company.ebitda)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Profit Net</span>
              <span className={`font-bold ${company.netProfit && company.netProfit > 0 ? "text-emerald-800" : "text-neutral-950"}`}>
                {formatCurrency(company.netProfit)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Total Active</span>
              <span className="text-neutral-950 font-bold">{formatCurrency(company.totalAssets)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Datorii Totale</span>
              <span className="text-neutral-950 font-bold">{formatCurrency(company.totalDebt)}</span>
            </div>
          </div>
          <div className="pt-2">
            <SourceBadge
              source={`${company.source} (${company.reportedPeriod})`}
              sourceUrl={company.sourceUrl}
              publishedAt={company.reportedAt}
              fetchedAt={company.retrievedAt}
            />
          </div>
        </div>
      </div>

      {/* Corporate Events Area */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
        <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2 border-b border-neutral-200 pb-3">
          <FileText className="w-5 h-5 text-amber-700" />
          Evenimente Corporative &amp; Rapoarte Curente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {company.corporateEvents.map((evt, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-neutral-200 space-y-2 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Data: {evt.date}</span>
                <h3 className="text-xs font-bold text-neutral-950 font-mono mt-1 leading-normal">{evt.title}</h3>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                <span>Sursă: {evt.source}</span>
                {company.sourceUrl && (
                  <a
                    href={company.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-700 text-neutral-900 underline flex items-center gap-0.5"
                  >
                    BVB Issuer Page
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Timeline */}
      <section className="p-6 md:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3">
          <Calendar className="w-5 h-5 text-amber-700" />
          Istoric &amp; Repere Strategice
        </h2>
        <div className="space-y-3 font-mono text-xs">
          {company.timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <span className="text-amber-800 font-bold w-14 shrink-0">{item.year}</span>
              <span className="text-neutral-700">{item.event}</span>
            </div>
          ))}
        </div>
      </section>

      <DataDisclaimer type="market" />

      {/* Coverage News */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-950">Rapoarte &amp; Analize Asociate</h2>
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
