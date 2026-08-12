import { DollarSign, ShoppingBag, Receipt } from "lucide-react";
import StatCard from "./StatCard";
import { formatCurrency } from "../utils/format";

export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={DollarSign}
        label="Total Revenue"
        value={formatCurrency(stats.totalRevenue)}
        change={stats.totalRevenueChange}
        index={0}
      />
      <StatCard
        icon={ShoppingBag}
        label="Total Orders"
        value={stats.totalOrders.toLocaleString()}
        change={stats.totalOrdersChange}
        index={1}
      />
      <StatCard
        icon={Receipt}
        label="Avg Order Value"
        value={formatCurrency(stats.avgOrderValue)}
        change={stats.avgOrderValueChange}
        index={2}
      />
    </div>
  );
}
