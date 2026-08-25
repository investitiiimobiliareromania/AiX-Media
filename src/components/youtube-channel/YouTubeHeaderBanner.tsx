import React from 'react';
import { Video, Search, ExternalLink, Filter } from 'lucide-react';
import { youtubeChannelUrl } from '@/config/youtube';

interface YouTubeHeaderBannerProps {
  totalVideos: number;
  totalShorts: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTab: string;
  onTabChange: (t: string) => void;
}

export function YouTubeHeaderBanner({
  totalVideos,
  totalShorts,
  searchQuery,
  onSearchChange,
  selectedTab,
  onTabChange,
}: YouTubeHeaderBannerProps) {
  const tabs = [
    { id: 'all', label: 'Toate Videoclipurile' },
    { id: 'videos', label: 'Videoclipuri Long-Form' },
    { id: 'shorts', label: 'YouTube Shorts' },
    { id: 'real-estate', label: 'Real Estate Talks' },
    { id: 'wealth', label: 'Wealth & Assets' },
  ];

  return (
    <div className="space-y-6">
      {/* Terminal Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-rose-950/40 p-6 md:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest">
              <Video className="w-3.5 h-3.5 text-rose-500" />
              <span>Official YouTube Channel</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
                YOUTUBE CHANNEL
              </h1>
              <p className="text-lg sm:text-xl font-serif text-rose-300/90 font-medium">
                AiX Media on YouTube — Executive Talks, Real Estate &amp; Wealth Architecture.
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              Canalul oficial de video jurnalism AiX Media: analize de oportunități imobiliare de lux, negociere de active, interviuri executive și YouTube Shorts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg hover:shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Subscribe pe YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                <span>Vezi pe YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Counter Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-72 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">Long-Form Videos</div>
              <div className="text-2xl font-bold text-white">{totalVideos} Producții</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase">YouTube Shorts</div>
              <div className="text-2xl font-bold text-rose-400">{totalShorts} Episoade</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 grid grid-cols-1 md:grid-cols-12 gap-3 font-mono text-xs">
          <div className="relative md:col-span-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Caută în videoclipuri, Shorts, subiecte sau titluri..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-500 focus:border-rose-500 focus:outline-none transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>

          <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                  selectedTab === tab.id
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
