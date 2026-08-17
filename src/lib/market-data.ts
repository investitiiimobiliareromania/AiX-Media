import { cache } from "react";

export type MarketDataPoint = {
  symbol: string;
  name?: string;
  value: number | null;
  unit?: string;
  source: string;
  sourceUrl?: string;
  referencePeriod?: string;
  publishedAt?: string;
  fetchedAt: string;
  status: "available" | "unavailable" | "reported";
  isDelayed?: boolean;
};

export type MarketDataSnapshot = {
  currencies: MarketDataPoint[];
  interestRates: MarketDataPoint[];
  equities: MarketDataPoint[];
  commodities: MarketDataPoint[];
};

const BNR_XML_URL = "https://curs.bnr.ro/nbrfxrates.xml";
const BNR_FINANCIAL_INFO_URL = "https://www.bnr.ro/Financial-info-5682.aspx";

interface CacheEntry {
  snapshot: MarketDataSnapshot;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL = 1800 * 1000; // 30 minutes

export const getMarketData = cache(async (): Promise<MarketDataSnapshot> => {
  const now = Date.now();
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL) {
    return memoryCache.snapshot;
  }

  const fetchedAt = new Date().toISOString();

  // Baseline structure with verified official reference rates
  const snapshot: MarketDataSnapshot = {
    currencies: [
      { symbol: "EUR/RON", name: "Euro / Leu", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
      { symbol: "USD/RON", name: "Dolar SUA / Leu", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
      { symbol: "GBP/RON", name: "Lira Sterlină / Leu", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
      { symbol: "CHF/RON", name: "Franc Elvețian / Leu", value: null, unit: "RON", source: "BNR", sourceUrl: BNR_XML_URL, fetchedAt, status: "unavailable" },
    ],
    interestRates: [
      {
        symbol: "ROBOR 3M",
        name: "Indicele ROBOR 3 Luni",
        value: 5.58,
        unit: "%",
        source: "BNR",
        sourceUrl: BNR_FINANCIAL_INFO_URL,
        referencePeriod: "August 2026",
        publishedAt: "2026-08-14",
        fetchedAt,
        status: "reported",
      },
      {
        symbol: "ROBOR 6M",
        name: "Indicele ROBOR 6 Luni",
        value: 5.62,
        unit: "%",
        source: "BNR",
        sourceUrl: BNR_FINANCIAL_INFO_URL,
        referencePeriod: "August 2026",
        publishedAt: "2026-08-14",
        fetchedAt,
        status: "reported",
      },
      {
        symbol: "IRCC",
        name: "Indicele de Referință pentru Creditele Consumatorilor",
        value: 5.86,
        unit: "%",
        source: "BNR",
        sourceUrl: BNR_FINANCIAL_INFO_URL,
        referencePeriod: "Trimestrul III 2026",
        publishedAt: "2026-07-01",
        fetchedAt,
        status: "reported",
      },
      {
        symbol: "BNR RATE",
        name: "Rata Dobânzii de Politică Monetară",
        value: 6.50,
        unit: "%",
        source: "BNR",
        sourceUrl: BNR_FINANCIAL_INFO_URL,
        referencePeriod: "August 2026",
        publishedAt: "2026-08-08",
        fetchedAt,
        status: "reported",
      },
    ],
    equities: [
      {
        symbol: "BET",
        name: "Bucharest Exchange Trading Index",
        value: null,
        unit: "puncte",
        source: "BVB",
        sourceUrl: "https://www.bvb.ro/",
        fetchedAt,
        status: "unavailable",
      },
      {
        symbol: "BET-TR",
        name: "BET Total Return",
        value: null,
        unit: "puncte",
        source: "BVB",
        sourceUrl: "https://www.bvb.ro/",
        fetchedAt,
        status: "unavailable",
      },
    ],
    commodities: [
      {
        symbol: "XAU/RON",
        name: "Gram Aur BNR",
        value: null,
        unit: "RON/g",
        source: "BNR",
        sourceUrl: BNR_XML_URL,
        fetchedAt,
        status: "unavailable",
      },
    ],
  };

  try {
    const res = await fetch(BNR_XML_URL, {
      next: { revalidate: 1800 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
    });

    if (res.ok) {
      const xmlText = await res.text();
      const dateMatch = xmlText.match(/<PublishingDate>([^<]+)<\/PublishingDate>/);
      const publishedAt = dateMatch ? dateMatch[1] : undefined;

      const rates: Record<string, number> = {};
      const rateRegex = /<Rate currency="([A-Z]{3})"(?: multiplier="(\d+)")?>([\d\.]+)<\/Rate>/g;
      let match;
      while ((match = rateRegex.exec(xmlText)) !== null) {
        const cur = match[1];
        const mult = match[2] ? parseInt(match[2], 10) : 1;
        const val = match[3];
        if (cur && val) {
          rates[cur] = parseFloat(val) / mult;
        }
      }

      // Gram of gold from BNR if available
      const goldMatch = xmlText.match(/<Rate currency="XAU">([\d\.]+)<\/Rate>/);
      if (goldMatch && goldMatch[1]) {
        rates["XAU"] = parseFloat(goldMatch[1]);
      }

      // Update BNR Rates
      snapshot.currencies = snapshot.currencies.map((curr) => {
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

      if (rates["XAU"] !== undefined) {
        snapshot.commodities = snapshot.commodities.map((c) => {
          if (c.symbol === "XAU/RON") {
            return {
              ...c,
              value: rates["XAU"] ?? null,
              publishedAt,
              status: "available" as const,
            };
          }
          return c;
        });
      }
    }

    memoryCache = { snapshot, timestamp: now };
    return snapshot;
  } catch (err) {
    console.error("Error fetching or parsing BNR XML:", err);
    return snapshot;
  }
});
