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
    headline: "Real-time economic developments shaping CEE markets.",
    description:
      "Authoritative coverage of fiscal policy, monetary decisions, regulatory changes, and regional macroeconomic developments.",
    ctaLabel: "Explore Latest News",
    marketSignals: [
      { label: "GDP Growth (Q1)", value: "+2.4%", change: "+0.3%", isPositive: true },
      { label: "Inflation Rate", value: "5.1%", change: "-0.4%", isPositive: true },
      { label: "BVB BET Index", value: "18,420 pts", change: "+1.2%", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Monetary Rate (BNR)", value: "6.50%", subtext: "Target unchanged Q3", isPositive: true },
      { label: "EUR / RON", value: "4.9765", subtext: "Managed float stability", isPositive: true },
      { label: "FDI Inflows (YTD)", value: "€3.4B", subtext: "+14% YoY growth", isPositive: true },
      { label: "Business Confidence", value: "108.2", subtext: "Expansionary zone", isPositive: true },
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
      { label: "BET Index", value: "18,420.5", change: "+2.3%", isPositive: true },
      { label: "EUR / RON", value: "4.9765", change: "+0.02%", isPositive: true },
      { label: "Gold (XAU)", value: "$2,348", change: "+0.6%", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "BVB Market Cap", value: "€64.2B", subtext: "+18.2% YTD", isPositive: true },
      { label: "Daily Turnover", value: "€28.5M", subtext: "Institutional liquidity peak", isPositive: true },
      { label: "ROBOR 3M", value: "5.58%", subtext: "Easing trend", isPositive: true },
      { label: "10Y Sovereign Yield", value: "6.42%", subtext: "Stable spread vs Bunds", isPositive: true },
    ],
    dashboardTitle: "Capital Markets Live Metrics",
    dashboardDescription: "Real-time indicators from the Bucharest Stock Exchange and European capital markets.",
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
      { label: "M&A Activity (CEE)", value: "€1.8B", change: "+12%", isPositive: true },
      { label: "Tech Exports", value: "€7.2B", change: "+15%", isPositive: true },
      { label: "Industrial Output", value: "+1.8%", change: "+0.5%", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Active Enterprise Capital", value: "€142B", subtext: "Top 500 Romanian firms", isPositive: true },
      { label: "Private Equity Deals", value: "42 YTD", subtext: "Focus on tech & logistics", isPositive: true },
      { label: "Export Ratio", value: "32.4%", subtext: "EU market integration", isPositive: true },
      { label: "Unemployment Rate", value: "5.3%", subtext: "Tight skilled labor market", isPositive: true },
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
      { label: "Prime Office Yield", value: "7.25%", change: "Stable", isPositive: true },
      { label: "Logistics Stock", value: "7.1M sqm", change: "+8% YoY", isPositive: true },
      { label: "Bucharest Avg/sqm", value: "€1,740", change: "+4.1%", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Commercial Volume YTD", value: "€580M", subtext: "Driven by retail & industrial", isPositive: true },
      { label: "Logistics Vacancy", value: "4.8%", subtext: "Near historical lows", isPositive: true },
      { label: "Residential Yield (Avg)", value: "6.4%", subtext: "Bucharest prime sectors", isPositive: true },
      { label: "Construction Cost Index", value: "+2.1%", subtext: "Stabilizing material inputs", isPositive: true },
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
      { label: "PE Dry Powder", value: "€1.2B", change: "+14%", isPositive: true },
      { label: "Renewable Pipeline", value: "4.2 GW", change: "+22%", isPositive: true },
      { label: "VC Fund Allocations", value: "€140M", change: "+8%", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "HNWI Capital (RO)", value: "€38B", subtext: "Estimated private wealth pool", isPositive: true },
      { label: "Avg VC Round (Series A)", value: "€3.5M", subtext: "Regional benchmarking", isPositive: true },
      { label: "Agri-Tech Yields", value: "11.4%", subtext: "Institutional farmland funds", isPositive: true },
      { label: "Luxury Asset Growth", value: "+9.2%", subtext: "Watches, fine art, rare autos", isPositive: true },
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
      { label: "IRCC Benchmark", value: "5.86%", change: "-0.11%", isPositive: true },
      { label: "ROBOR 3M", value: "5.58%", change: "-0.05%", isPositive: true },
      { label: "Bank Solvency Ratio", value: "22.4%", change: "Robust", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Non-Performing Loans", value: "2.4%", subtext: "Historical low for Romania", isPositive: true },
      { label: "Total Bank Assets", value: "€168B", subtext: "+11% YoY growth", isPositive: true },
      { label: "Corporate Credit Growth", value: "+7.8%", subtext: "Sustained investment demand", isPositive: true },
      { label: "Mortgage Rate Average", value: "5.9%", subtext: "Fixed-rate preference 78%", isPositive: true },
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
    eyebrow: "AiX Live Audio",
    headline: "Continuous business news, market commentary & executive interviews.",
    description:
      "Broadcasted live to decision-makers. Featuring morning market briefings, midday executive roundtables, and evening analysis.",
    ctaLabel: "Listen Live Now",
    marketSignals: [
      { label: "Live Listeners", value: "14.2k", change: "Broadcasting", isPositive: true },
      { label: "Daily Shows", value: "8 Shows", change: "Live Schedule", isPositive: true },
      { label: "Audio Quality", value: "320kbps HD", change: "Lossless", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Weekly Reach", value: "185k", subtext: "Active C-level listeners", isPositive: true },
      { label: "Morning Briefing", value: "07:30 AM", subtext: "Pre-market opening show", isPositive: true },
      { label: "Markets Closing", value: "17:30 PM", subtext: "BVB & Wall Street wrap", isPositive: true },
      { label: "Syndicated Affiliates", value: "12 Stations", subtext: "National coverage", isPositive: true },
    ],
    dashboardTitle: "AiX Radio Live Studio Status",
    dashboardDescription: "Current show, programming schedule, and live broadcast metrics.",
    featuredInsightHeadline: "Live Studio Interview: BVB Leadership on Foreign Capital Flows",
    featuredInsightExcerpt: "Listen to the complete unedited conversation on exchange liquidity and international investor participation.",
    newsletterOverline: "AiX Audio Digest",
    newsletterHeadline: "The Daily Radio Digest & Transcripts",
    newsletterDescription: "Key interview transcripts and highlight audio clips delivered to your inbox.",
  },
  "tv": {
    slug: "tv",
    title: "AiX Video Journalism & TV",
    eyebrow: "AiX Broadcast Studio",
    headline: "Documentary investigations, CEO interviews & visual intelligence.",
    description:
      "HD studio productions, deep-dive documentary specials, and visual breakdowns of key macroeconomic shifts.",
    ctaLabel: "Watch Latest Broadcasts",
    marketSignals: [
      { label: "Latest Episode", value: "CEE Outlook 2026", change: "New Release", isPositive: true },
      { label: "YouTube Hub", value: "48k Subs", change: "+15% MoM", isPositive: true },
      { label: "Video Quality", value: "4K Ultra HD", change: "Studio Grade", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Monthly Views", value: "1.2M", subtext: "High engagement CEE audience", isPositive: true },
      { label: "Documentaries", value: "18 Produced", subtext: "Investigative series", isPositive: true },
      { label: "Avg Watch Time", value: "14:20 min", subtext: "Deep analytical engagement", isPositive: true },
      { label: "Industry Guests", value: "120+ CEOs", subtext: "Top leadership interviewed", isPositive: true },
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
    headline: "Unfiltered conversations with market shakers and visionary founders.",
    description:
      "Long-form podcast interviews covering venture creation, macroeconomic shifts, private equity, and executive mindset.",
    ctaLabel: "Browse All Episodes",
    marketSignals: [
      { label: "Active Series", value: "4 Shows", change: "Weekly Drops", isPositive: true },
      { label: "Spotify Rating", value: "4.9 ★", change: "Top Chart", isPositive: true },
      { label: "Downloads/Mo", value: "320k", change: "+24% YoY", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Total Episodes", value: "140+", subtext: "In-depth masterclasses", isPositive: true },
      { label: "Avg Episode Length", value: "52 min", subtext: "Uncut strategic dialogues", isPositive: true },
      { label: "Top Show", value: "The CEO Playbook", subtext: "Ranked #1 Business podcast", isPositive: true },
      { label: "Distribution", value: "Apple & Spotify", subtext: "Global syndication", isPositive: true },
    ],
    dashboardTitle: "Podcast Analytics & Releases",
    dashboardDescription: "Show charts, audience demographics, and latest episode drops.",
    featuredInsightHeadline: "Episode #84: Strategic M&A Lessons from a €500M Tech Exit",
    featuredInsightExcerpt: "A 60-minute masterclass on cross-border valuation, negotiation strategy, and post-merger integration.",
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
      { label: "Active Courses", value: "12 Modules", change: "Self-paced", isPositive: true },
      { label: "Executives Trained", value: "2,400+", change: "+35% YoY", isPositive: true },
      { label: "Completion Rate", value: "92%", change: "Industry Lead", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Course Rating", value: "4.95 / 5", subtext: "Based on 1,800 reviews", isPositive: true },
      { label: "Core Modules", value: "Finance & RE", subtext: "Institutional level rigor", isPositive: true },
      { label: "Certifications", value: "Executive CPD", subtext: "Recognized industry standard", isPositive: true },
      { label: "Case Studies", value: "45 Real Deals", subtext: "Romanian & regional focus", isPositive: true },
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
