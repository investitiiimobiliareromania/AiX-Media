export type MarketInstrument = {
  symbol: string;
  name: string;
};

export type MarketGroup = {
  title: string;
  instruments: MarketInstrument[];
};

export const marketGroups: MarketGroup[] = [
  {
    title: "Indices",
    instruments: [
      { symbol: "BET", name: "Bucharest Exchange Trading" },
      { symbol: "S&P 500", name: "S&P 500 Index" },
      { symbol: "DAX", name: "DAX Performance Index" },
      { symbol: "FTSE 100", name: "FTSE 100 Index" },
    ],
  },
  {
    title: "Currencies",
    instruments: [
      { symbol: "EUR/RON", name: "Euro / Romanian Leu" },
      { symbol: "USD/RON", name: "US Dollar / Romanian Leu" },
      { symbol: "EUR/USD", name: "Euro / US Dollar" },
      { symbol: "GBP/EUR", name: "British Pound / Euro" },
    ],
  },
  {
    title: "Commodities",
    instruments: [
      { symbol: "XAU", name: "Gold Spot" },
      { symbol: "BRENT", name: "Brent Crude Oil" },
      { symbol: "XAG", name: "Silver Spot" },
      { symbol: "NG", name: "Natural Gas" },
    ],
  },
];
