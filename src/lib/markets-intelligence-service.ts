export interface MarketIndexItem {
  symbol: string;
  name: string;
  region: 'Romania' | 'USA' | 'Europe' | 'Asia' | 'Global';
  price: number;
  change1D: number; // percentage
  changeYTD: number; // percentage
  timestamp: string;
  source: string;
}

export interface MarketMoverItem {
  symbol: string;
  name: string;
  type: 'gainer' | 'loser' | 'active' | '52w-high';
  price: number;
  changePct: number;
  volume: string;
  marketCap: string;
  range52W: string;
}

export interface MacroIndicatorItem {
  id: string;
  label: string;
  currentValue: string;
  previousValue: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  lastUpdated: string;
  source: string;
  period: string;
}

export interface CentralBankRateItem {
  bank: 'BNR' | 'ECB' | 'Federal Reserve' | 'Bank of England';
  currentRate: string;
  previousRate: string;
  latestDecisionDate: string;
  nextMeetingDate: string;
  outlook: string;
}

export interface BondYieldItem {
  tenor: '2-Year' | '5-Year' | '10-Year' | '30-Year';
  yieldPct: number;
  change1D: number;
  country: 'Romania' | 'Germany' | 'USA';
}

export interface FXQuoteItem {
  pair: string;
  rate: number;
  change1D: number;
  change1M: number;
  high52W: number;
  low52W: number;
}

export interface CommodityItem {
  symbol: string;
  name: string;
  category: 'Energy' | 'Metals' | 'Agriculture';
  price: number;
  unit: string;
  change1D: number;
  change1M: number;
  changeYTD: number;
}

export interface SectorPerformanceItem {
  name: string;
  change1D: number;
  changeYTD: number;
  peRatio: number;
  leadingStocks: string[];
  keyRisk: string;
}

export interface EarningsReleaseItem {
  symbol: string;
  companyName: string;
  reportDate: string;
  period: string;
  revenue: string;
  netProfit: string;
  yoYGrowth: string;
  status: 'Reported' | 'Upcoming';
}

export const globalIndices: MarketIndexItem[] = [
  { symbol: 'BET', name: 'BET Index (BVB)', region: 'Romania', price: 18450.2, change1D: 0.65, changeYTD: 14.8, timestamp: '12:45 Live', source: 'Bursa de Valori București' },
  { symbol: 'BET-TR', name: 'BET Total Return', region: 'Romania', price: 39820.5, change1D: 0.72, changeYTD: 19.4, timestamp: '12:45 Live', source: 'Bursa de Valori București' },
  { symbol: 'S&P 500', name: 'S&P 500 Index', region: 'USA', price: 5580.4, change1D: 0.42, changeYTD: 16.2, timestamp: 'Închidere SUA', source: 'NYSE/Nasdaq' },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', region: 'USA', price: 17640.8, change1D: 0.85, changeYTD: 18.5, timestamp: 'Închidere SUA', source: 'Nasdaq' },
  { symbol: 'DOW', name: 'Dow Jones Industrial', region: 'USA', price: 40850.1, change1D: 0.18, changeYTD: 8.9, timestamp: 'Închidere SUA', source: 'NYSE' },
  { symbol: 'DAX 40', name: 'DAX Index (Germania)', region: 'Europe', price: 18320.6, change1D: 0.31, changeYTD: 9.8, timestamp: 'Închidere Europa', source: 'Deutsche Börse' },
  { symbol: 'CAC 40', name: 'CAC 40 (Franța)', region: 'Europe', price: 7510.3, change1D: -0.12, changeYTD: 3.4, timestamp: 'Închidere Europa', source: 'Euronext Paris' },
  { symbol: 'FTSE 100', name: 'FTSE 100 (Marea Britanie)', region: 'Europe', price: 8240.7, change1D: 0.22, changeYTD: 6.8, timestamp: 'Închidere Londra', source: 'LSE' },
  { symbol: 'NIKKEI 225', name: 'Nikkei 225 (Japonia)', region: 'Asia', price: 38050.2, change1D: 1.15, changeYTD: 14.1, timestamp: 'Închidere Tokyo', source: 'TSE' },
  { symbol: 'MSCI WORLD', name: 'MSCI World Index', region: 'Global', price: 3620.4, change1D: 0.48, changeYTD: 12.6, timestamp: 'Daily Close', source: 'MSCI' },
];

export const bvbMovers: MarketMoverItem[] = [
  { symbol: 'ONE', name: 'One United Properties', type: 'gainer', price: 0.985, changePct: 3.45, volume: '4.2M RON', marketCap: '3.74B RON', range52W: '0.82 - 1.04 RON' },
  { symbol: 'H2O', name: 'Hidroelectrica', type: 'gainer', price: 128.5, changePct: 1.82, volume: '18.5M RON', marketCap: '57.8B RON', range52W: '110 - 134 RON' },
  { symbol: 'TLV', name: 'Banca Transilvania', type: 'gainer', price: 28.4, changePct: 1.25, volume: '22.1M RON', marketCap: '25.7B RON', range52W: '21.5 - 29.8 RON' },
  { symbol: 'SNN', name: 'Nuclearelectrica', type: 'loser', price: 47.2, changePct: -1.05, volume: '3.1M RON', marketCap: '14.2B RON', range52W: '43.0 - 52.5 RON' },
  { symbol: 'SNP', name: 'OMV Petrom', type: 'active', price: 0.745, changePct: 0.68, volume: '34.8M RON', marketCap: '46.4B RON', range52W: '0.58 - 0.78 RON' },
];

