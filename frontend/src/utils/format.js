export function formatCurrency(n) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export const CATEGORY_COLORS = {
  Electronics: "var(--color-sky)",
  Apparel: "var(--color-violet)",
  Home: "var(--color-amber)",
  Beauty: "var(--color-rose)",
  Sports: "var(--color-emerald)",
};
