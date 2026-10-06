export type IndicatorCategory =
  | 'romania-macro'
  | 'money-credit'
  | 'real-estate'
  | 'markets'
  | 'commodities';

export type DataStatus =
  | 'LATEST OFFICIAL'
  | 'LAST CLOSE'
  | 'VERIFIED'
  | 'HISTORICAL'
  | 'PROVISIONAL';

export interface DataObservation {
  period: string;
  value: string | number;
  date: string;
  notes?: string;
}

export interface DataIndicator {
  id: string;
  name: string;
  code: string;
  category: IndicatorCategory;
  categoryLabel: string;
  value: string;
  unit: string;
  previousValue?: string;
  change?: string;
  changePct?: string;
  direction?: 'up' | 'down' | 'neutral';
  period: string;
  publishedAt: string;
  verifiedAt: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: 'PRIMARY_GOV' | 'CENTRAL_BANK' | 'STATISTICAL_OFFICE' | 'EXCHANGE' | 'REGULATORY';
  confidence: 'HIGH' | 'MAXIMUM';
  status: DataStatus;
  notes?: string;
  whatItMeans: string;
  whyItMatters: string;
  history?: DataObservation[];
}

export interface BriefingItem {
  id: string;
  category: string;
  categoryLabel: string;
  headline: string;
  summary: string;
  whyItMatters: string;
  sourceName: string;
  sourceUrl: string;
  publicationDate: string;
  reportingPeriod: string;
}

export interface MarketCloseItem {
  symbol: string;
  name: string;
  value: string;
  unit: string;
  change: string;
  changePct: string;
  direction: 'up' | 'down' | 'neutral';
  status: DataStatus;
  verifiedAt: string;
  source: string;
}
