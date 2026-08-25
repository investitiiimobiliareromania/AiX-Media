'use client';

import React, { useState } from 'react';
import { getPodcastEpisodes } from '@/lib/media/service';
import { PodcastEpisode } from '@/lib/media/models/media-types';
import { PodcastHeaderBanner } from '@/components/podcasts-intelligence/PodcastHeaderBanner';
import { PodcastFeaturedHero } from '@/components/podcasts-intelligence/PodcastFeaturedHero';
import { PodcastIntelligenceModule } from '@/components/podcasts-intelligence/PodcastIntelligenceModule';
import { PodcastCard } from '@/components/media/PodcastCard';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { Mic, Headphones } from 'lucide-react';

export default function PodcastsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allEpisodes: PodcastEpisode[] = getPodcastEpisodes();
  const showsCount = Array.from(new Set(allEpisodes.map((e) => e.showName))).length;

  const featured = allEpisodes[0];

  // Filtering logic
  const filteredEpisodes = allEpisodes.filter((ep) => {
    const textMatch =
      !searchQuery ||
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.showName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.host.toLowerCase().includes(searchQuery.toLowerCase());

    const catMatch =
      selectedCategory === 'all' ||
      (selectedCategory === 'real-estate' && ep.showName.toLowerCase().includes('real estate')) ||
      (selectedCategory === 'markets' && ep.showName.toLowerCase().includes('capital')) ||
      (selectedCategory === 'policy' && ep.showName.toLowerCase().includes('monetary')) ||
      (selectedCategory === 'wealth' && ep.showName.toLowerCase().includes('wealth'));

    return textMatch && catMatch;
  });

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. PODCAST HEADER BANNER */}
      <PodcastHeaderBanner
        totalEpisodes={allEpisodes.length}
        totalShows={showsCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 2. FEATURED HERO SPOTLIGHT */}
      {featured && <PodcastFeaturedHero featuredEpisode={featured} />}

      {/* 3. COMPLETE EPISODES CATALOG GRID */}
      <section id="episodes" className="space-y-6">
        <div className="border-b border-neutral-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Mic className="w-5 h-5 text-amber-400" />
              <span>Catalog Episoade Executive ({filteredEpisodes.length})</span>
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Episoade de analiză economică, bănci, piață imobiliară și piețe de capital
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEpisodes.map((ep) => (
            <PodcastCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>

      {/* 4. PODCAST INTELLIGENCE DASHBOARD */}
      <PodcastIntelligenceModule
        totalEpisodes={allEpisodes.length}
        totalShows={showsCount}
      />

      <DataDisclaimer type="general" />

      {/* Newsletter Subscription */}
      <NewsletterBox
        overline="AiX Audio Intelligence Brief"
        headline="Notificări Episoade Noi"
        description="Abonați-vă pentru a primi primele notificări când lansăm episoade noi din emisiunile AiX Media."
      />
    </div>
  );
}

