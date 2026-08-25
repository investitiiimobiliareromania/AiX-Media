import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { institutionalDossiers } from "@/lib/institutional-company-dossiers";
import { bvbCompanies } from "@/lib/bvb-data";
import { articleService } from "@/services/article.service";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/common/json-ld";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { InstitutionalCompanyProfileView } from "@/components/business-intelligence/InstitutionalCompanyProfileView";

interface CompanyDetailPageProps {
  params: Promise<{ slug: string }>;
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

  // Organization Schema for the Listed Company
  const companySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    alternateName: ticker,
    identifier: isin,
    url: canonicalUrl,
    description: dossier?.executiveSummary || fallbackComp?.description || "",
    ...(dossier?.headquarters ? { address: dossier.headquarters } : {}),
    sameAs: fallbackComp?.sourceUrl ? [fallbackComp.sourceUrl] : [],
  };

  // Fetch real articles associated with company
  const allArticles = await articleService.getPublishedArticles(200);
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
    <div className="space-y-10 py-6 text-neutral-100">
      <JsonLd data={companySchema} />

      {dossier ? (
        <InstitutionalCompanyProfileView dossier={dossier} relatedArticles={fallbackNews} />
      ) : (
        <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h1 className="text-2xl font-bold font-serif text-white">{name}</h1>
          <p className="text-sm text-neutral-300 font-serif">
            {fallbackComp?.description || "Date preliminare disponibile în registru."}
          </p>
        </div>
      )}

      <DataDisclaimer type="market" />
      <NewsletterBox />
    </div>
  );
}
