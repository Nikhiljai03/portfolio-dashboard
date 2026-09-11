export type Holding = {
  name: string;
  purchasePrice: number;
  qty: number;
  code: string;
  exchange: "NSE" | "BSE";
  sector: string;
};

export type PortfolioRow = Holding & {
  investment: number;
  portfolioPercent: number;
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  peRatio: number | null;
  latestEarnings: number | null;
};

export type SectorGroup = {
  sector: string;
  rows: PortfolioRow[];
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
};

export type Portfolio = {
  sectors: SectorGroup[];
  lastUpdated: string;
};
