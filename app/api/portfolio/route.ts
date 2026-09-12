import { buildPortfolio } from "@/lib/portfolio";

export async function GET() {
  try {
    const portfolio = await buildPortfolio();
    return Response.json(portfolio);
  } catch (error) {
    console.error("Failed to build portfolio:", error);
    return Response.json(
      { error: "Could not load portfolio data. Please try again." },
      { status: 500 },
    );
  }
}