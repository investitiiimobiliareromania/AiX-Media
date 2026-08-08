import { Article } from "./models/article";
import {
  Author,
  PodcastEpisode,
  RadioShow,
  VideoItem,
  MarketItem,
  Company,
  EconomicEvent,
  AiXBriefing,
} from "./models/media-types";

export const authors: Author[] = [
  {
    id: "cristian-vaduva",
    slug: "cristian-vaduva",
    name: "Cristian Văduva",
    role: "Editor-in-Chief & Founder",
    bio: "Economic analyst and media executive specializing in Central & Eastern European capital dynamics, monetary policy, and private equity.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    expertise: ["Macroeconomics", "Capital Markets", "Private Equity", "CEE Policy"],
    twitter: "@aixmedia",
    linkedin: "https://linkedin.com/in/aixmedia",
  },
  {
    id: "aix-editorial",
    slug: "aix-editorial",
    name: "AiX Media Editorial Desk",
    role: "Editorial Desk",
    bio: "Official editorial team for AiX Media content.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    expertise: [],
    twitter: "@aixmedia",
    linkedin: "https://linkedin.com/company/aixmedia",
  },
];

export const articles: Article[] = [
  {
    id: "art-1",
    title: "Romania's Economic Horizon 2026: Capital Allocation & Macro Realities",
    slug: "romania-economic-horizon-2026-capital-allocation",
    category: "news",
    categoryLabel: "Macro Intelligence",
    authorId: "cristian-vaduva",
    authorName: "Cristian Văduva",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    excerpt: "An executive briefing on Romania's macro trajectory, fiscal consolidation, and how CEE capital flows are adapting to evolving European monetary policy.",
    content: `
# Romania's Economic Horizon 2026

As Central and Eastern Europe navigates a complex macroeconomic environment, Romania stands at a strategic inflection point. Sustained FDI inflows, public infrastructure expansion funded by EU recovery funds, and steady domestic consumption are driving resilience across key sectors.

## Key Macro Pillars

1. **Monetary Rate Trajectory**: BNR's cautious stance has stabilized EUR/RON exchange rates while keeping inflation on a downward slope toward 5%.
2. **Capital Markets Growth**: The Bucharest Stock Exchange (BVB) continues to attract record institutional participation following high-profile listings.
3. **Infrastructure Supercycle**: Major highway, logistics, and renewable energy developments are reducing transport bottlenecks and unlocking regional economic hubs.

> "Institutional investors are looking past short-term volatility toward CEE's long-term yield advantage and infrastructure convergence." — *AiX Research*
    `,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-08-05",
    readTime: "6 min read",
    views: 18400,
    featured: true,
    breaking: true,
    trending: true,
  },
  {
    id: "art-2",
    title: "Why Northern Bucharest Real Estate Continues to Attract Institutional Capital",
    slug: "northern-bucharest-real-estate-capital-flows",
    category: "real-estate",
    categoryLabel: "Real Estate Intelligence",
    authorId: "aix-editorial",
    authorName: "AiX Media Editorial Desk",
    authorRole: "Editorial Desk",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    excerpt: "Institutional transaction analysis examining office conversions, mixed-use luxury developments, and prime yields in Bucharest's growth corridor.",
    content: `
# Northern Bucharest Property Dynamics

Northern Bucharest remains the engine of high-end real estate transactions in Romania. Driven by corporate headquarters demand and high-net-worth buyers, prime developers are pioneering mixed-use urban transformations.

## Market Metrics

- **Prime Office Yields**: 7.25%
- **Luxury Residential Price Growth**: +6.8% YoY
- **Logistics Vacancy**: 4.8%
    `,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-08-04",
    readTime: "5 min read",
    views: 11200,
    featured: true,
    trending: true,
  },
  {
    id: "art-3",
    title: "BVB Market Liquidity: Institutional Pension Allocation & Equity Expansion",
    slug: "bvb-market-liquidity-pension-allocation",
    category: "markets",
    categoryLabel: "Capital Markets",
    authorId: "cristian-vaduva",
    authorName: "Cristian Văduva",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    excerpt: "How Pillar II pension funds and international institutional buyers are driving liquidity records on the Bucharest Stock Exchange.",
    content: "Detailed breakdown of stock performance, valuation ratios, and international capital flows...",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-08-03",
    readTime: "7 min read",
    views: 9400,
    featured: true,
  },
  {
    id: "art-4",
    title: "Venture & Private Equity Trends in CEE: Where Capital is Flowing",
    slug: "venture-private-equity-trends-cee",
    category: "investments",
    categoryLabel: "Investments & Wealth",
    authorId: "cristian-vaduva",
    authorName: "Cristian Văduva",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    excerpt: "Private capital allocation analysis across fintech, green energy tech, and regional enterprise software scaleups.",
    content: "Analysis of venture rounds and private equity dry powder across CEE...",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-08-02",
    readTime: "4 min read",
    views: 7300,
  },
  {
    id: "art-5",
    title: "Mortgage Market Shifts: How Interest Rate Stabilization Influences Buyer Behavior",
    slug: "mortgage-market-shifts-interest-rate-stabilization",
    category: "finance",
    categoryLabel: "Finance & Monetary Policy",
    authorId: "cristian-vaduva",
    authorName: "Cristian Văduva",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    excerpt: "An analytical study of fixed-rate banking products, IRCC trajectories, and debt service ratios among Romanian homebuyers.",
    content: "Macro analysis of mortgage interest rates, banking solvency, and buyer sentiment...",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-08-01",
    readTime: "5 min read",
    views: 8100,
  },
  {
    id: "art-6",
    title: "Romanian Enterprise Champions Scaling Regionally: The M&A Playbook",
    slug: "romanian-enterprise-champions-scaling-regionally",
    category: "business",
    categoryLabel: "Business & Enterprise",
    authorId: "cristian-vaduva",
    authorName: "Cristian Văduva",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    excerpt: "Case studies of top Romanian tech, logistics, and retail groups acquiring assets in Poland, Hungary, and Germany.",
    content: "Strategy teardown of regional acquisitions...",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-07-31",
    readTime: "6 min read",
    views: 6500,
  },
];