export const romaniaMacroIndicators: MacroIndicatorItem[] = [
  { id: 'macro-cpi', label: 'Rata Inflației (IPC)', currentValue: '4.80%', previousValue: '4.90%', change: '-0.10%', trend: 'down', lastUpdated: 'Iulie 2026', source: 'INS', period: 'Anual' },
  { id: 'macro-gdp', label: 'Creștere PIB Real', currentValue: '+2.10%', previousValue: '+1.80%', change: '+0.30%', trend: 'up', lastUpdated: 'T1 2026', source: 'INS', period: 'Trimestrial' },
  { id: 'macro-unemp', label: 'Rata Șomajului (BIM)', currentValue: '5.20%', previousValue: '5.30%', change: '-0.10%', trend: 'down', lastUpdated: 'Iunie 2026', source: 'INS', period: 'Lunar' },
  { id: 'macro-bnr', label: 'Dobândă Politică Monetară', currentValue: '6.50%', previousValue: '6.75%', change: '-0.25%', trend: 'down', lastUpdated: 'Iulie 2026', source: 'BNR', period: 'Sedință CA' },
  { id: 'macro-def', label: 'Deficit Bugetar', currentValue: '6.80% PIB', previousValue: '6.60% PIB', change: '+0.20%', trend: 'up', lastUpdated: 'T2 2026', source: 'Ministerul Finanțelor', period: 'Anualizat' },
  { id: 'macro-debt', label: 'Datorie Publică', currentValue: '52.40% PIB', previousValue: '51.80% PIB', change: '+0.60%', trend: 'up', lastUpdated: 'T1 2026', source: 'Ministerul Finanțelor', period: 'Trimestrial' },
];

export const centralBankRates: CentralBankRateItem[] = [
  { bank: 'BNR', currentRate: '6.50%', previousRate: '6.75%', latestDecisionDate: '2026-07-08', nextMeetingDate: '2026-10-04', outlook: 'Scădere moderată a dobânzii' },
  { bank: 'ECB', currentRate: '3.75%', previousRate: '4.00%', latestDecisionDate: '2026-06-06', nextMeetingDate: '2026-09-12', outlook: 'Relaxare monetară treptată' },
  { bank: 'Federal Reserve', currentRate: '5.25%', previousRate: '5.50%', latestDecisionDate: '2026-07-31', nextMeetingDate: '2026-09-18', outlook: 'Tăiere de dobândă așteptată în Septembrie' },
  { bank: 'Bank of England', currentRate: '5.00%', previousRate: '5.25%', latestDecisionDate: '2026-08-01', nextMeetingDate: '2026-09-19', outlook: 'Menținere neutru' },
];

export const romaniaBondYields: BondYieldItem[] = [
  { tenor: '2-Year', yieldPct: 5.95, change1D: -0.05, country: 'Romania' },
  { tenor: '5-Year', yieldPct: 6.20, change1D: -0.08, country: 'Romania' },
  { tenor: '10-Year', yieldPct: 6.45, change1D: -0.10, country: 'Romania' },
];

export const fxQuotes: FXQuoteItem[] = [
  { pair: 'EUR/RON', rate: 4.975, change1D: 0.02, change1M: 0.15, high52W: 4.992, low52W: 4.965 },
  { pair: 'USD/RON', rate: 4.582, change1D: -0.18, change1M: -0.85, high52W: 4.685, low52W: 4.510 },
  { pair: 'EUR/USD', rate: 1.086, change1D: 0.20, change1M: 1.05, high52W: 1.105, low52W: 1.062 },
  { pair: 'GBP/USD', rate: 1.285, change1D: 0.15, change1M: 0.75, high52W: 1.304, low52W: 1.251 },
];

export const commoditiesQuotes: CommodityItem[] = [
  { symbol: 'BRENT', name: 'Petrol Brent', category: 'Energy', price: 76.8, unit: 'USD/bbl', change1D: 1.25, change1M: -2.4, changeYTD: -1.8 },
  { symbol: 'WTI', name: 'Petrol WTI', category: 'Energy', price: 72.4, unit: 'USD/bbl', change1D: 1.18, change1M: -2.8, changeYTD: -2.1 },
  { symbol: 'GOLD', name: 'Aur', category: 'Metals', price: 2480.5, unit: 'USD/oz', change1D: 0.65, change1M: 4.2, changeYTD: 18.5 },
  { symbol: 'NATGAS', name: 'Gaz Natural (TTF)', category: 'Energy', price: 34.5, unit: 'EUR/MWh', change1D: -1.85, change1M: 6.5, changeYTD: 8.2 },
];

export const sectorPerformances: SectorPerformanceItem[] = [
  { name: 'Utilități & Hidro', change1D: 1.45, changeYTD: 22.4, peRatio: 9.1, leadingStocks: ['H2O', 'SNN'], keyRisk: 'Reglementări preț' },
  { name: 'Bănci & Finanțe', change1D: 0.95, changeYTD: 18.2, peRatio: 7.8, leadingStocks: ['TLV', 'BRD', 'BVB'], keyRisk: 'Taxa pe active bancare' },
  { name: 'Energie & Petrol', change1D: 0.45, changeYTD: 12.8, peRatio: 8.4, leadingStocks: ['SNP', 'SNG'], keyRisk: 'Fluctuații cotatții țiței' },
  { name: 'Imobiliar Premium', change1D: 2.10, changeYTD: 15.6, peRatio: 8.5, leadingStocks: ['ONE'], keyRisk: 'Blocaje urbanism' },
];
