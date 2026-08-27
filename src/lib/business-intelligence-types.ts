export type RadarTag =
  | 'WATCH'
  | 'GROWING'
  | 'EXPANDING'
  | 'ACQUIRING'
  | 'INVESTING'
  | 'DISTRESSED'
  | 'EMERGING';

export type IndustrySlug =
  | 'banking'
  | 'real-estate'
  | 'energy'
  | 'automotive'
  | 'construction'
  | 'retail'
  | 'technology'
  | 'ai'
  | 'manufacturing'
  | 'pharma'
  | 'logistics'
  | 'agriculture'
  | 'telecom'
  | 'hospitality';

export interface CompanyProfile {
  id: string;
  slug: string;
  symbol?: string;
  isin?: string;
  cui?: string;
  name: string;
  logo?: string | null;
  coverImage?: string;
  industry: string;
  industrySlug: IndustrySlug;
  headquarters: string;
  ownership: string;
  management: string;
  ceo: string;
  revenue: string;
  revenueValue: number; // in RON
  profit: string;
  profitValue: number; // in RON
  employees: number;
  assets?: string;
  assetsValue?: number;
  growth: string;
  marketCap?: string;
  peRatio?: string;
  dividendYield?: string;
  investments?: string;
  acquisitions?: string;
  competitors?: string[];
  recentDevelopments: string[];
  businessModel: string;
  risks: string[];
  opportunities: string[];
  timeline: { year: string; event: string }[];
  asOf: string;
}

export interface IndustryProfile {
  id: string;
  slug: IndustrySlug;
  name: string;
  description: string;
  marketOverview: string;
  majorCompanies: string[];
  marketLeaders: string[];
  growthRate: string;
  investmentsVolume: string;
  maVolume: string;
  trends: string[];
  risks: string[];
  opportunities: string[];
  developmentsCount: number;
  coverImage: string;
}

export interface DealItem {
  id: string;
  slug: string;
  company: string;
  counterparty: string;
  dealType:
    | 'M&A'
    | 'Acquisition'
    | 'Investment'
    | 'Funding'
    | 'Private Equity'
    | 'Venture Capital'
    | 'IPO'
    | 'Strategic Partnership';
  value: string;
  sector: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Announced' | 'Regulatory Approval';
  description: string;
  source?: string;
  coverImage?: string;
}

export interface ExecutiveProfile {
  id: string;
  slug: string;
  name: string;
  currentRole: string;
  company: string;
  companySlug?: string;
  avatar: string;
  background: string;
  previousRoles: string[];
  associatedCompanies: string[];
  investments: string[];
  recentDevelopments: string[];
  quote?: string;
}

export interface RadarItem {
  id: string;
  tag: RadarTag;
  title: string;
  entity: string;
  sector: string;
  date: string;
  summary: string;
  impact: string;
  slug?: string;
}

export interface BusinessMetricItem {
  id: string;
  label: string;
  current: string;
  previous: string;
  yoy: string;
  trend: 'up' | 'down' | 'neutral';
  category: 'Macro' | 'BVB' | 'Real Estate' | 'Banking' | 'Investment';
  unit: string;
  source: string;
  updatedAt: string;
}

export interface BusinessInsightItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  whyItMatters: string[];
}
