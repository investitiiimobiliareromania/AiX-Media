import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { institutionalDossiers } from "@/lib/institutional-company-dossiers";
import { bvbCompanies } from "@/lib/bvb-data";
import { articleService } from "@/services/article.service";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ContextualInternalLinks } from "@/components/common/ContextualInternalLinks";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { InstitutionalCompanyProfileView } from "@/components/business-intelligence/InstitutionalCompanyProfileView";
import { CompanyIdentityImage } from "@/components/company-intelligence/CompanyIdentityImage";

interface CompanyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const dossierSlugs = institutionalDossiers.map((d) => ({ slug: d.slug }));
  const bvbSlugs = bvbCompanies.map((c) => ({ slug: c.slug }));
  const allSlugs = Array.from(new Set([...dossierSlugs.map((s) => s.slug), ...bvbSlugs.map((s) => s.slug)]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CompanyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dossier = institutionalDossiers.find((d) => d.slug === slug);
  const fallbackComp = bvbCompanies.find((c) => c.slug === slug);

  const name = dossier ? dossier.name : fallbackComp ? fallbackComp.name : "Profil Corporativ";
  const desc = dossier
    ? dossier.executiveSummary
    : fallbackComp
    ? fallbackComp.description
    : "Profil corporativ, indicatori financiari auditați și analize de guvernanță pentru companii listate la Bursa de Valori București.";

  const canonicalUrl = `${siteConfig.url}/companies/${slug}`;

  return {
    title: `${name} — Profil Financiar și Business Intelligence | AiX Media`,
    description: desc,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ro-RO": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: `${name} — Profil Financiar și Business Intelligence | AiX Media`,
      description: desc,
      type: "website",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Profil Financiar și Business Intelligence | AiX Media`,
      description: desc,
    },
  };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { slug } = await params;
  const dossier = institutionalDossiers.find((d) => d.slug === slug);
  const fallbackComp = bvbCompanies.find((c) => c.slug === slug);

  if (!dossier && !fallbackComp) {
    notFound();
  }

  const name = dossier ? dossier.name : fallbackComp?.name || "Companie BVB";
  const ticker = dossier ? dossier.symbol : fallbackComp?.symbol || "";
  const isin = dossier ? dossier.isin : fallbackComp?.isin || "";
  const canonicalUrl = `${siteConfig.url}/companies/${slug}`;

  // Corporation Schema for the Listed Company
  const companySchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name,
    legalName: dossier?.legalName || name,
    tickerSymbol: ticker,
    identifier: isin,
    url: canonicalUrl,
    description: dossier?.executiveSummary || fallbackComp?.description || "",
    ...(dossier?.headquarters ? { address: dossier.headquarters } : {}),
    sameAs: fallbackComp?.sourceUrl ? [fallbackComp.sourceUrl] : [],
  };

  // Fetch real articles associated with company
  const allArticles = await articleService.getPublishedArticles(30);
  const companyNews = allArticles
    .filter((a) => {
      const text = `${a.title} ${a.excerpt} ${a.slug}`.toLowerCase();
      const nameKey = (dossier ? dossier.name : slug).toLowerCase();
      const symbolKey = ticker ? ticker.toLowerCase() : "";
      return text.includes(nameKey) || (symbolKey !== "" && text.includes(symbolKey));
    })
    .slice(0, 3);

  const fallbackNews = companyNews.length > 0 ? companyNews : allArticles.slice(0, 3);

  return (
    <div className="space-y-8 py-6 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      <JsonLd data={companySchema} />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: "Companii Listate la BVB", href: "/companies" },
          { label: name },
        ]}
      />

      {dossier ? (
        <InstitutionalCompanyProfileView dossier={dossier} relatedArticles={fallbackNews} />
      ) : fallbackComp ? (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <CompanyIdentityImage
                  src={fallbackComp.logo}
                  name={fallbackComp.name}
                  symbol={fallbackComp.symbol}
                  sector={fallbackComp.sector}
                  slug={fallbackComp.slug}
                  size="xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      {fallbackComp.name}
                    </h1>
                    {fallbackComp.symbol && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs">
                        {fallbackComp.symbol}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1">
                    {fallbackComp.sector} • Sediu: <span className="text-neutral-300">{fallbackComp.headquarters}</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                    CUI: {fallbackComp.cui || 'N/A'} • Reg: {fallbackComp.registrationNumber || 'N/A'} • CEO: <strong className="text-neutral-300">{fallbackComp.ceo}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {fallbackComp.market}
                </span>
                <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Date Auditate Oficiale
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base font-serif text-neutral-200 leading-relaxed border-t border-neutral-800 pt-4">
              {fallbackComp.description}
            </p>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono pt-2">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-400 uppercase">Cifră de Afaceri</div>
                <div className="text-base sm:text-lg font-bold text-white">
                  {fallbackComp.revenueValue
                    ? `${(fallbackComp.revenueValue / 1e9).toFixed(2)} Mld RON`
                    : fallbackComp.revenue}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-400 uppercase">Profit Net</div>
                <div className="text-base sm:text-lg font-bold text-emerald-400">
                  {fallbackComp.netProfit
                    ? `${(fallbackComp.netProfit / 1e9 >= 1 ? (fallbackComp.netProfit / 1e9).toFixed(2) + ' Mld' : (fallbackComp.netProfit / 1e6).toFixed(0) + ' Mil')} RON`
                    : fallbackComp.netIncome}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-400 uppercase">Active Totale</div>
                <div className="text-base sm:text-lg font-bold text-white">
                  {fallbackComp.totalAssets
                    ? `${(fallbackComp.totalAssets / 1e9 >= 1 ? (fallbackComp.totalAssets / 1e9).toFixed(2) + ' Mld' : (fallbackComp.totalAssets / 1e6).toFixed(0) + ' Mil')} RON`
                    : 'N/A'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-400 uppercase">Capitaluri Proprii</div>
                <div className="text-base sm:text-lg font-bold text-amber-400">
                  {fallbackComp.equity
                    ? `${(fallbackComp.equity / 1e9 >= 1 ? (fallbackComp.equity / 1e9).toFixed(2) + ' Mld' : (fallbackComp.equity / 1e6).toFixed(0) + ' Mil')} RON`
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Governance */}
          {fallbackComp.timeline && fallbackComp.timeline.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
              <h2 className="font-serif text-xl font-bold text-white">Repere Istorice &amp; Evoluție</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {fallbackComp.timeline.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-400">{item.year}</span>
                    <p className="text-xs font-serif text-neutral-300">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Contextual Internal Linking */}
      <ContextualInternalLinks
        currentText={`${name} ${ticker} ${dossier?.executiveSummary || fallbackComp?.description || ""}`}
        category="companies"
        currentSlug={slug}
      />

      <DataDisclaimer type="market" />
      <NewsletterBox />
    </div>
  );
}
