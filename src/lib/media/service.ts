import {
  articles,
  radioShows,
  podcastEpisodes,
  tvVideos,
  marketItems,
  authors,
  companies,
  economicEvents,
  aixBriefings,
} from "./mock-db";
import { Article } from "./models/article";
import {
  RadioShow,
  PodcastEpisode,
  VideoItem,
  MarketItem,
  Author,
  Company,
  EconomicEvent,
  AiXBriefing,
} from "./models/media-types";

export function getAllArticles(categorySlug?: string): Article[] {
  if (!categorySlug) return articles;
  return articles.filter((art) => art.category === categorySlug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((art) => art.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((art) => art.featured);
}

export function getBreakingArticles(): Article[] {
  return articles.filter((art) => art.breaking);
}

export function getRadioShows(): RadioShow[] {
  return radioShows;
}

export function getLiveRadioShow(): RadioShow {
  return radioShows.find((show) => show.status === "LIVE") || radioShows[0]!;
}

export function getPodcastEpisodes(): PodcastEpisode[] {
  return podcastEpisodes;
}

export function getPodcastBySlug(slug: string): PodcastEpisode | undefined {
  return podcastEpisodes.find((pod) => pod.slug === slug);
}

export function getTvVideos(): VideoItem[] {
  return tvVideos;
}

export function getTvVideoBySlug(slug: string): VideoItem | undefined {
  return tvVideos.find((vid) => vid.slug === slug);
}

export function getMarketItems(category?: string): MarketItem[] {
  if (!category) return marketItems;
  return marketItems.filter((m) => m.category === category);
}

export function getAllAuthors(): Author[] {
  return authors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((auth) => auth.slug === slug || auth.id === slug);
}

export function getAllCompanies(): Company[] {
  return companies;
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug || c.symbol.toLowerCase() === slug.toLowerCase());
}

export function getEconomicEvents(): EconomicEvent[] {
  return economicEvents;
}

export function getLatestBriefing(): AiXBriefing {
  return aixBriefings[0]!;
}
