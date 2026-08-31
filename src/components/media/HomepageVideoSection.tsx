import React from "react";
import Link from "next/link";
import { ArrowRight, Play, Tv } from "lucide-react";
import { VideoItem } from "@/lib/media/models/media-types";
import { YouTubeThumbnail } from "./YouTubeThumbnail";

interface HomepageVideoSectionProps {
  videos: VideoItem[];
}

export function HomepageVideoSection({ videos }: HomepageVideoSectionProps) {
  if (!videos || videos.length === 0) return null;

  const featuredVideo =
    videos.find((v) => v.youtubeId === "PzPo7wbtUB4") || videos[0];
  if (!featuredVideo) return null;

  const secondaryVideos = videos
    .filter((v) => v.youtubeId !== featuredVideo.youtubeId)
    .slice(0, 3);

  return (
    <section
      className="space-y-6 pt-6"
      aria-labelledby="homepage-video-section-title"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-4 gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5" />
            Cristian Văduva — Momente &amp; Perspective
          </div>
          <h2
            id="homepage-video-section-title"
            className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1"
          >
            Cristian Văduva — Momente &amp; Perspective
          </h2>
          <p className="text-xs font-mono text-neutral-400 mt-0.5 tracking-wide">
            Real Estate · Markets · Negotiation · Perspective
          </p>
        </div>

        <Link
          href="/tv"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold transition-colors shrink-0 group uppercase tracking-wider"
        >
          <span>Toate Materialele Video</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Editorial Video Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large Featured Video Card (7 Columns on Desktop) */}
        <div className="lg:col-span-7">
          <Link
            href="/tv"
            className="group block rounded-2xl overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border)] text-white shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Cinematic 16:9 Thumbnail Container */}
            <div className="relative w-full aspect-video bg-[var(--surface-elevated)] overflow-hidden">
              <YouTubeThumbnail
                videoId={featuredVideo.youtubeId}
                alt={featuredVideo.title}
                priority={false}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="group-hover:scale-103 transition-transform duration-500 ease-out"
              />

              {/* Refined gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7F5] via-black/20 to-transparent" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-md bg-[var(--surface-elevated)]/80 backdrop-blur-md text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest border border-amber-500/30 shadow-md">
                  {featuredVideo.category || "Analiză Specială"}
                </span>
              </div>

              {/* Centered Refined Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--surface-elevated)]/80 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-2xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-[var(--foreground)] group-hover:border-amber-500 transition-all duration-300">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom metadata tag over video */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-neutral-300 z-10">
                <span className="bg-[var(--surface-elevated)]/80 px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
                  Canal Oficial Cristian Văduva
                </span>
                <span className="bg-[var(--surface-elevated)]/80 px-2 py-0.5 rounded-md text-amber-400 font-semibold backdrop-blur-xs border border-white/10">
                  {featuredVideo.duration || "HD"}
                </span>
              </div>
            </div>

            {/* Featured Video Details */}
            <div className="p-6 sm:p-7 space-y-3 bg-[var(--surface-elevated)]">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                {featuredVideo.title}
              </h3>
              {featuredVideo.description && (
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2 font-serif">
                  {featuredVideo.description}
                </p>
              )}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-amber-400 group-hover:underline">
                <span>Vizionează materialul video</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Video Cards (5 Columns on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {secondaryVideos.map((vid) => (
            <Link
              key={vid.id}
              href="/tv"
              className="group rounded-xl overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border)] text-white hover:border-amber-500/40 transition-all duration-300 p-3.5 sm:p-4 flex flex-col sm:flex-row gap-4 items-center shadow-lg"
            >
              {/* Secondary 16:9 Thumbnail */}
              <div className="relative w-full sm:w-44 shrink-0 aspect-video rounded-lg overflow-hidden bg-[var(--surface-elevated)]">
                <YouTubeThumbnail
                  videoId={vid.youtubeId}
                  alt={vid.title}
                  priority={false}
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="group-hover:scale-104 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[var(--surface-elevated)]/30 group-hover:bg-[var(--surface-elevated)]/10 transition-colors" />

                {/* Minimalist Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)]/80 text-amber-400 flex items-center justify-center border border-amber-400/30 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-[var(--foreground)] transition-all">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[var(--surface-elevated)]/80 text-[10px] font-mono text-neutral-300 border border-white/10">
                  {vid.duration || "HD"}
                </span>
              </div>

              {/* Secondary Video Info */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {vid.category || "Video"}
                </span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {vid.title}
                </h4>
                <p className="text-[11px] text-neutral-400 line-clamp-1 font-mono">
                  Cristian Văduva • Official Channel
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

