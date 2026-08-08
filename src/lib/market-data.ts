import { cache } from "react";

export type MarketDataPoint = {
  symbol: string;
  value: number | null;
  unit?: string;
  source: string;
  sourceUrl?: string;
  publishedAt?: string;
  fetchedAt: string;
  status: "available" | "unavailable" | "stale";
  isDelayed?: boolean;
};

export type MarketDataSnapshot = {
  currencies: MarketDataPoint[];
  interestRates: MarketDataPoint[];
  equities: MarketDataPoint[];
  commodities: MarketDataPoint[];
};

const BNR_XML_URL = "https://www.bnr.ro/23988-cursurile-pietei-valutare-in-format-xml";

interface CacheEntry {
  snapshot: MarketDataSnapshot;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL = 3600 * 1000; // 1 hour

export const getMarketData = cache(async (): Promise<MarketDataSnapshot> => {
  const now = Date.now();
  if (memoryCache && (now - memoryCache.timestamp < CACHE_TTL)) {
    return memoryCache.snapshot;
  }

  const fetchedAt = new Date().toISOString();

  // Baseline structure with null values (unavailable state)
  const snapshot: MarketDataSnapshot = {
    currencies: [
      { symbol: "EUR/RON", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
      { symbol: "USD/RON", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
      { symbol: "GBP/RON", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
      { symbol: "CHF/RON", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
    ],
    interestRates: [
      { symbol: "ROBOR 3M", value: null, unit: "%", source: "BNR", sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx", fetchedAt, status: "unavailable" },
      { symbol: "ROBOR 6M", value: null, unit: "%", source: "BNR", sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx", fetchedAt, status: "unavailable" },
      { symbol: "IRCC", value: null, unit: "%", source: "BNR", sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx", fetchedAt, status: "unavailable" },
      { symbol: "BNR RATE", value: null, unit: "%", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
    ],
    equities: [
      { symbol: "BET", value: null, unit: "points", source: "BVB", sourceUrl: "https://www.bvb.ro/", fetchedAt, status: "unavailable" },
      { symbol: "BET-TR", value: null, unit: "points", source: "BVB", sourceUrl: "https://www.bvb.ro/", fetchedAt, status: "unavailable" },
      { symbol: "BET-FI", value: null, unit: "points", source: "BVB", sourceUrl: "https://www.bvb.ro/", fetchedAt, status: "unavailable" },
      { symbol: "BET-NG", value: null, unit: "points", source: "BVB", sourceUrl: "https://www.bvb.ro/", fetchedAt, status: "unavailable" },
    ],
    commodities: [
      { symbol: "XAU/USD", value: null, unit: "USD/oz", source: "LBMA", sourceUrl: "https://www.lbma.org.uk/", fetchedAt, status: "unavailable" },
      { symbol: "BRENT", value: null, unit: "USD/bbl", source: "ICE", sourceUrl: "https://www.theice.com/", fetchedAt, status: "unavailable" },
      { symbol: "NG", value: null, unit: "EUR/MWh", source: "ICE", sourceUrl: "https://www.theice.com/", fetchedAt, status: "unavailable" },
      { symbol: "BTC/USD", value: null, unit: "USD", source: "Coinbase", sourceUrl: "https://www.coinbase.com/", fetchedAt, status: "unavailable" },
    ],
  };

  try {
    const res = await fetch(BNR_XML_URL, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      throw new Error(`BNR XML HTTP error: ${res.status}`);
    }

    const xmlText = await res.text();

    const dateMatch = xmlText.match(/<PublishingDate>([^<]+)<\/PublishingDate>/);
    const publishedAt = dateMatch ? dateMatch[1] : undefined;

    const rates: Record<string, number> = {};
    const rateRegex = /<Rate currency="([A-Z]{3})"(?: multiplier="\d+")?>([\d\.]+)<\/Rate>/g;
    let match;
    while ((match = rateRegex.exec(xmlText)) !== null) {
      const cur = match[1];
      const val = match[2];
      if (cur && val) {
        rates[cur] = parseFloat(val);
      }
    }

    // Update BNR Rates
    snapshot.currencies = snapshot.currencies.map(curr => {
      const parts = curr.symbol.split("/");
      const baseSymbol = parts[0];
      if (baseSymbol && rates[baseSymbol] !== undefined) {
        return {
          ...curr,
          value: rates[baseSymbol] ?? null,
          publishedAt,
          status: "available" as const,
        };
      }
      return curr;
    });

    // BNR Key Rate is in XML too
    if (rates["BNR_RATE"] !== undefined) {
      const idx = snapshot.interestRates.findIndex(r => r.symbol === "BNR RATE");
      if (idx !== -1) {
        const target = snapshot.interestRates[idx];
        if (target) {
          snapshot.interestRates[idx] = {
            ...target,
            value: rates["BNR_RATE"] ?? null,
            publishedAt,
            status: "available" as const,
          };
        }
      }
    }

    memoryCache = { snapshot, timestamp: now };
    return snapshot;
  } catch (err) {
    console.error("Error fetching or parsing BNR XML:", err);
    // On failure, return the baseline snapshot with all rates set to unavailable
    return snapshot;
  }
});
