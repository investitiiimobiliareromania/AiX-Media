export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  twitter?: string;
  linkedin?: string;
}

export interface PodcastChapter {
  time: string;
  title: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  slug: string;
  showName: string;
  episodeNumber: number;
  duration: string;
  publishedAt: string;
  audioUrl: string;
  coverImage: string;
  description: string;
  host: string;
  guest?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  transcript?: string;
  chapters?: PodcastChapter[];
  keyQuote?: string;
}

export interface RadioShow {
  id: string;
  title: string;
  host: string;
  airTime: string;
  status: "LIVE" | "UPCOMING" | "REPLAY";
  description: string;
  audioStreamUrl: string;
  coverImage: string;
  category: "Markets Morning" | "CEO Talk" | "Founders" | "Macro Weekly" | "Property Intelligence" | "Investment Brief";
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  youtubeId: string;
  duration: string;
  publishedAt: string;
  category: "Documentary" | "Investigations" | "CEO Interviews" | "Studio" | "Short Clips";
  playlistName?: string;
  description: string;
  thumbnailUrl: string;
}

export interface MarketItem {
  symbol: string;
  name: string;
  value: string;
  changeDaily: string;
  changeWeekly?: string;
  changeMonthly?: string;
  changeYearly?: string;
  isPositive: boolean;
  category: "indices" | "currencies" | "commodities" | "rates" | "crypto" | "global" | "bonds";
  status: "OPEN" | "CLOSED";
  chartPoints?: number[];
}

export interface Company {
  id: string;
  slug: string;
  symbol: string;
  name: string;
  sector: string;
  logo: string;
  marketCap: string;
  stockPrice: string;
  priceChange: string;
  isPositive: boolean;
  ceo: string;
  headquarters: string;
  description: string;
  revenue: string;
  netIncome: string;
  peRatio: string;
  dividendYield: string;
  timeline: { year: string; event: string }[];
}

export interface EconomicEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  country: string;
  importance: "HIGH" | "MEDIUM" | "LOW";
  actual?: string;
  forecast?: string;
  previous?: string;
  category: "central-bank" | "macro" | "earnings" | "dividends" | "ipo";
}

export interface AiXBriefing {
  id: string;
  type: "morning" | "evening";
  title: string;
  date: string;
  whatChanged: string[];
  whyItMatters: string[];
  marketRecap: string;
}
