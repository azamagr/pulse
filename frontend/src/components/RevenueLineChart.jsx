import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatCurrency, formatShortDate } from "../utils/format";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-ink text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium">{formatShortDate(label)}</p>
      <p className="font-mono mt-0.5">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function RevenueLineChart({ data }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <h3 className="font-display font-semibold text-sm mb-4">Revenue over time</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatShortDate}
              tick={{ fontSize: 11, fill: "var(--color-muted)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-line)" }}
              minTickGap={24}
            />
            <YAxis
              tickFormatter={(v) => `$${v}`}
              tick={{ fontSize: 11, fill: "var(--color-muted)" }}
              tickLine={false}
              axisLine={false}
              width={56}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-emerald)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
