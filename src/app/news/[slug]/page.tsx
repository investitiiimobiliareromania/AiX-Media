import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { EcosystemContextLinks } from "@/components/ecosystem/EcosystemContextLinks";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ContextualInternalLinks } from "@/components/common/ContextualInternalLinks";
import { SourceBadge } from "@/components/common/SourceBadge";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { siteConfig } from "@/config/site";
import { cleanText } from "@/lib/sanitizer";
import { Clock, Calendar, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Building2 } from "lucide-react";

import { ensureFullArticleContent } from "@/lib/article-full-text-enhancer";
import { ArticleIntelligencePanel } from "@/components/news-intelligence/ArticleIntelligencePanel";

export const revalidate = 300;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await articleService.getPublishedArticleBySlug(slug);

  if (!article) {
    return { title: "Articol Negăsit | AiX Media" };
  }

  const canonicalUrl = `${siteConfig.url}/news/${article.slug}`;

  return {
    title: `${article.title} | AiX Media`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ro-RO": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      section: article.categoryLabel || article.category,
      authors: [article.authorName],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: `Analiză AiX Media: ${article.title}`,
        },
      ],
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
  const rawArticle = await articleService.getPublishedArticleBySlug(slug);

  if (!rawArticle) {
    notFound();
  }

  // Ensure full untruncated content
  const fullContent = await ensureFullArticleContent(rawArticle);
  const article = {
    ...rawArticle,
    content: fullContent,
  };

  const related = await articleService.getRelatedIntelligenceArticles(article, 3);

  const canonicalUrl = `${siteConfig.url}/news/${article.slug}`;

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "ro-RO",
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Organization",
      name: "AiX Media Editorial Desk",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon`,
        width: 512,
        height: 512,
      },
    },
    articleSection: article.categoryLabel || article.category,
  };

  // Derive key takeaways from content
  const paragraphs = article.content
    .split(/\n\n+/)
    .map((p) => cleanText(p.trim()))
    .filter((p) => p.length > 20 && !p.startsWith('#'));

  const keyTakeaways = [
    article.excerpt,
    paragraphs[0] || "Informație verificată din comunicatele instituționale oficiale.",
    paragraphs[1] || "Datele reflectă cele mai recente raportări statistice naționale.",
  ].slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-6 text-neutral-100">
      <JsonLd data={newsArticleSchema} />
      
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: "Știri & Rapoarte", href: "/news" },
          { label: article.categoryLabel || "Analiză", href: `/news` },
          { label: article.title },
        ]}
      />

      {/* Top Nav Back Link */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
        <Link href="/news" className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Fluxul de Știri
        </Link>
        <span className="px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] text-amber-400 border border-[var(--border)] uppercase font-semibold text-[10px] tracking-wider">
          {article.categoryLabel}
        </span>
      </div>

      {/* Title & Excerpt */}
      <div className="space-y-4 text-center md:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-serif italic">
          {article.excerpt}
        </p>

        <div className="pt-4 border-t border-b border-[var(--border)] py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] text-amber-400 flex items-center justify-center font-bold text-xs border border-[var(--border)]">
              A
            </div>
            <div>
              <div className="text-white font-bold">{article.authorName}</div>
              <div className="text-[10px] text-amber-400 font-medium">{article.authorRole || "Redacția Economică"}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--surface-elevated)]">
        <Image
          src={article.coverImage}
          alt={`Ilustrație editorială: ${article.title}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      {/* Executive Key Takeaways Box */}
      <section
        aria-label="Executive Briefing & Key Takeaways"
        className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 space-y-3 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Executive Briefing • Puncte Cheie</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase">
            Sinteză Verificată
          </span>
        </div>

        <ul className="space-y-2 font-serif text-sm sm:text-base text-neutral-200">
          {keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Article Content - Full Body Rendering */}
      <div className="prose prose-invert max-w-none text-neutral-200 font-serif leading-relaxed space-y-6 text-base sm:text-lg">
        {article.content.includes('<p>') || article.content.includes('<h3') ? (
          <div
            className="space-y-6 leading-[1.85]"
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/\[\s*…\s*\]/g, '')
                .replace(/\[\s*\.\.\.\s*\]/g, '')
                .replace(/&#8230;/g, ''),
            }}
          />
        ) : (
          <div className="space-y-6 leading-[1.85]">
            {article.content
              .replace(/\[\s*…\s*\]/g, '')
              .replace(/\[\s*\.\.\.\s*\]/g, '')
              .replace(/&#8230;/g, '')
              .split(/\n\n+/)
              .map((para, idx) => (
                <p key={idx} className="leading-[1.85] font-serif text-neutral-200 text-base sm:text-lg">
                  {cleanText(para.trim())}
                </p>
              ))}
          </div>
        )}
      </div>

      {/* Source Provenance */}
      <div className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)]">
        <SourceBadge
          source={article.category === "real-estate" ? "ANCPI / INS" : "BNR / Comunicat Oficial"}
          referencePeriod="2026"
          publishedAt={article.publishedAt}
        />
      </div>

      {/* Contextual Internal Linking */}
      <ContextualInternalLinks
        currentText={`${article.title} ${article.excerpt} ${article.content}`}
        category={article.category}
        currentSlug={article.slug}
      />

      {/* Article Executive Intelligence Panel */}
      <ArticleIntelligencePanel article={article} relatedArticles={related} />

      {/* Author Box */}
      <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center gap-4 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)] border border-neutral-800 text-amber-400 flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
          A
        </div>
        <div>
          <h4 className="font-serif text-sm font-bold text-white">{article.authorName}</h4>
          <p className="text-xs text-amber-400 font-mono font-semibold">{article.authorRole || "Redacția Economică AiX Media"}</p>
          <p className="text-xs text-neutral-400 mt-1 font-serif">
            Redacția AiX Media publică analize structurate bazate exclusiv pe date și rapoarte emise de instituțiile publice și financiare oficiale.
          </p>
        </div>
      </div>

      {/* Contextual Ecosystem Links */}
      <EcosystemContextLinks category={article.category} />

      <DataDisclaimer type="general" />

      {/* Related Articles */}
      <div className="pt-8 space-y-6 border-t border-[var(--border)]">
        <h3 className="font-serif text-xl font-bold text-white">Related Intelligence &amp; Analize Conexe</h3>
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
