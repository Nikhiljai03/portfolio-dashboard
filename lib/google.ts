import * as cheerio from "cheerio";

export type Fundamentals = {
  peRatio: number | null;
  latestEarnings: number | null;
};

function toNumber(text: string): number | null {
  const value = parseFloat(text.replace(/[^0-9.-]/g, ""));
  return Number.isNaN(value) ? null : value;
}

export async function getFundamentals(symbol: string): Promise<Fundamentals> {
  try {
    const res = await fetch(`https://www.google.com/finance/quote/${symbol}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const findValue = (label: string) =>
      $("div").filter((_, el) => $(el).text() === label).first().next().text();

    return {
      peRatio: toNumber(findValue("P/E ratio")),
      latestEarnings: toNumber(findValue("EPS")),
    };
  } catch (error) {
    console.error(`Google fetch failed for ${symbol}:`, error);
    return { peRatio: null, latestEarnings: null };
  }
}
