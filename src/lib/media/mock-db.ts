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
    title: "Publicarea Indicelui IRCC Trimestrul IV 2026",
    date: "2026-10-01",
    time: "09:00 EEST",
    country: "RO",
    importance: "HIGH",
    actual: "5.86%",
    forecast: "5.86%",
    previous: "5.86%",
    category: "central-bank",
  },
  {
    id: "ev-2",
    title: "Ședința de Politică Monetară BNR",
    date: "2026-10-04",
    time: "15:00 EEST",
    country: "RO",
    importance: "HIGH",
    actual: "6.50%",
    forecast: "6.50%",
    previous: "6.50%",
    category: "central-bank",
  },
  {
    id: "ev-3",
    title: "Balanța Comercială & Comerțul Internațional (INS)",
    date: "2026-10-09",
    time: "09:00 EEST",
    country: "RO",
    importance: "MEDIUM",
    forecast: "-2.8 Mld EUR",
    previous: "-2.9 Mld EUR",
    category: "macro",
  },
  {
    id: "ev-4",
    title: "Publicarea Indicelui Prețurilor de Consum & Inflația (INS)",
    date: "2026-10-11",
    time: "09:00 EEST",
    country: "RO",
    importance: "HIGH",
    forecast: "5.0%",
    previous: "5.1%",
    category: "macro",
  },
  {
    id: "ev-5",
    title: "Cifra de Afaceri în Industrie și Producție (INS)",
    date: "2026-10-14",
    time: "09:00 EEST",
    country: "RO",
    importance: "MEDIUM",
    forecast: "+2.1%",
    previous: "+1.9%",
    category: "macro",
  },
  {
    id: "ev-6",
    title: "Raportul Statistic Lunar ANCPI Tranzacții",
    date: "2026-10-16",
    time: "10:00 EEST",
    country: "RO",
    importance: "HIGH",
    forecast: "51.500",
    previous: "52.430",
    category: "macro",
  },
  {
    id: "ev-7",
    title: "Decizia de Politică Monetară BCE (Zona Euro)",
    date: "2026-10-17",
    time: "15:15 EEST",
    country: "EU",
    importance: "HIGH",
    forecast: "3.25%",
    previous: "3.50%",
    category: "central-bank",
  },
  {
    id: "ev-8",
    title: "Autorizații de Construire pentru Clădiri Rezidențiale (INS)",
    date: "2026-10-29",
    time: "09:00 EEST",
    country: "RO",
    importance: "HIGH",
    forecast: "3.200",
    previous: "3.280",
    category: "macro",
  },
];

export const aixBriefings: AiXBriefing[] = [
  {
    id: "brief-1",
    type: "morning",
    title: "Sinteza Macro & Financiară AiX Media",
    date: "2026-10-06",
    whatChanged: [
      "BNR a comunicat indicatorii monetari oficiali și menținerea ratei de politică monetară la 6,50%.",
      "ANCPI a centralizat volumul tranzacțiilor imobiliare la 52.430 de imobile în cel mai recent raport oficial.",
      "BVB înregistrează stabilitatea indicelui BET peste pragul de 18.600 de puncte în debutul trimestrului IV.",
    ],
    whyItMatters: [
      "Predictibilitatea dobânzilor BNR stabilizează costurile ratelor la creditele legate de IRCC.",
      "Datele cadastrale ANCPI confirmă reziliența marilor poli rezidențiali (București, Ilfov, Cluj, Brașov).",
      "Rezultatele financiare semestriale solide ale companiilor listate consolidează capitalizarea bursieră.",
    ],
    marketRecap: "Informațiile sunt sintetizate din comunicatele oficiale ale BNR, ANCPI, INS și BVB.",
  },
];
