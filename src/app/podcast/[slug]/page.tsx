import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug, getPodcastEpisodes } from "@/lib/media/service";
import { PodcastCard } from "@/components/media/PodcastCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Play, ArrowLeft } from "lucide-react";

interface PodcastDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PodcastDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getPodcastBySlug(slug);

  if (!episode) {
    return { title: "Episod Podcast Negăsit | AiX Media" };
  }

  return {
    title: `${episode.title} | AiX Media Podcasts`,
    description: episode.description,
    alternates: { canonical: `/podcasts/${episode.slug}` },
  };
}

export default async function PodcastDetailPage({ params }: PodcastDetailPageProps) {
  const { slug } = await params;
  const episode = getPodcastBySlug(slug);

  if (!episode) {
    notFound();
  }

  const related = getPodcastEpisodes()
    .filter((e) => e.id !== episode.id)
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-6 text-neutral-100">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
        <Link href="/podcasts" className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Catalogul de Podcast
        </Link>
        <span className="px-2.5 py-1 rounded-md bg-[#171920] text-amber-400 border border-[#262932] uppercase font-semibold text-[10px] tracking-wider">
          {episode.showName} • EP #{episode.episodeNumber}
        </span>
      </div>

      <div className="p-8 rounded-2xl bg-[#111317] border border-[#262932] space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-[#262932] shadow-lg bg-[#0c0d12]">
            <Image src={episode.coverImage} alt={episode.title} fill className="object-cover" />
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">{episode.title}</h1>
            <p className="text-xs text-neutral-400 font-mono">
              Realizator: <strong className="text-white">{episode.host}</strong>
              {episode.guest && <> • Invitat: <span className="text-amber-400">{episode.guest}</span></>}
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">{episode.description}</p>
            
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                disabled
                className="px-6 py-2.5 rounded-xl bg-[#171920] text-neutral-400 font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-not-allowed border border-[#262932]"
              >
                <Play className="w-4 h-4 fill-current text-neutral-500" />
                REPRODUCERE AUDIO ({episode.duration})
              </button>
            </div>
          </div>
        </div>
      </div>

      <DataDisclaimer type="general" />

      <div className="pt-6 space-y-6 border-t border-[#262932]">
        <h3 className="font-serif text-xl font-bold text-white">Alte Episoade Recomandate</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {related.map((ep) => (
            <PodcastCard key={ep.id} episode={ep} />
          ))}
        </div>
      </div>

      <NewsletterBox />
    </article>
  );
}

