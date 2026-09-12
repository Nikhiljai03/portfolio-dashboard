"use client";

import { useEffect, useState } from "react";
import SectorTable from "@/components/SectorTable";
import type { Portfolio } from "@/types/portfolio";

const REFRESH_INTERVAL = 15 * 1000; // 15 seconds

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data: Portfolio = await res.json();
        setPortfolio(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not refresh prices. Showing the last loaded data.");
      }
    }

    loadPortfolio();
    const timer = setInterval(loadPortfolio, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  if (!portfolio) {
    return (
      <p className="py-10 text-center text-gray-500">
        {error ? "Could not load the portfolio. Please try again later." : "Loading portfolio..."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <span>Auto-refreshes every 15 seconds</span>
        <span>
          Last updated: {new Date(portfolio.lastUpdated).toLocaleTimeString("en-IN")}
        </span>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      {portfolio.sectors.map((group) => (
        <SectorTable key={group.sector} group={group} />
      ))}
    </div>
  );
}
