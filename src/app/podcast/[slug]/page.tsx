import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug, getPodcastEpisodes } from "@/lib/media/service";
import { PodcastCard } from "@/components/media/PodcastCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Play, ArrowLeft, Mic, Clock, Calendar, User } from "lucide-react";

interface PodcastDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PodcastDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getPodcastBySlug(slug);

  if (!episode) {
    return { title: "Podcast Not Found | AiX Media" };
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
    <article className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
        <Link href="/podcasts" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Podcast Catalog
        </Link>
        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-semibold">
          {episode.showName} • EP #{episode.episodeNumber}
        </span>
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-amber-500/40 shadow-xl bg-neutral-950">
            <Image src={episode.coverImage} alt={episode.title} fill className="object-cover" />
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{episode.title}</h1>
            <p className="text-xs text-neutral-400 font-mono">
              Hosted by <span className="text-amber-400 font-semibold">{episode.host}</span>
              {episode.guest && <> • Guest: <span className="text-white">{episode.guest}</span></>}
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{episode.description}</p>
            
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20">
                <Play className="w-4 h-4 fill-black" />
                PLAY EPISODE ({episode.duration})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-6 border-t border-neutral-800">
        <h3 className="text-xl font-bold text-white">More Executive Podcasts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((ep) => (
            <PodcastCard key={ep.id} episode={ep} />
          ))}
        </div>
      </div>

      <NewsletterBox />
    </article>
  );
}
