import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getAllArticles } from "@/lib/media/service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { ArrowLeft, BookOpen } from "lucide-react";

interface AuthorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return { title: "Profil Negăsit | AiX Media" };
  }

  return {
    title: `${author.name} (${author.role}) | AiX Media`,
    description: author.bio,
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const authorArticles = getAllArticles().slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 pb-16 text-neutral-100">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
        <Link href="/authors" className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Redacție
        </Link>
        <span className="px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] text-amber-400 border border-[var(--border)] uppercase font-semibold text-[10px] tracking-wider">
          Redacție Verificată
        </span>
      </div>

      {/* Author Bio Banner */}
      <div className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)] shrink-0 shadow-md">
          <Image src={author.avatar} alt={author.name} fill className="object-cover" />
        </div>
        <div className="space-y-2 text-center md:text-left flex-1">
          <h1 className="font-serif text-3xl font-bold text-white">{author.name}</h1>
          <p className="text-xs font-mono text-amber-400 font-bold">{author.role}</p>
          <p className="text-sm text-neutral-300 leading-relaxed font-serif">{author.bio}</p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 font-mono text-[11px]">
            {author.expertise.map((exp, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-md bg-[var(--surface-elevated)] text-neutral-300 border border-[var(--border)]">
                {exp}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Articles by Author */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <BookOpen className="w-5 h-5 text-amber-500" />
          Rapoarte &amp; Analize Publicate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {authorArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}

