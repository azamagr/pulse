import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CATEGORY_COLORS, formatCurrency } from "../utils/format";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { category, revenue } = payload[0].payload;
  return (
    <div className="bg-ink text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium">{category}</p>
      <p className="font-mono mt-0.5">{formatCurrency(revenue)}</p>
    </div>
  );
}

function renderLegend({ payload }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-3">
      {payload.map((entry) => (
        <li key={entry.value} className="flex items-center gap-1.5 text-xs text-muted">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </li>
      ))}
    </ul>
  );
}

export default function CategoryPieChart({ data }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <h3 className="font-display font-semibold text-sm mb-4">Revenue share by category</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="revenue"
              nameKey="category"
              cx="50%"
              cy="45%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || "var(--color-emerald)"} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
