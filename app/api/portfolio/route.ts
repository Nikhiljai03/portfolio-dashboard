import holdingsData from "@/data/holdings.json";
import { getPrices } from "@/lib/yahoo";
import type { Holding } from "@/types/portfolio";

const holdings = holdingsData as Holding[];

export async function GET() {
  const symbols = holdings.map((h) => h.yahooSymbol);
  const prices = await getPrices(symbols);
  return Response.json(prices);
}