import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { Tv, Film, Video, ExternalLink } from "lucide-react";
import { verifiedVideos, youtubeChannelUrl } from "@/config/youtube";

const slug = "tv";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function TvPage() {
  // Find the primary featured video
  const featuredVideo = verifiedVideos.find(v => v.id === "PzPo7wbtUB4");
  
  // Remaining regular videos
  const otherVideos = verifiedVideos.filter(v => v.type === "video" && v.id !== "PzPo7wbtUB4");
  
  // Shorts from channel
  const shortsVideos = verifiedVideos.filter(v => v.type === "short");

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
      {featuredVideo && (
        <section className="p-6 md:p-8 rounded-3xl bg-[#090909] border border-neutral-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Tv className="w-4 h-4" />
              Featured Video Broadcast
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              HD Video Presentation
            </span>
          </div>

          {/* YouTube Embed */}
          <YouTubeEmbed videoId={featuredVideo.id} title={featuredVideo.title} lazy={false} />

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {featuredVideo.category}
              </span>
              <span>{featuredVideo.duration}</span>
              <span>•</span>
              <span>Published: {featuredVideo.publishedAt}</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{featuredVideo.title}</h2>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">{featuredVideo.description}</p>
          </div>
        </section>
      )}

      {/* Video Grid Catalog */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            Official Broadcasts & Studio Presentations
          </h2>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors uppercase font-bold"
          >
            Watch more on YouTube
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {otherVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherVideos.map((vid) => (
              <div key={vid.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 space-y-4">
                <YouTubeEmbed videoId={vid.id} title={vid.title} />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-500 font-semibold">{vid.category}</span>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">{vid.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">{vid.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-neutral-500 font-mono text-sm border border-dashed border-neutral-800 rounded-2xl bg-neutral-950/40">
            More broadcasts coming soon.
          </div>
        )}
      </section>

      {/* Shorts Section */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-400" />
            Featured YouTube Shorts
          </h2>
        </div>

        {shortsVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {shortsVideos.map((vid) => (
              <div key={vid.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 space-y-4">
                <YouTubeEmbed videoId={vid.id} title={vid.title} isShort={true} />
                <div className="space-y-1 text-center">
                  <h3 className="text-xs font-bold text-white leading-snug line-clamp-1">{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-neutral-500 font-mono text-sm border border-dashed border-neutral-800 rounded-2xl bg-neutral-950/40">
            More broadcasts coming soon.
          </div>
        )}
      </section>

      <NewsletterBox />
    </div>
  );
}
