// Re-export so consumers can type-check config lookups
export type CategorySlug = "real-estate" | "insurance" | "investments";

export interface MarketSignal {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  suffix?: string;
  description?: string;
}

export interface IntelligenceMetric {
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  description?: string;
}

export interface CategoryPageConfig {
  slug: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
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

const categoryConfigs: Record<CategorySlug, CategoryPageConfig> = {
  'real-estate': {
    slug: 'real-estate',
    eyebrow: 'AiX Real Estate Intelligence',
    headline: 'Real estate decisions powered by intelligence.',
    subheadline: 'Romania Property Markets',
    description:
      'Premium property intelligence covering residential, commercial, and luxury real estate across Romania\'s major markets.',
    ctaLabel: 'Explore Analysis',
    marketSignals: [
      { label: 'Bucharest Apt.', value: '1,850', suffix: '€/m²', trend: 'up', description: '+4.2% YoY' },
      { label: 'Cluj-Napoca', value: '2,100', suffix: '€/m²', trend: 'up', description: '+6.1% YoY' },
      { label: 'Rental Yield', value: '5.8', suffix: '%', trend: 'neutral', description: 'National avg.' },
      { label: 'Q1 Transactions', value: '28,400', trend: 'down', description: '−3.1% QoQ' },
    ],
    intelligenceMetrics: [
      { label: 'Median Price', value: '1,850', unit: '€/m²', trend: 'up', trendValue: '+4.2%', description: 'Bucharest residential' },
      { label: 'Avg. Rental Yield', value: '5.8', unit: '%', trend: 'neutral', trendValue: '±0.1%', description: 'National average' },
      { label: 'Transactions YTD', value: '28,400', trend: 'down', trendValue: '−3.1%', description: 'Q1 2025 data' },
      { label: 'New Listings', value: '4,120', trend: 'up', trendValue: '+8.3%', description: 'March 2025' },
      { label: 'Mortgage Rate', value: '6.2', unit: '%', trend: 'down', trendValue: '−0.3%', description: '30-year fixed avg.' },
      { label: 'Vacancy Rate', value: '3.1', unit: '%', trend: 'neutral', trendValue: '±0.2%', description: 'Commercial BCR' },
    ],
    dashboardTitle: 'Romania Property Intelligence',
    dashboardDescription:
      'Key market metrics and transaction data for Romania\'s residential and commercial real estate markets.',
    featuredInsightHeadline: 'Romania\'s Property Markets Entering a New Cycle',
    featuredInsightExcerpt:
      'After three years of post-pandemic growth, Romania\'s residential real estate sector shows signs of recalibration. Our analysts examine the structural forces shaping the market through 2026 — from mortgage rate shifts to regional divergence between Bucharest and secondary cities.',
    newsletterOverline: 'Real Estate Intelligence',
    newsletterHeadline: 'Receive private real estate reports.',
    newsletterDescription:
      'Market analysis, transaction data, and investment signals from Romania\'s property markets. Delivered to professionals making important decisions.',
  },

  'insurance': {
    slug: 'insurance',
    eyebrow: 'AiX Insurance Intelligence',
    headline: 'Protection intelligence for modern wealth.',
    subheadline: 'Romania Insurance Markets',
    description:
      'Expert analysis of Romania\'s insurance landscape — from personal protection strategies to corporate risk management.',
    ctaLabel: 'Explore Analysis',
    marketSignals: [
      { label: 'Market Volume', value: '12.4', suffix: 'Bn RON', trend: 'up', description: '+9.2% YoY' },
      { label: 'Life Penetration', value: '0.8', suffix: '% GDP', trend: 'up', description: 'EU avg: 4%' },
      { label: 'Avg. Home Premium', value: '480', suffix: 'RON/yr', trend: 'up', description: '+6% YoY' },
      { label: 'Combined Ratio', value: '97.2', suffix: '%', trend: 'down', description: 'Industry avg.' },
    ],
    intelligenceMetrics: [
      { label: 'Gross Written Premium', value: '12.4', unit: 'Bn RON', trend: 'up', trendValue: '+9.2%', description: 'Total market 2024' },
      { label: 'Life Insurance', value: '0.8', unit: '% GDP', trend: 'up', trendValue: '+0.1%', description: 'vs. EU avg. 4%' },
      { label: 'Claims Ratio', value: '62.3', unit: '%', trend: 'neutral', trendValue: '±0.4%', description: 'Non-life 2024' },
      { label: 'RCA Market', value: '4.2', unit: 'Bn RON', trend: 'up', trendValue: '+11%', description: 'Largest segment' },
      { label: 'Active Insurers', value: '32', trend: 'down', trendValue: '−2', description: 'Market consolidation' },
      { label: 'Digital Adoption', value: '24', unit: '%', trend: 'up', trendValue: '+7%', description: 'Online policies' },
    ],
    dashboardTitle: 'Romania Insurance Intelligence',
    dashboardDescription:
      'Market penetration, premium data, and risk indicators for Romania\'s insurance sector.',
    featuredInsightHeadline: 'Romania\'s Protection Gap Remains Among Europe\'s Largest',
    featuredInsightExcerpt:
      'With life insurance penetration at 0.8% of GDP versus the European average of 4%, Romania presents both a significant coverage challenge and an extraordinary opportunity. Our intelligence team examines the structural barriers and the paths to closing the gap.',
    newsletterOverline: 'Insurance Intelligence',
    newsletterHeadline: 'Receive private insurance market reports.',
    newsletterDescription:
      'Market analysis, risk indicators, and protection intelligence for Romania\'s insurance landscape. For professionals who need signal, not noise.',
  },

  'investments': {
    slug: 'investments',
    eyebrow: 'AiX Investment Intelligence',
    headline: 'Capital intelligence for informed investors.',
    subheadline: 'Romania Capital Markets',
    description:
      'Rigorous investment analysis covering Romania\'s capital markets, private equity, and strategic allocation opportunities.',
    ctaLabel: 'Explore Analysis',
    marketSignals: [
      { label: 'BET Index', value: '18,420', trend: 'up', description: '+2.3% MTD' },
      { label: 'EUR/RON', value: '4.9765', trend: 'neutral', description: 'NBR reference' },
      { label: 'BNR Policy Rate', value: '6.50', suffix: '%', trend: 'down', description: '−0.25% last' },
      { label: '10Y Bond Yield', value: '7.18', suffix: '%', trend: 'down', description: '−12bps WoW' },
    ],
    intelligenceMetrics: [
      { label: 'BET Performance', value: '+2.3', unit: '%', trend: 'up', trendValue: 'MTD', description: 'Bucharest Exchange' },
      { label: 'Policy Rate', value: '6.50', unit: '%', trend: 'down', trendValue: '−0.25%', description: 'BNR benchmark' },
      { label: '10Y Yield', value: '7.18', unit: '%', trend: 'down', trendValue: '−12bps', description: 'RON gov. bond' },
      { label: 'FDI Inflows', value: '4.8', unit: 'Bn €', trend: 'up', trendValue: '+14%', description: '12-month rolling' },
      { label: 'Inflation (CPI)', value: '4.1', unit: '%', trend: 'down', trendValue: '−2.8%', description: 'March 2025' },
      { label: 'GDP Growth', value: '2.8', unit: '%', trend: 'up', trendValue: '+0.4%', description: '2025 estimate' },
    ],
    dashboardTitle: 'Romania Capital Markets Intelligence',
    dashboardDescription:
      'Key market indicators, rate data, and macroeconomic signals for Romania\'s investment landscape.',
    featuredInsightHeadline: 'Bucharest Equities: Undervalued in the Regional Context',
    featuredInsightExcerpt:
      'Romania\'s BET index trades at a significant discount to CEE peers on both P/E and P/B metrics. Our analysts present the case for selective exposure ahead of the index rebalancing — examining sector allocation, dividend yield, and the regulatory catalyst calendar.',
    newsletterOverline: 'Investment Intelligence',
    newsletterHeadline: 'Receive private investment reports.',
    newsletterDescription:
      'Capital markets analysis, macroeconomic signals, and investment intelligence from Romania. For the people allocating capital.',
  },
};

export { categoryConfigs };
