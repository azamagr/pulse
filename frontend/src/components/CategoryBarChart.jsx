import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { CATEGORY_COLORS } from "../utils/format";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { category, count } = payload[0].payload;
  return (
    <div className="bg-ink text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium">{category}</p>
      <p className="font-mono mt-0.5">{count} orders</p>
    </div>
  );
}

export default function CategoryBarChart({ data }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <h3 className="font-display font-semibold text-sm mb-4">Orders by category</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: "var(--color-muted)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-line)" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-muted)" }}
              tickLine={false}
              axisLine={false}
              width={32}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-bg)" }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || "var(--color-emerald)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
