import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        CMP from Yahoo Finance, P/E and Latest Earnings from Google Finance.
        These are unofficial sources, so values may be delayed or inaccurate.
      </p>
      <Dashboard />
    </main>
  );
}