export const marketItems: MarketItem[] = [];

export const radioShows: RadioShow[] = [
  {
    id: "show-1",
    title: "Markets Morning Briefing",
    host: "Cristian Văduva",
    airTime: "07:30 AM - 09:00 AM",
    status: "SCHEDULED",
    description: "Pre-market insights, global currency wrap, macroeconomic signals, and executive commentary before European trading opens.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop",
    category: "Markets Morning",
  },
  {
    id: "show-2",
    title: "CEO Talk: CEE Leadership Series",
    host: "Cristian Văduva",
    airTime: "10:30 AM - 11:30 AM",
    status: "UPCOMING",
    description: "In-depth conversations with founders, CEOs, and managing partners on strategy, M&A, and market expansion.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
    category: "CEO Talk",
  },
  {
    id: "show-3",
    title: "The Midday Property & Infrastructure Forum",
    host: "AiX Media",
    airTime: "12:30 PM - 01:30 PM",
    status: "UPCOMING",
    description: "Commercial real estate yield updates, logistics stock reports, and urban development analysis.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    category: "Property Intelligence",
  },
  {
    id: "show-4",
    title: "Macro Weekly & Closing Bell Wrap",
    host: "AiX Media",
    airTime: "05:30 PM - 07:00 PM",
    status: "REPLAY",
    description: "BVB closing Bell report, ROBOR trajectory, bond yields, and Wall Street opening commentary.",
    audioStreamUrl: "https://stream.aixmedia.ro/live.mp3",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    category: "Macro Weekly",
  },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "pod-1",
    title: "Building Regional Champions: Strategic M&A and Capital Growth",
    slug: "building-regional-champions-strategic-ma",
    showName: "The CEO Playbook",
    episodeNumber: 84,
    duration: "54 min",
    publishedAt: "2026-08-04",
    audioUrl: "https://media.aixmedia.ro/podcasts/ep84.mp3",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    description: "A conversation with leading CEE founders on expanding enterprise software companies across European markets.",
    host: "AiX Media",
    guest: "AiX Media",
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com",
    keyQuote: "Cross-border M&A requires cultural integration just as much as financial synergy.",
    chapters: [
      { time: "00:00", title: "Introduction & Market Context" },
      { time: "12:15", title: "Cross-Border Valuation Multiples" },
      { time: "28:40", title: "Post-Merger Integration Playbook" },
      { time: "45:10", title: "Future Outlook for CEE Scaleups" },
    ],
    transcript: "Full transcript available for subscribers. In this episode we explore...",
  },
  {
    id: "pod-2",
    title: "Institutional Real Estate Allocation & Yield Dynamics in CEE",
    slug: "institutional-real-estate-allocation-yield-dynamics",
    showName: "Real Estate Intelligence Podcast",
    episodeNumber: 42,
    duration: "48 min",
    publishedAt: "2026-08-01",
    audioUrl: "https://media.aixmedia.ro/podcasts/ep42.mp3",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    description: "How international funds structure cap rates, debt financing, and logistics hub investments.",
    host: "AiX Media",
    guest: "AiX Media",
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com",
    keyQuote: "Bucharest prime office yields at 7.25% present a compelling risk-adjusted premium over Western European capitals.",
  },
  {
    id: "pod-3",
    title: "Macroeconomic Policy & Inflation Targets: Central Bank Insights",
    slug: "macroeconomic-policy-inflation-targets",
    showName: "Macro Signals",
    episodeNumber: 29,
    duration: "62 min",
    publishedAt: "2026-07-25",
    audioUrl: "https://media.aixmedia.ro/podcasts/ep29.mp3",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
    description: "Analyzing central bank rate decisions, liquidity buffers, and macroeconomic forecasts for 2026-2027.",
    host: "AiX Media",
    guest: "AiX Media",
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com",
  },
];

