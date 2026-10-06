import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllEducationalArticles,
  getEducationalArticleBySlug,
} from "@/lib/education/education-service";
import { DecisionIntelligenceCard } from "@/components/editorial/DecisionIntelligenceCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import {
  BookOpen,
  ArrowLeft,
  Clock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  FileText,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllEducationalArticles();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getEducationalArticleBySlug(slug);

  if (!article) {
    return {
      title: "Ghid Negăsit | AiX Media",
    };
  }

  const title = `${article.title} | AiX Academy`;
  const description = article.shortAnswer;
  const url = `${siteConfig.url}/academy/${article.slug}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
      languages: {
        "ro-RO": url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EducationalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getEducationalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllEducationalArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.shortAnswer,
    inLanguage: "ro-RO",
    url: `${siteConfig.url}/academy/${article.slug}`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.png`,
      },
    },
    about: {
      "@type": "Thing",
      name: article.categoryLabel,
    },
  };

  return (
    <div className="space-y-12 pb-24 pt-4 text-neutral-100 max-w-4xl mx-auto px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link href="/academy" className="hover:text-amber-400 transition-colors">
          Academy
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-amber-400 font-bold truncate max-w-xs">{article.categoryLabel}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
            {article.categoryLabel}
          </span>
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{article.readTime}</span>
            </span>
            <span>•</span>
            <span className="text-neutral-400">AiX Editorial Methodology</span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* 1. THE SHORT ANSWER */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2.5 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Răspunsul Pe Scurt (The Short Answer)</span>
          </div>
          <p className="text-sm md:text-base text-neutral-100 font-serif leading-relaxed">
            {article.shortAnswer}
          </p>
        </div>
      </header>

      {/* Main Educational Sections */}
      <div className="space-y-10 pt-4 text-neutral-200 font-serif leading-relaxed">
        {/* 2. CE ÎNSEAMNĂ (WHAT IT MEANS) */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            Ce Înseamnă Acest Lucru?
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed font-serif">
            {article.whatItMeans}
          </p>
        </section>

        {/* 3. DE CE CONTEAZĂ (WHY IT MATTERS) */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            De Ce Contează În Practică?
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed font-serif">
            {article.whyItMatters}
          </p>
        </section>

        {/* 4. EXEMPLU PRACTIC (EXAMPLE SCENARIO) */}
        <section className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <span>Exemplu Practic Concret</span>
          </div>
          <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-serif italic">
            &ldquo;{article.exampleScenario}&rdquo;
          </p>
        </section>

        {/* 5. UNIVERSAL DECISION INTELLIGENCE CARD */}
        <DecisionIntelligenceCard
          title={`Matrice Decizională • ${article.categoryLabel}`}
          whyYes={article.whyYes}
          whyNot={article.whyNot}
          whyNow={article.whyNow}
          benefits={article.benefits}
          risks={article.risks}
          whatToCheck={article.whatToCheck}
          commonMistakes={article.commonMistakes}
          keyTakeaway={article.keyTakeaway}
        />

        {/* 6. SURSE OFICIALE & REFERINȚE */}
        <section className="p-6 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Surse Primare &amp; Bază Legală Verificată</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {article.relatedSources.map((source, idx) => (
              <li key={idx} className="flex items-center justify-between text-xs font-mono p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                <span className="text-neutral-300 truncate">{source.name}</span>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 ml-2 shrink-0 flex items-center gap-1"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Related Articles in same vertical */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t border-[var(--border)] space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
              Alte Ghiduri Din Aceeași Categorie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/academy/${rel.slug}`}
                  className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <span className="text-[11px] font-mono text-amber-400 font-bold">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {rel.title}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400 flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <span>{rel.readTime}</span>
                    <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">Citește →</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back to Academy button */}
      <div className="pt-6">
        <Link
          href="/academy"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono font-bold text-neutral-200 hover:text-white hover:border-amber-500/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Înapoi la Toate Ghidurile Academy</span>
        </Link>
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
