import { type Metadata } from "next";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Tv, Film, Video, ExternalLink } from "lucide-react";
import { verifiedVideos, verifiedShorts, youtubeChannelUrl } from "@/config/youtube";

export const metadata: Metadata = {
  title: "AiX TV & Analize Video | AiX Media",
  description:
    "Producții video, investigații economice și prezentări verificate realizate de Cristian Văduva.",
  alternates: { canonical: "/tv" },
};

export default function TvPage() {
  const featuredVideo = verifiedVideos.find((v) => v.id === "PzPo7wbtUB4") || verifiedVideos[0];
  const featuredId = featuredVideo ? featuredVideo.id : "";
  const latestVideos = verifiedVideos.filter((v) => v.id !== featuredId);

  return (
    <div className="space-y-10 pb-16 pt-4">
      <PremiumHero
        eyebrow="Jurnalism Video &amp; Documentare"
        headline="Analize Video &amp; Prezentări Oficiale"
        description="Catalog video structurat cu prezentări macroeconomice, analize de piață și dezbateri economice verificate."
        ctaLabel="Urmărește Prezentarea"
        ctaHref="#featured-broadcast"
        marketSignals={[
          { label: "Canal Video", value: "Cristian Văduva", change: "Oficial", isPositive: true },
          { label: "Format", value: "HD Video", change: "Verificat", isPositive: true },
        ]}
      />

      {/* Featured Video Broadcast Player */}
      {featuredVideo && (
        <section id="featured-broadcast" className="p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <div className="flex items-center gap-2 text-amber-700 font-mono text-xs uppercase font-bold tracking-wider">
              <Tv className="w-4 h-4" />
              Prezentare Video Recomandată
            </div>
            <span className="text-xs font-mono text-neutral-600 bg-white px-3 py-1 rounded-lg border border-neutral-200 shadow-xs">
              Rezoluție HD
            </span>
          </div>

          <YouTubeEmbed videoId={featuredVideo.id} title={featuredVideo.title} lazy={false} />

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200 font-semibold">
                {featuredVideo.category || "Oficial"}
              </span>
              <span>Canal Oficial Cristian Văduva</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-950 leading-tight">{featuredVideo.title}</h2>
            {featuredVideo.description && (
              <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">{featuredVideo.description}</p>
            )}
          </div>
        </section>
      )}

      {/* Latest Videos Catalog */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-700" />
              Prezentări &amp; Analize Video Recente
            </h2>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              Catalog media verificat din canalul oficial Cristian Văduva
            </p>
          </div>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-900 hover:text-amber-700 transition-colors uppercase font-bold bg-white px-3.5 py-2 rounded-lg border border-neutral-200 shadow-xs shrink-0"
          >
            Canalul YouTube
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map((vid) => (
            <div key={vid.id} className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-xs">
              <YouTubeEmbed videoId={vid.id} title={vid.title} />
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono text-amber-800 font-semibold px-2 py-0.5 rounded bg-amber-50 border border-amber-200 inline-block">
                  {vid.category || "Video Oficial"}
                </span>
                <h3 className="text-sm font-bold text-neutral-950 leading-snug line-clamp-2">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shorts Section */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-700" />
              Clipuri Video Scurte (Shorts)
            </h2>
          </div>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-900 hover:text-amber-700 transition-colors uppercase font-bold"
          >
            Vezi toate clipurile &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {verifiedShorts.map((short) => (
            <div key={short.id} className="bg-white border border-neutral-200 rounded-2xl p-3 space-y-3 flex flex-col justify-between shadow-xs">
              <YouTubeEmbed videoId={short.id} title={short.title} isShort={true} />
              <div className="pt-1 text-center">
                <h3 className="text-xs font-medium text-neutral-800 leading-snug line-clamp-2">{short.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
