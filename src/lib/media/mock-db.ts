import { Article } from "./models/article";
import {
  Author,
  RadioShow,
  VideoItem,
  MarketItem,
  Company,
  EconomicEvent,
  AiXBriefing,
} from "./models/media-types";
import { verifiedNewsArticles } from "../news-service";

export const authors: Author[] = [
  {
    id: "aix-editorial",
    slug: "aix-editorial",
    name: "AiX Media Editorial Desk",
    role: "AiX Media Editorial Desk",
    bio: "Redacția de analiză economică, piețe financiare și date imobiliare a rețelei AiX Media.",
    avatar: "/fallbacks/fallback-0.jpg",
    expertise: ["Macroeconomie", "Piețe de Capital", "Statistici Imobiliare", "Politică Monetară"],
    linkedin: "https://linkedin.com/company/aixmedia",
  },
  {
    id: "cristian-vaduva",
    slug: "cristian-vaduva",
    name: "Cristian Văduva",
    role: "Fondator AiX Media",
    bio: "Fondator AiX Media și realizator al analizelor de piață și emisiunilor video despre piața imobiliară și investiții.",
    avatar: "/fallbacks/fallback-1.jpg",
    expertise: ["Analiză Economică", "Strategie de Business", "Piețe Imobiliare"],
    linkedin: "https://linkedin.com/company/aixmedia",
  },
];

import { getFallbackImage } from "../fallbackImage";
import { isValidImageUrl } from "../image-validator";
import { normalizeArticleString } from "../article-normalizer";
import { normalizeTitle } from "../html-entities";
import { cleanText } from "../sanitizer";

export const articles: Article[] = verifiedNewsArticles.map((art) => ({
  id: art.id,
  title: normalizeTitle(art.title),
  slug: art.slug,
  category: art.category,
  categoryLabel: art.categoryLabel,
  authorId: "aix-editorial",
  authorName: "AiX Media Editorial Desk",
  authorRole: "Redacția Economică",
  authorAvatar: "/fallbacks/fallback-0.jpg",
  excerpt: cleanText(art.excerpt),
  content: normalizeArticleString(art.content),
  coverImage: (art.image && isValidImageUrl(art.image)) ? art.image : getFallbackImage(art.slug),
  publishedAt: art.publishedAt,
  readTime: art.readTime || "5 min read",
  views: 1200,
  featured: art.featured || false,
  trending: art.trending || false,
}));

export const marketItems: MarketItem[] = [];

export const radioShows: RadioShow[] = [
  {
    id: "show-1",
    title: "Sinteza Piețelor Financiare & BNR",
    host: "AiX Media Editorial Desk",
    airTime: "Luni - Vineri • 08:30 - 09:30",
    status: "SCHEDULED",
    description: "Sinteza cotațiilor oficiale de referință ale BNR, indicatorii monetari ROBOR/IRCC și noutățile de la Bursa de Valori București.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop",
    category: "Piețe Financiare",
  },
  {
    id: "show-2",
    title: "Dezbateri Economice & Business Talk",
    host: "Cristian Văduva",
    airTime: "Marți & Joi • 14:00 - 15:00",
    status: "UPCOMING",
    description: "Interviuri cu antreprenori și manageri de top din economia românească despre investiții, M&A și expansiune regională.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
    category: "Business Talk",
  },
  {
    id: "show-3",
    title: "Forumul Imobiliar & Construcții",
    host: "AiX Media Editorial Desk",
    airTime: "Miercuri • 16:00 - 17:00",
    status: "UPCOMING",
    description: "Analiza datelor oficiale ANCPI privind volumul tranzacțiilor imobiliare și statisticile INS din sectorul construcțiilor.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    category: "Statistici Imobiliare",
  },
];

import { verifiedVideos } from "@/config/youtube";

export const tvVideos: VideoItem[] = verifiedVideos.map((v) => ({
  id: v.id,
  title: v.title,
  slug: v.slug || v.id,
  youtubeId: v.id,
  duration: v.duration || "0:30",
  publishedAt: v.publishedAt || "2026-08-08",
  category: v.category?.toLowerCase().includes("property") || v.category?.toLowerCase().includes("penthouse") || v.category?.toLowerCase().includes("residence") || v.title?.toLowerCase().includes("vila") || v.title?.toLowerCase().includes("terasă")
    ? "PROPERTY VIDEO"
    : "CRISTIAN VĂDUVA — VIDEO",
  playlistName: "AiX Video Channel",
  description: v.description || v.title,
  thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
}));

import { bvbCompanies } from "../bvb-data";
export const companies: Company[] = bvbCompanies;

export const economicEvents: EconomicEvent[] = [
  {
    id: "ev-1",
    title: "Ședința de Politică Monetară BNR",
    date: "2026-08-08",
    time: "15:00 EEST",
    country: "RO",
    importance: "HIGH",
    actual: "6.50%",
    forecast: "6.50%",
    previous: "6.50%",
    category: "central-bank",
  },
  {
    id: "ev-2",
    title: "Publicarea Indicelui Prețurilor de Consum (INS)",
    date: "2026-08-12",
    time: "09:00 EEST",
    country: "RO",
    importance: "HIGH",
    forecast: "5.1%",
    previous: "5.4%",
    category: "macro",
  },
  {
    id: "ev-3",
    title: "Raportul Statistic Lunar ANCPI Tranzacții",
    date: "2026-08-18",
    time: "10:00 EEST",
    country: "RO",
    importance: "HIGH",
    category: "macro",
  },
];

export const aixBriefings: AiXBriefing[] = [
  {
    id: "brief-1",
    type: "morning",
    title: "Sinteza Macro & Financiară AiX Media",
    date: "2026-08-17",
    whatChanged: [
      "BNR a publicat cotațiile oficiale zilnice pentru principalele valute internaționale.",
      "ANCPI a actualizat evidența tranzacțiilor imobiliare la nivel național.",
      "INS a raportat indicatorii privind dinamica autorizațiilor de construire.",
    ],
    whyItMatters: [
      "Stabilitatea cursului EUR/RON oferă predictibilitate tranzacțiilor economice majore.",
      "Datele ANCPI confirmă volumele reale înregistrate oficial în cărțile funciare.",
      "Indicatorii din construcții reflectă proiectele rezidențiale autorizate pe termen mediu.",
    ],
    marketRecap: "Informațiile sunt sintetizate din comunicatele oficiale ale BNR, ANCPI și INS.",
  },
];
