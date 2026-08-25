import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { verifiedVideos, verifiedShorts } from '@/config/youtube';
import { YouTubeEmbed } from '@/components/media/YouTubeEmbed';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd, createVideoObjectJsonLd } from '@/components/common/json-ld';
import { ArrowLeft, ExternalLink, Video, Building2, Activity, TrendingUp } from 'lucide-react';

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = [...verifiedVideos, ...verifiedShorts].find(
    (v) => v.slug === slug || v.id === slug
  );

  if (!video) {
    return { title: 'Video Negăsit | YouTube Channel | AiX Media' };
  }

  const canonicalUrl = `https://aixmedia.cristianvaduva.com/video/${video.slug || video.id}`;

  return {
    title: `${video.title} | YouTube Channel | AiX Media`,
    description: video.description || `Urmărește ${video.title} pe canalul oficial YouTube AiX Media.`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ro-RO": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: `${video.title} | YouTube Channel | AiX Media`,
      description: video.description || `Urmărește ${video.title} pe canalul oficial YouTube AiX Media.`,
      url: canonicalUrl,
      type: "video.other",
      images: [
        {
          url: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
  };
}

export default async function VideoDetailPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = [...verifiedVideos, ...verifiedShorts].find(
    (v) => v.slug === slug || v.id === slug
  ) || verifiedVideos[0];

  if (!video) {
    notFound();
  }

  const related = verifiedVideos
    .filter((v) => v.id !== video.id)
    .slice(0, 3);

  const videoObjectSchema = createVideoObjectJsonLd({
    id: video.id,
    title: video.title,
    description: video.description || `Prezentare video oficială: ${video.title}`,
    slug: video.slug,
  });

  return (
    <article className="max-w-5xl mx-auto space-y-8 py-6 text-neutral-100 px-4 sm:px-6">
      <JsonLd data={videoObjectSchema} />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: "Canal Video / TV", href: "/tv" },
          { label: video.category || "Video", href: "/tv" },
          { label: video.title },
        ]}
      />

      {/* Top Nav Back Link */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 border-b border-neutral-800 pb-4">
        <Link
          href="/tv"
          className="flex items-center gap-1.5 text-neutral-300 hover:text-rose-400 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la YouTube Channel</span>
        </Link>

        <span className="px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/25 uppercase font-bold text-[10px]">
          {video.category || 'YouTube Video'}
        </span>
      </div>

      {/* Video Embed Player */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
        <YouTubeEmbed videoId={video.id} title={video.title} lazy={false} />
      </div>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-b border-neutral-800 py-3 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-500" />
            <span className="text-white font-bold">@CristianVaduvaCV</span>
            <span>•</span>
            <span>Canal Oficial YouTube</span>
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all flex items-center gap-1.5"
          >
            <span>Deschide în YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {video.description && (
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 font-serif text-sm sm:text-base text-neutral-300 leading-relaxed">
            <h3 className="font-sans text-xs font-mono font-bold text-neutral-400 uppercase">Descriere Video:</h3>
            <p>{video.description}</p>
          </div>
        )}
      </div>

      {/* Ecosystem Cross-Links */}
      <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h3 className="font-sans text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
          Conexiuni Ecosistem AiX Media
        </h3>

        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link
            href="/companies"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-neutral-800 transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Companies Terminal</span>
          </Link>

          <Link
            href="/markets"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-neutral-800 transition-all flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Markets Terminal</span>
          </Link>

          <Link
            href="/real-estate"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-neutral-800 transition-all flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span>Real Estate Terminal</span>
          </Link>
        </div>
      </div>

      {/* Related Videos */}
      <div className="pt-8 space-y-6 border-t border-neutral-800">
        <h3 className="font-serif text-2xl font-bold text-white">Videoclipuri Similare</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((rel) => (
            <Link
              key={rel.id}
              href={`/video/${rel.slug || rel.id}`}
              className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/40 transition-all space-y-3 block group"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <Image
                  src={`https://img.youtube.com/vi/${rel.id}/hqdefault.jpg`}
                  alt={`Cadru video: ${rel.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-serif text-sm font-bold text-white group-hover:text-rose-300 transition-colors leading-snug line-clamp-2">
                {rel.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </article>
  );
}
