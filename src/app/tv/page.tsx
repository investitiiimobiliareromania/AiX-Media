import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { Tv, Film, Video, ExternalLink } from "lucide-react";
import { verifiedVideos, verifiedShorts, youtubeChannelUrl } from "@/config/youtube";

const slug = "tv";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media Video Library`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function TvPage() {
  const featuredVideo = verifiedVideos.find((v) => v.id === "PzPo7wbtUB4") || verifiedVideos[0];
  const featuredId = featuredVideo ? featuredVideo.id : "";
  const latestVideos = verifiedVideos.filter((v) => v.id !== featuredId);

  return (
    <div className="space-y-12">
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
              Featured Broadcast
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              HD Video Presentation
            </span>
          </div>

          <YouTubeEmbed videoId={featuredVideo.id} title={featuredVideo.title} lazy={false} />

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
                {featuredVideo.category || "Official"}
              </span>
              <span>Official Video</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">{featuredVideo.title}</h2>
            {featuredVideo.description && (
              <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">{featuredVideo.description}</p>
            )}
          </div>
        </section>
      )}

      {/* Latest Videos Catalog */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-400" />
              Latest Broadcasts &amp; Presentations
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Verified media catalog from Cristian Văduva official channel
            </p>
          </div>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors uppercase font-bold bg-neutral-900 px-3.5 py-2 rounded-lg border border-neutral-800"
          >
            Watch more on YouTube
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map((vid) => (
            <div key={vid.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <YouTubeEmbed videoId={vid.id} title={vid.title} />
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 inline-block">
                  {vid.category || "Official Video"}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shorts Section */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-400" />
              Official YouTube Shorts
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Vertical 9:16 verified clips
            </p>
          </div>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors uppercase font-bold"
          >
            View Channel Shorts &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {verifiedShorts.map((short) => (
            <div key={short.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-3 space-y-3 flex flex-col justify-between">
              <YouTubeEmbed videoId={short.id} title={short.title} isShort={true} />
              <div className="pt-1 text-center">
                <h3 className="text-xs font-medium text-neutral-200 leading-snug line-clamp-2">{short.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
