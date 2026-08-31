'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { verifiedRadioStations, RadioStationItem } from '@/lib/radio-intelligence-service';
import { RadioHeaderBanner } from '@/components/radio-intelligence/RadioHeaderBanner';
import { RadioPersistentAudioPlayer } from '@/components/radio-intelligence/RadioPersistentAudioPlayer';
import { RadioIntelligenceModule } from '@/components/radio-intelligence/RadioIntelligenceModule';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { Radio, Play, Pause, ExternalLink } from 'lucide-react';

export default function RadioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeStation, setActiveStation] = useState<RadioStationItem | null>(verifiedRadioStations[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter stations
  const filteredStations = verifiedRadioStations.filter((st) => {
    const textMatch =
      !searchQuery ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.frequency.toLowerCase().includes(searchQuery.toLowerCase());

    const catMatch =
      selectedCategory === 'all' ||
      (selectedCategory === 'business' && st.category === 'Business & News') ||
      (selectedCategory === 'macro' && st.category === 'Macro & Policy') ||
      (selectedCategory === 'markets' && st.category === 'Markets & Economy') ||
      (selectedCategory === 'culture' && st.category === 'Culture & Tech');

    return textMatch && catMatch;
  });

  const handleSelectStation = (st: RadioStationItem) => {
    if (activeStation?.id === st.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveStation(st);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-12 pb-32 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. RADIO HEADER BANNER */}
      <RadioHeaderBanner
        totalStations={verifiedRadioStations.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 2. LIVE STATIONS DIRECTORY GRID */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Radio className="w-5 h-5 text-amber-400" />
              <span>Director Stații Radio Live ({filteredStations.length})</span>
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Selectează un post de radio pentru a asculta transmisiunea live în playerul persistent.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((st) => {
            const isCurrent = activeStation?.id === st.id;
            const isThisPlaying = isCurrent && isPlaying;

            return (
              <div
                key={st.id}
                className={`p-6 rounded-3xl bg-neutral-900 border transition-all space-y-4 shadow-xl flex flex-col justify-between group ${
                  isCurrent ? 'border-amber-500/80 bg-neutral-900/95' : 'border-neutral-800 hover:border-amber-500/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[10px] font-mono font-bold uppercase">
                      {st.category}
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shrink-0">
                      <Image
                        src={st.logo}
                        alt={st.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {st.name}
                      </h3>
                      <div className="text-xs font-mono text-neutral-400 mt-0.5">
                        {st.frequency} • {st.city}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-2">
                    {st.description}
                  </p>

                  {st.currentShow && (
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono space-y-0.5">
                      <div className="text-[10px] text-neutral-400 uppercase">Emisiune Live:</div>
                      <div className="text-amber-400 font-bold">{st.currentShow}</div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-xs">
                  <button
                    onClick={() => handleSelectStation(st)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isThisPlaying
                        ? 'bg-rose-600 text-white shadow-lg'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                    }`}
                  >
                    {isThisPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pauză Live</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        <span>Ascultă Live</span>
                      </>
                    )}
                  </button>

                  <a
                    href={st.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. RADIO INTELLIGENCE DASHBOARD */}
      <RadioIntelligenceModule totalStations={verifiedRadioStations.length} />

      <DataDisclaimer type="general" />

      {/* Persistent Audio Player */}
      <RadioPersistentAudioPlayer
        currentStation={activeStation}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      />

      <NewsletterBox
        overline="AiX Radio Brief"
        headline="Notificări Emisiuni Economice Live"
        description="Abonați-vă pentru a primi notificările emisiunilor economice."
      />
    </div>
  );
}
