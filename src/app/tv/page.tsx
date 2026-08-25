'use client';

import React, { useState } from 'react';
import { verifiedVideos, verifiedShorts, youtubeChannelUrl, YouTubeVideo } from '@/config/youtube';
import { YouTubeHeaderBanner } from '@/components/youtube-channel/YouTubeHeaderBanner';
import { YouTubeShortsSection } from '@/components/youtube-channel/YouTubeShortsSection';
import { ChannelIntelligenceModule } from '@/components/youtube-channel/ChannelIntelligenceModule';
import { YouTubeEmbed } from '@/components/media/YouTubeEmbed';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { Film, ExternalLink, Video } from 'lucide-react';

export default function YouTubeChannelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const featuredVideo = verifiedVideos[0] || verifiedVideos.find((v) => v.id === 'PzPo7wbtUB4');

  // Filtering logic
  const filteredVideos = verifiedVideos.filter((vid) => {
    const textMatch =
      !searchQuery ||
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vid.description && vid.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (vid.category && vid.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const tabMatch =
      selectedTab === 'all' ||
      (selectedTab === 'videos' && vid.type === 'video') ||
      (selectedTab === 'real-estate' && vid.category?.toLowerCase().includes('real estate')) ||
      (selectedTab === 'wealth' && vid.category?.toLowerCase().includes('wealth'));

    return textMatch && tabMatch;
  });

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. YOUTUBE CHANNEL HEADER BANNER */}
      <YouTubeHeaderBanner
        totalVideos={verifiedVideos.length}
        totalShorts={verifiedShorts.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {/* 2. FEATURED HERO VIDEO BROADCAST */}
      {featuredVideo && (
        <section id="featured-broadcast" className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">
              <Video className="w-4 h-4" />
              <span>Prezentare Video Recomandată</span>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">
              Format 4K Ultra HD
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
            <YouTubeEmbed videoId={featuredVideo.id} title={featuredVideo.title} lazy={false} />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/25 font-bold uppercase text-[10px]">
                {featuredVideo.category || "Oficial"}
              </span>
              <span>Canal Official @CristianVaduvaCV</span>
            </div>

            <h2 className="font-serif text-2xl lg:text-4xl font-extrabold text-white leading-tight">
              {featuredVideo.title}
            </h2>

            {featuredVideo.description && (
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-serif max-w-3xl">
                {featuredVideo.description}
              </p>
            )}

            <div className="pt-2 flex items-center gap-4 font-mono text-xs">
              <a
                href={featuredVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all flex items-center gap-2"
              >
                <span>Vizionează pe YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. LATEST LONG-FORM VIDEOS CATALOG GRID */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Film className="w-5 h-5 text-rose-500" />
              <span>Videoclipuri Recente ({filteredVideos.length})</span>
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Catalogul de producții video long-form de pe canalul oficial YouTube
            </p>
          </div>

          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-200 hover:text-rose-400 transition-colors uppercase font-bold bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 shrink-0"
          >
            <span>Canalul YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid: YouTubeVideo) => (
            <div
              key={vid.id}
              className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 space-y-4 flex flex-col justify-between shadow-xl group hover:border-rose-500/40 transition-all"
            >
              <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <YouTubeEmbed videoId={vid.id} title={vid.title} />
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono text-rose-400 font-bold px-2.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/25 inline-block uppercase tracking-wider">
                  {vid.category || "Video Long-Form"}
                </span>

                <h3 className="font-serif text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-rose-300 transition-colors">
                  {vid.title}
                </h3>

                {vid.description && (
                  <p className="text-xs text-neutral-400 font-serif leading-relaxed line-clamp-2">
                    {vid.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-400">
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 font-bold transition-colors flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. YOUTUBE SHORTS SECTION */}
      <YouTubeShortsSection shorts={verifiedShorts} />

      {/* 5. CHANNEL INTELLIGENCE DASHBOARD */}
      <ChannelIntelligenceModule
        totalVideos={verifiedVideos.length}
        totalShorts={verifiedShorts.length}
      />

      <DataDisclaimer type="general" />

      {/* Newsletter Subscription */}
      <NewsletterBox
        overline="AiX YouTube Media Brief"
        headline="Notificări Producții Video Noi"
        description="Abonați-vă pentru a primi primele notificări când lansăm analize video noi pe canalul YouTube."
      />
    </div>
  );
}

