import { memo } from "react";
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";
import type { PortfolioRow, SectorGroup } from "@/types/portfolio";

const features = tableFeatures({});
const helper = createColumnHelper<typeof features, PortfolioRow>();

function gainLossColor(value: number | null) {
  if (value === null) return "text-gray-400";
  return value >= 0
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
}

const columns = helper.columns([
  helper.accessor("name", { header: "Particulars" }),
  helper.accessor("purchasePrice", {
    header: "Purchase Price",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  helper.accessor("qty", { header: "Qty" }),
  helper.accessor("investment", {
    header: "Investment",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  helper.accessor("portfolioPercent", {
    header: "Portfolio (%)",
    cell: (info) => formatPercent(info.getValue()),
  }),
  helper.accessor("code", { header: "NSE/BSE" }),
  helper.accessor("cmp", {
    header: "CMP",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  helper.accessor("presentValue", {
    header: "Present Value",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  helper.accessor("gainLoss", {
    header: "Gain/Loss",
    cell: (info) => (
      <span className={gainLossColor(info.getValue())}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  helper.accessor("peRatio", {
    header: "P/E Ratio",
    cell: (info) => formatNumber(info.getValue()),
  }),
  helper.accessor("latestEarnings", {
    header: "Latest Earnings",
    cell: (info) => formatCurrency(info.getValue()),
  }),
]);

function SectorTable({ group }: { group: SectorGroup }) {
  const table = useTable({ features, columns, data: group.rows });

  return (
    <section className="rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <h2 className="text-lg font-semibold">{group.sector}</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span>Investment: {formatCurrency(group.totalInvestment)}</span>
          <span>Present Value: {formatCurrency(group.totalPresentValue)}</span>
          <span className={gainLossColor(group.gainLoss)}>
            Gain/Loss: {formatCurrency(group.gainLoss)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left dark:bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="whitespace-nowrap px-4 py-2 font-medium">
                    <table.FlexRender header={header} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 dark:border-gray-800">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-4 py-2">
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default memo(SectorTable);
