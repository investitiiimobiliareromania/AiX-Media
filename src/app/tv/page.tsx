import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getTvVideos } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { VideoCard } from "@/components/media/VideoCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Tv, Film, Play, Video } from "lucide-react";

const slug = "tv";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function TvPage() {
  const videos = getTvVideos();
  const mainVideo = videos[0];
  const gridVideos = videos.slice(1);

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={config.marketSignals}
      />

      {/* Featured Video Broadcast Player */}
      {mainVideo && (
        <section className="p-6 md:p-8 rounded-3xl bg-[#090909] border border-neutral-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Tv className="w-4 h-4" />
              Featured Studio Investigation
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              4K Ultra HD Broadcast
            </span>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${mainVideo.youtubeId}?autoplay=0`}
              title={mainVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {mainVideo.category}
              </span>
              <span>{mainVideo.duration}</span>
              <span>•</span>
              <span>{mainVideo.publishedAt}</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{mainVideo.title}</h2>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">{mainVideo.description}</p>
          </div>
        </section>
      )}

      {/* Video Grid Catalog */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            Documentary Series & Studio Talks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
