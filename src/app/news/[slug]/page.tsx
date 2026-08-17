import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { EcosystemContextLinks } from "@/components/ecosystem/EcosystemContextLinks";
import { JsonLd } from "@/components/common/json-ld";
import { SourceBadge } from "@/components/common/SourceBadge";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { siteConfig } from "@/config/site";
import { cleanText } from "@/lib/sanitizer";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Articol Negăsit | AiX Media" };
  }

  return {
    title: `${article.title} | AiX Media`,
    description: article.excerpt,
    alternates: { canonical: `${siteConfig.url}/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.authorName],
      images: [article.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getAllArticles()
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const isEditorialDesk =
    article.authorName === "AiX Media Editorial Desk" ||
    article.authorName.toLowerCase().includes("editorial desk");

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: isEditorialDesk
      ? {
          "@type": "Organization",
          name: "AiX Media Editorial Desk",
          url: siteConfig.url,
        }
      : {
          "@type": "Person",
          name: article.authorName,
        },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/news/${article.slug}`,
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-6">
      <JsonLd data={newsArticleSchema} />
      
      {/* Top Nav Back Link */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
        <Link href="/news" className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Fluxul de Știri
        </Link>
        <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 border border-neutral-200 uppercase font-semibold">
          {article.categoryLabel}
        </span>
      </div>

      {/* Title & Excerpt */}
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 leading-tight">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-serif italic">
          {article.excerpt}
        </p>

        <div className="pt-4 border-t border-b border-neutral-200 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-xs border border-neutral-300">
              A
            </div>
            <div>
              <div className="text-neutral-950 font-bold">{article.authorName}</div>
              <div className="text-[10px] text-amber-800">{article.authorRole || "Redacția Economică"}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-200 shadow-xs bg-neutral-100">
        <Image src={article.coverImage} alt={article.title} fill priority className="object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-6 text-sm sm:text-base">
        <div className="whitespace-pre-line">{cleanText(article.content)}</div>
      </div>

      {/* Source Provenance */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
        <SourceBadge
          source={article.category === "real-estate" ? "ANCPI / INS" : "BNR / Comunicat Oficial"}
          referencePeriod="2026"
          publishedAt={article.publishedAt}
        />
      </div>

      {/* Author Box */}
      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-4 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
          A
        </div>
        <div>
          <h4 className="text-sm font-bold text-neutral-950">{article.authorName}</h4>
          <p className="text-xs text-amber-800 font-mono font-semibold">{article.authorRole || "Redacția Economică AiX Media"}</p>
          <p className="text-xs text-neutral-600 mt-1">
            Redacția AiX Media publică analize structurate bazate exclusiv pe date și rapoarte emise de instituțiile publice și financiare oficiale.
          </p>
        </div>
      </div>

      {/* Contextual Ecosystem Links */}
      <EcosystemContextLinks category={article.category} />

      <DataDisclaimer type="general" />

      {/* Related Articles */}
      <div className="pt-8 space-y-6 border-t border-neutral-200">
        <h3 className="text-xl font-bold text-neutral-950">Rapoarte &amp; Analize Similare</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((rel) => (
            <ArticleCard key={rel.id} article={rel} />
          ))}
        </div>
      </div>

      <NewsletterBox />
    </article>
  );
}
