const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number | null): string {
  return value === null ? "—" : inr.format(value);
}

export function formatNumber(value: number | null): string {
  return value === null ? "—" : value.toFixed(2);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}
