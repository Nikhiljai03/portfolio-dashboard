import holdingsData from "@/data/holdings.json";
import { getPrices } from "@/lib/yahoo";
import { getAllFundamentals, type Fundamentals } from "@/lib/google";
import type {
  Holding,
  Portfolio,
  PortfolioRow,
  SectorGroup,
} from "@/types/portfolio";

const holdings = holdingsData as Holding[];

const PRICE_TTL = 10 * 1000; 
const FUNDAMENTALS_TTL = 60 * 60 * 1000; 

let priceCache = { data: {} as Record<string, number>, time: 0 };
let fundamentalsCache = { data: {} as Record<string, Fundamentals>, time: 0 };

async function getCachedPrices() {
  if (Date.now() - priceCache.time > PRICE_TTL) {
    const fresh = await getPrices(holdings.map((h) => h.yahooSymbol));
    if (Object.keys(fresh).length > 0) {
      priceCache = { data: fresh, time: Date.now() };
    }
  }
  return priceCache.data;
}

async function getCachedFundamentals() {
  if (Date.now() - fundamentalsCache.time > FUNDAMENTALS_TTL) {
    const fresh = await getAllFundamentals(holdings.map((h) => h.googleSymbol));
    const gotSomething = Object.values(fresh).some(
      (f) => f.peRatio !== null || f.latestEarnings !== null,
    );
    if (gotSomething) {
      fundamentalsCache = { data: fresh, time: Date.now() };
    }
  }
  return fundamentalsCache.data;
}

export async function buildPortfolio(): Promise<Portfolio> {
  const [prices, fundamentals] = await Promise.all([
    getCachedPrices(),
    getCachedFundamentals(),
  ]);

  const totalInvestment = holdings.reduce(
    (sum, h) => sum + h.purchasePrice * h.qty,
    0,
  );

  const rows: PortfolioRow[] = holdings.map((h) => {
    const investment = h.purchasePrice * h.qty;
    const cmp = prices[h.yahooSymbol] ?? null;
    const presentValue = cmp === null ? null : cmp * h.qty;
    const gainLoss = presentValue === null ? null : presentValue - investment;
    const f = fundamentals[h.googleSymbol];

    return {
      ...h,
      investment,
      portfolioPercent: (investment / totalInvestment) * 100,
      cmp,
      presentValue,
      gainLoss,
      peRatio: f?.peRatio ?? null,
      latestEarnings: f?.latestEarnings ?? null,
    };
  });

  const sectorNames = [...new Set(rows.map((r) => r.sector))];

  const sectors: SectorGroup[] = sectorNames.map((sector) => {
    const sectorRows = rows.filter((r) => r.sector === sector);
    return {
      sector,
      rows: sectorRows,
      totalInvestment: sectorRows.reduce((sum, r) => sum + r.investment, 0),
      totalPresentValue: sectorRows.reduce(
        (sum, r) => sum + (r.presentValue ?? 0),
        0,
      ),
      gainLoss: sectorRows.reduce((sum, r) => sum + (r.gainLoss ?? 0), 0),
    };
  });

  return { sectors, lastUpdated: new Date().toISOString() };
}
