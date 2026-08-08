import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | AiX Media" };
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

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
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
    <article className="max-w-4xl mx-auto space-y-10 py-6">
      <JsonLd data={newsArticleSchema} />
      {/* Top Nav Back Link */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
        <Link href="/news" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Intelligence Feed
        </Link>
        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-semibold">
          {article.categoryLabel}
        </span>
      </div>

      {/* Title & Excerpt */}
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-serif italic">
          {article.excerpt}
        </p>

        <div className="pt-4 border-t border-b border-neutral-800 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            {article.authorAvatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-700">
                <Image src={article.authorAvatar} alt={article.authorName} fill className="object-cover" />
              </div>
            )}
            <div>
              <div className="text-white font-medium">{article.authorName}</div>
              <div className="text-[10px] text-amber-400">{article.authorRole || "Editorial Team"}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
        <Image src={article.coverImage} alt={article.title} fill priority className="object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose prose-invert prose-amber max-w-none text-neutral-300 leading-relaxed space-y-6 text-sm sm:text-base">
        <p>{article.content}</p>
        <p>
          Romanian market dynamics continue to demonstrate structural resilience across primary assets. As capital flows shift toward higher-yielding opportunities in Central &amp; Eastern Europe, institutional decision-makers are placing higher emphasis on transparent macroeconomic data, regulatory foresight, and long-term infrastructure investment.
        </p>
        <blockquote className="p-4 rounded-xl bg-neutral-900 border-l-4 border-amber-400 text-white font-semibold my-6 not-italic">
          &ldquo;Signal accuracy and deep regional context are essential when evaluating market expansion in Central &amp; Eastern Europe.&rdquo;
        </blockquote>
        <p>
          AiX Media analysts will continue to monitor rate trajectories, corporate earnings disclosures, and transaction flows across all major financial sectors.
        </p>
      </div>

      {/* Author Box */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
        {article.authorAvatar && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-amber-500/40">
            <Image src={article.authorAvatar} alt={article.authorName} fill className="object-cover" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-white">{article.authorName}</h4>
          <p className="text-xs text-amber-400 font-mono">{article.authorRole || "Senior Media Analyst"}</p>
          <p className="text-xs text-neutral-400 mt-1">Specializing in macroeconomic policy, institutional capital allocation, and CEE market intelligence.</p>
        </div>
      </div>

      {/* Related Articles */}
      <div className="pt-8 space-y-6 border-t border-neutral-800">
        <h3 className="text-xl font-bold text-white">Related Intelligence Investigations</h3>
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
