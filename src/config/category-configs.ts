export type CategorySlug =
  | "news"
  | "markets"
  | "business"
  | "real-estate"
  | "investments"
  | "finance"
  | "radio"
  | "tv"
  | "podcasts"
  | "academy";

export interface MarketSignal {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface IntelligenceMetric {
  label: string;
  value: string;
  change?: string;
  subtext: string;
  isPositive?: boolean;
  source?: string;
  date?: string;
  publishedAt?: string;
  fetchedAt?: string;
  isDelayed?: boolean;
}

export interface CategoryConfig {
  slug: CategorySlug;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  marketSignals: MarketSignal[];
  intelligenceMetrics: IntelligenceMetric[];
  dashboardTitle: string;
  dashboardDescription: string;
  featuredInsightHeadline: string;
  featuredInsightExcerpt: string;
  newsletterOverline: string;
  newsletterHeadline: string;
  newsletterDescription: string;
}

export const categoryConfigs: Record<CategorySlug, CategoryConfig> = {
  "news": {
    slug: "news",
    title: "News & Macro Intelligence",
    eyebrow: "AiX Breaking Intelligence",
    headline: "Economic developments shaping CEE markets.",
    description:
      "Authoritative coverage of fiscal policy, monetary decisions, regulatory changes, and regional macroeconomic developments.",
    ctaLabel: "Explore Latest News",
    marketSignals: [
      { label: "GDP Growth (Q1)", value: "Unavailable", change: "", isPositive: true },
      { label: "Inflation Rate", value: "Unavailable", change: "", isPositive: true },
      { label: "BVB BET Index", value: "Unavailable", change: "", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Monetary Rate (BNR)", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "EUR / RON", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "FDI Inflows (YTD)", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Business Confidence", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Macroeconomic Intelligence Monitor",
    dashboardDescription: "Key economic indicators tracked by AiX Media analysts.",
    featuredInsightHeadline: "Regional Fiscal Restructuring: What Executives Must Anticipate",
    featuredInsightExcerpt: "An executive briefing on tax reforms, public infrastructure investments, and capital flow implications across Romania.",
    newsletterOverline: "AiX Executive Briefing",
    newsletterHeadline: "Daily Macro & Market Intelligence",
    newsletterDescription: "Essential news analysis delivered to decision-makers before markets open.",
  },
  "markets": {
    slug: "markets",
    title: "Capital & Commodity Markets",
    eyebrow: "AiX Markets Terminal",
    headline: "Institutional insights into stock exchanges, currencies & commodities.",
    description:
      "In-depth analysis of Bucharest Stock Exchange (BVB), CEE equity indices, European sovereign debt, and currency dynamics.",
    ctaLabel: "Open Markets Dashboard",
    marketSignals: [
      { label: "BET Index", value: "Unavailable", change: "", isPositive: true },
      { label: "EUR / RON", value: "Unavailable", change: "", isPositive: true },
      { label: "Gold (XAU)", value: "Unavailable", change: "", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "BVB Market Cap", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Daily Turnover", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "ROBOR 3M", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "10Y Sovereign Yield", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Capital Markets Metrics",
    dashboardDescription: "Indicators from the Bucharest Stock Exchange and European capital markets.",
    featuredInsightHeadline: "BVB Liquidity Evolution Following Strategic Institutional Listings",
    featuredInsightExcerpt: "How new listings and pension fund allocations are driving record liquidity on the Bucharest exchange.",
    newsletterOverline: "AiX Markets Dispatch",
    newsletterHeadline: "Weekly Capital Markets Synthesis",
    newsletterDescription: "Institutional commentary on equity valuations, bond yields, and currency flows.",
  },
  "business": {
    slug: "business",
    title: "Business & Enterprise Intelligence",
    eyebrow: "AiX Corporate & Strategy",
    headline: "Decoding corporate moves, scaling champions & strategic leadership.",
    description:
      "Exclusive founder interviews, corporate M&A analysis, tech expansion, and competitive dynamics across Romanian enterprise.",
    ctaLabel: "Read Business Stories",
    marketSignals: [
      { label: "M&A Activity (CEE)", value: "Unavailable", change: "", isPositive: true },
      { label: "Tech Exports", value: "Unavailable", change: "", isPositive: true },
      { label: "Industrial Output", value: "Unavailable", change: "", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Active Enterprise Capital", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Private Equity Deals", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Export Ratio", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Unemployment Rate", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Enterprise & Corporate Dashboard",
    dashboardDescription: "Metrics tracking business confidence, deal volumes, and corporate expansion.",
    featuredInsightHeadline: "The New Wave of Romanian Multi-Nationals Expanding in Western Europe",
    featuredInsightExcerpt: "Case studies of regional champions scaling beyond domestic borders through strategic M&A.",
    newsletterOverline: "AiX Business Insider",
    newsletterHeadline: "The Friday Strategy Brief",
    newsletterDescription: "Deep dives into executive playbooks, deal flows, and enterprise innovations.",
  },
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate Intelligence",
    eyebrow: "AiX Institutional Real Estate",
    headline: "The intelligence layer behind commercial & luxury property decisions.",
    description:
      "Rigorous analysis of office yields, industrial logistics hubs, residential capital flows, and urban infrastructure developments.",
    ctaLabel: "Explore Property Intelligence",
    marketSignals: [
      { label: "Prime Office Yield", value: "Unavailable", change: "", isPositive: true },
      { label: "Logistics Stock", value: "Unavailable", change: "", isPositive: true },
      { label: "Bucharest Avg/sqm", value: "Unavailable", change: "", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Commercial Volume YTD", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Logistics Vacancy", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Residential Yield (Avg)", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Construction Cost Index", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Real Estate Macro Dashboard",
    dashboardDescription: "Institutional property metrics, yield benchmarks, and development pipelines.",
    featuredInsightHeadline: "Why Northern Bucharest Office Hubs Are Converting to Mixed-Use Luxury",
    featuredInsightExcerpt: "An in-depth capital allocation study on urban densification and premium residential conversions.",
    newsletterOverline: "AiX Property Brief",
    newsletterHeadline: "Monthly Real Estate Intelligence",
    newsletterDescription: "Institutional analysis of yields, transactions, and urban transformations.",
  },
  "investments": {
    slug: "investments",
    title: "Investments & Wealth Strategy",
    eyebrow: "AiX Private Capital",
    headline: "Capital allocation strategies for high-net-worth investors & institutions.",
    description:
      "Analysis of venture capital, private equity, alternative asset classes, art, renewable energy funds, and family office trends.",
    ctaLabel: "Read Investment Cases",
    marketSignals: [
      { label: "PE Dry Powder", value: "Unavailable", change: "", isPositive: true },
      { label: "Renewable Pipeline", value: "Unavailable", change: "", isPositive: true },
      { label: "VC Fund Allocations", value: "Unavailable", change: "", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "HNWI Capital (RO)", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Avg VC Round (Series A)", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Agri-Tech Yields", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Luxury Asset Growth", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Private Wealth & Fund Monitor",
    dashboardDescription: "Tracking private equity capital, venture deals, and alternative investment yields.",
    featuredInsightHeadline: "Family Office Asset Allocation Trends in Central & Eastern Europe",
    featuredInsightExcerpt: "How high-net-worth investors are shifting portfolios toward real assets and tech scaleups.",
    newsletterOverline: "AiX Capital Dispatch",
    newsletterHeadline: "The Wealth & Allocation Report",
    newsletterDescription: "Curated insights into alternative assets, private debt, and equity investments.",
  },
  "finance": {
    slug: "finance",
    title: "Finance & Monetary Policy",
    eyebrow: "AiX Financial System",
    headline: "Monetary policy, banking liquidity & credit environment analysis.",
    description:
      "Authoritative coverage of central bank policies, IRCC & ROBOR benchmarks, mortgage rate dynamics, and banking system solvency.",
    ctaLabel: "Analyze Financial Sector",
    marketSignals: [
      { label: "IRCC Benchmark", value: "Unavailable", change: "", isPositive: true },
      { label: "ROBOR 3M", value: "Unavailable", change: "", isPositive: true },
      { label: "Bank Solvency Ratio", value: "Unavailable", change: "", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Non-Performing Loans", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Total Bank Assets", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Corporate Credit Growth", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Mortgage Rate Average", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Banking & Monetary Dashboard",
    dashboardDescription: "Essential liquidity indicators, interest rates, and banking sector solvency.",
    featuredInsightHeadline: "The Impact of Interest Rate Stabilization on Mortgage Liquidity",
    featuredInsightExcerpt: "Analytical evaluation of how fixed-rate bank products are influencing buyer leverage in 2026.",
    newsletterOverline: "AiX Banking Brief",
    newsletterHeadline: "Monetary & Liquidity Intelligence",
    newsletterDescription: "In-depth breakdown of Central Bank decisions and commercial credit dynamics.",
  },
  "radio": {
    slug: "radio",
    title: "AiX Business Radio",
    eyebrow: "AiX Audio Broadcast",
    headline: "Continuous business news, market commentary & executive interviews.",
    description:
      "AiX Business Audio. Featuring morning market briefings, midday executive roundtables, and evening analysis.",
    ctaLabel: "Listen Now",
    marketSignals: [
      { label: "Listeners", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Daily Shows", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Audio Quality", value: "Unavailable", change: "Data source offline", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Weekly Reach", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Morning Briefing", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Markets Closing", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Syndicated Affiliates", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "AiX Radio Studio Status",
    dashboardDescription: "Current show, programming schedule, and broadcast status.",
    featuredInsightHeadline: "Studio Interview: BVB Leadership on Foreign Capital Flows",
    featuredInsightExcerpt: "Listen to the complete unedited conversation on exchange liquidity and international investor participation.",
    newsletterOverline: "AiX Audio Digest",
    newsletterHeadline: "The Daily Radio Digest & Transcripts",
    newsletterDescription: "Key interview transcripts and highlight audio clips delivered to your inbox.",
  },
  "tv": {
    slug: "tv",
    title: "AiX Video Journalism & TV",
    eyebrow: "AiX Video Studio",
    headline: "Documentary investigations, CEO interviews & visual intelligence.",
    description:
      "HD studio productions, deep-dive documentary specials, and visual breakdowns of key macroeconomic shifts.",
    ctaLabel: "Watch Latest Broadcasts",
    marketSignals: [
      { label: "Latest Episode", value: "CEE Outlook 2026", change: "New Release", isPositive: true },
      { label: "YouTube Hub", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Video Quality", value: "Unavailable", change: "Data source offline", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Monthly Views", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Documentaries", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Avg Watch Time", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Industry Guests", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "AiX TV Media Monitor",
    dashboardDescription: "Video series performance, upcoming broadcasts, and studio releases.",
    featuredInsightHeadline: "Special Investigation: CEE Energy Infrastructure Transformation",
    featuredInsightExcerpt: "Watch our 30-minute documentary on Black Sea offshore gas developments and grid modernization.",
    newsletterOverline: "AiX Broadcast Alert",
    newsletterHeadline: "Weekly TV & Documentary Drops",
    newsletterDescription: "Get notified when new CEO interviews and investigative video reports premiere.",
  },
  "podcasts": {
    slug: "podcasts",
    title: "Executive Podcasts",
    eyebrow: "AiX Audio Intelligence",
    headline: "Conversations with market shakers and visionary founders.",
    description:
      "Long-form podcast interviews covering venture creation, macroeconomic shifts, private equity, and executive mindset.",
    ctaLabel: "Browse All Episodes",
    marketSignals: [
      { label: "Active Series", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Spotify Rating", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Downloads/Mo", value: "Unavailable", change: "Data source offline", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Total Episodes", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Avg Episode Length", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Top Show", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Distribution", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Podcast Analytics & Releases",
    dashboardDescription: "Show charts, audience demographics, and latest episode drops.",
    featuredInsightHeadline: "Episode #84: Strategic M&A Lessons from a Tech Exit",
    featuredInsightExcerpt: "A masterclass on cross-border valuation, negotiation strategy, and post-merger integration.",
    newsletterOverline: "AiX Podcast Alert",
    newsletterHeadline: "The Podcast Dispatch",
    newsletterDescription: "Receive episode summaries, key timestamped takeaways, and full transcript downloads.",
  },
  "academy": {
    slug: "academy",
    title: "Intelligence Academy",
    eyebrow: "AiX Executive Education",
    headline: "Frameworks, courses & guides for sophisticated business decisions.",
    description:
      "Curated executive courses on valuation techniques, real estate investment models, macro economics, and AI business transformations.",
    ctaLabel: "Explore Academy Courses",
    marketSignals: [
      { label: "Active Courses", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Executives Trained", value: "Unavailable", change: "Data source offline", isPositive: true },
      { label: "Completion Rate", value: "Unavailable", change: "Data source offline", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Course Rating", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Core Modules", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Certifications", value: "Unavailable", subtext: "Data source offline", isPositive: true },
      { label: "Case Studies", value: "Unavailable", subtext: "Data source offline", isPositive: true },
    ],
    dashboardTitle: "Intelligence Academy Overview",
    dashboardDescription: "Curriculum progress, enrolled executive statistics, and upcoming masterclasses.",
    featuredInsightHeadline: "Executive Masterclass: Commercial Real Estate Yield Modeling",
    featuredInsightExcerpt: "Learn how institutional funds analyze cap rates, NOI trajectories, and debt structuring in CEE.",
    newsletterOverline: "AiX Academy Brief",
    newsletterHeadline: "The Academy Learning Digest",
    newsletterDescription: "Free monthly framework guides and executive summary papers.",
  },
};
