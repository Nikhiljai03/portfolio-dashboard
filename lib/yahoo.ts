import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getPrices(
  symbols: string[],
): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  try {
    const quotes = await yahooFinance.quote(symbols);

    for (const q of quotes) {
      if (typeof q.regularMarketPrice === "number") {
        prices[q.symbol] = q.regularMarketPrice;
      }
    }
  } catch (error) {
    console.error("Yahoo fetch failed:", error);
  }
  return prices;
}
