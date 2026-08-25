import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPodcastBySlug, getPodcastEpisodes } from '@/lib/media/service';
import { PodcastCard } from '@/components/media/PodcastCard';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { SafeImage } from '@/components/common/SafeImage';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd, createPodcastEpisodeJsonLd } from '@/components/common/json-ld';
import { PodcastAudioPlayer } from '@/components/podcasts/PodcastAudioPlayer';
import { ArrowLeft, ExternalLink, Headphones, Building2, Activity, TrendingUp } from 'lucide-react';

interface PodcastDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PodcastDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getPodcastBySlug(slug);

  if (!episode) {
    return { title: 'Episod Podcast Negăsit | AiX Media' };
  }

  const canonicalUrl = `https://aixmedia.cristianvaduva.com/podcast/${episode.slug}`;

  return {
    title: `${episode.title} | ${episode.showName} | AiX Media Podcasts`,
    description: episode.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ro-RO": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: `${episode.title} | ${episode.showName} | AiX Media Podcasts`,
      description: episode.description,
      url: canonicalUrl,
      type: "music.song",
      images: [
        {
          url: episode.coverImage,
          width: 800,
          height: 800,
          alt: episode.title,
        },
      ],
    },
  };
}

export default async function PodcastDetailPage({ params }: PodcastDetailPageProps) {
  const { slug } = await params;
  const rawEpisode = getPodcastBySlug(slug);
  const allEpisodes = getPodcastEpisodes();

  const episode = rawEpisode || allEpisodes[0];

  if (!episode) {
    notFound();
  }

  const related = allEpisodes.filter((e) => e.id !== episode.id).slice(0, 3);

  const podcastEpisodeSchema = createPodcastEpisodeJsonLd({
    title: episode.title,
    description: episode.description,
    slug: episode.slug,
    publishedAt: episode.publishedAt,
    duration: episode.duration,
    coverImage: episode.coverImage,
    showName: episode.showName,
  });

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-6 text-neutral-100 px-4 sm:px-6">
      <JsonLd data={podcastEpisodeSchema} />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: "Podcasturi", href: "/podcasts" },
          { label: episode.showName, href: "/podcasts" },
          { label: episode.title },
        ]}
      />

      {/* Top Nav Back Link */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 border-b border-neutral-800 pb-4">
        <Link
          href="/podcasts"
          className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la Catalogul de Podcasturi</span>
        </Link>
        <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25 uppercase font-bold text-[10px] tracking-wider">
          {episode.showName} • EP #{episode.episodeNumber || 1}
        </span>
      </div>

      {/* Episode Header Box */}
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-neutral-800 shadow-xl bg-neutral-950">
            <SafeImage src={episode.coverImage} slug={episode.slug} alt={`Copertă podcast: ${episode.title}`} fill priority className="object-cover" />
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 text-xs font-mono text-neutral-400">
              <span className="text-white font-bold">{episode.host}</span>
              <span>•</span>
              <span>{episode.duration}</span>
              <span>•</span>
              <span>{episode.publishedAt}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {episode.title}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">
              {episode.description}
            </p>

            {/* Audio Player Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 font-mono text-xs">
              <a
                href={episode.spotifyUrl || 'https://open.spotify.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg"
              >
                <Headphones className="w-4 h-4" />
                <span>Ascultă pe Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={episode.appleUrl || 'https://podcasts.apple.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-bold transition-all flex items-center gap-2"
              >
                <span>Apple Podcasts</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Interactive HTML5 Audio Player */}
      <PodcastAudioPlayer
        title={episode.title}
        showName={episode.showName}
        durationString={episode.duration}
        audioUrl={episode.audioUrl}
      />

      {/* Chapters / Show Notes */}
      {episode.chapters && episode.chapters.length > 0 && (
        <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
          <h3 className="font-sans text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Capitole &amp; Timestamps (Show Notes)
          </h3>

          <div className="space-y-2 font-mono text-xs">
            {episode.chapters.map((chap, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <span className="text-amber-400 font-bold">{chap.time}</span>
                <span className="text-neutral-200 font-serif text-sm">{chap.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connected Ecosystem Entities */}
      <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h3 className="font-sans text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
          Conexiuni Ecosystem AiX Media
        </h3>

        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link
            href="/companies"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Companies Terminal</span>
          </Link>

          <Link
            href="/markets"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-all flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Markets Terminal</span>
          </Link>

          <Link
            href="/real-estate"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-all flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span>Real Estate Terminal</span>
          </Link>
        </div>
      </div>

      <DataDisclaimer type="general" />

      {/* Related Recommended Episodes */}
      <div className="pt-6 space-y-6 border-t border-neutral-800">
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