export const tvVideos: VideoItem[] = [
  {
    id: "vid-1",
    title: "Documentary Special: The Transformation of CEE Energy Infrastructure",
    slug: "cee-energy-infrastructure-transformation",
    youtubeId: "dQw4w9WgXcQ",
    duration: "28:15",
    publishedAt: "2026-08-04",
    category: "Documentary",
    playlistName: "AiX Investigations",
    description: "An investigative visual report on offshore gas, solar grid integration, and CEE energy independence.",
    thumbnailUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "vid-2",
    title: "Studio Interview: BVB Leadership on Foreign Institutional Flows",
    slug: "bvb-leadership-foreign-institutional-flows",
    youtubeId: "dQw4w9WgXcQ",
    duration: "18:40",
    publishedAt: "2026-07-30",
    category: "CEO Interviews",
    playlistName: "CEO Studio Series",
    description: "Exclusive studio talk discussing exchange liquidity, pension fund rules, and new tech listings.",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "vid-3",
    title: "Inside Bucharest's Commercial Hubs: A Visual Architecture Report",
    slug: "inside-bucharests-commercial-hubs",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:10",
    publishedAt: "2026-07-25",
    category: "Investigations",
    playlistName: "Urban Transformations",
    description: "On-site video exploration of award-winning mixed-use developments in Northern Bucharest.",
    thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
  },
];

import { bvbCompanies } from "../bvb-data";
export const companies: Company[] = bvbCompanies;

export const economicEvents: EconomicEvent[] = [
  {
    id: "ev-1",
    title: "BNR Monetary Policy Interest Rate Decision",
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
    title: "Romania CPI Inflation Rate (YoY)",
    date: "2026-08-12",
    time: "09:00 EEST",
    country: "RO",
    importance: "HIGH",
    forecast: "5.1%",
    previous: "5.5%",
    category: "macro",
  },
  {
    id: "ev-3",
    title: "ECB Governing Council Interest Rate Meeting",
    date: "2026-09-10",
    time: "15:15 CEST",
    country: "EU",
    importance: "HIGH",
    forecast: "3.25%",
    previous: "3.50%",
    category: "central-bank",
  },
  {
    id: "ev-4",
    title: "Banca Transilvania Q2 Financial Release & Dividend ex-Date",
    date: "2026-08-25",
    time: "08:30 EEST",
    country: "RO",
    importance: "MEDIUM",
    category: "dividends",
  },
];

export const aixBriefings: AiXBriefing[] = [
  {
    id: "brief-1",
    type: "morning",
    title: "AiX Morning Intelligence Briefing: August 5, 2026",
    date: "2026-08-05",
    whatChanged: [
      "BVB BET index posted a gain driven by energy listings.",
      "ROBOR 3M dropped, signaling further interbank rate stabilization.",
      "FDI figures released by BNR show a year-on-year increase in private capital deployment.",
    ],
    whyItMatters: [
      "Equities are outperforming CEE regional peers, attracting increased Western European institutional flows.",
      "Falling interbank rates ease debt service burdens for corporate borrowers and mortgage holders.",
      "Long-term FDI confidence validates Romania's infrastructure and renewable energy convergence trajectory.",
    ],
    marketRecap: "Markets opened bullish across BVB indices. EUR/RON remains stable.",
  },
];
