'use client';

import React, { useState, useEffect } from 'react';
import { articleService } from '@/services/article.service';
import { Article } from '@/lib/media/models/article';
import { NewsTerminalHeaderBanner } from '@/components/news-intelligence/NewsTerminalHeaderBanner';
import { NewsTerminalFeaturedHero } from '@/components/news-intelligence/NewsTerminalFeaturedHero';
import { EditorialGrid } from '@/components/media/EditorialGrid';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadArticles() {
      const data = await articleService.getPublishedArticles();
      setArticles(data);
    }
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((art) => {
    const textMatch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch =
      selectedCategory === 'all' || art.category === selectedCategory;

    return textMatch && categoryMatch;
  });

  const featured = filteredArticles[0] || articles[0];
  const spotlight = filteredArticles.slice(1, 4);

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. NEWS TERMINAL HEADER BANNER */}
      <NewsTerminalHeaderBanner
        totalArticles={articles.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 2. FEATURED EDITORIAL STORIES HERO */}
      {featured && (
        <NewsTerminalFeaturedHero
          featuredArticle={featured}
          spotlightArticles={spotlight}
        />
      )}

      {/* 3. COMPLETE EDITORIAL NEWS GRID */}
      <div id="articles">
        <EditorialGrid
          articles={filteredArticles}
          title="Flux de Știri &amp; Rapoarte Verificate"
          description="Toate investigațiile economice, analizele de politică monetară și dinamica pieței imobiliare."
        />
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}

