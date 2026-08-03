export type MarketInstrument = {
  symbol: string;
  name: string;
  value?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
};

export type MarketGroup = {
  title: string;
  instruments: MarketInstrument[];
};

export const marketGroups: MarketGroup[] = [
  {
    title: "Indices",
    instruments: [
      { symbol: "BET",     name: "Bucharest Exchange Trading", value: "18,420.5", change: "+2.3%",  trend: "up"      },
      { symbol: "S&P 500", name: "S&P 500 Index",              value: "5,611.8",  change: "+0.8%",  trend: "up"      },
      { symbol: "DAX",     name: "DAX Performance Index",       value: "18,890.3", change: "−0.4%", trend: "down"    },
      { symbol: "FTSE 100",name: "FTSE 100 Index",              value: "8,329.1",  change: "+0.2%",  trend: "neutral" },
    ],
  },
  {
    title: "Currencies",
    instruments: [
      { symbol: "EUR/RON", name: "Euro / Romanian Leu",        value: "4.9765", change: "+0.02%",  trend: "neutral" },
      { symbol: "USD/RON", name: "US Dollar / Romanian Leu",   value: "4.5830", change: "−0.11%", trend: "down"    },
      { symbol: "EUR/USD", name: "Euro / US Dollar",           value: "1.0860", change: "+0.14%",  trend: "up"      },
      { symbol: "GBP/EUR", name: "British Pound / Euro",       value: "1.1715", change: "+0.06%",  trend: "up"      },
    ],
  },
  {
    title: "Commodities",
    instruments: [
      { symbol: "XAU",   name: "Gold Spot",      value: "2,348.4", change: "+0.6%",  trend: "up"   },
      { symbol: "BRENT", name: "Brent Crude Oil", value: "84.72",   change: "−1.2%", trend: "down" },
      { symbol: "XAG",   name: "Silver Spot",     value: "27.43",   change: "+1.1%",  trend: "up"   },
      { symbol: "NG",    name: "Natural Gas",      value: "2.81",    change: "−0.4%", trend: "down" },
    ],
  },
];
