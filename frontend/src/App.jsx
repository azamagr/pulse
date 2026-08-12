import { useState } from "react";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import RevenueLineChart from "./components/RevenueLineChart";
import CategoryBarChart from "./components/CategoryBarChart";
import CategoryPieChart from "./components/CategoryPieChart";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import { useDashboard } from "./hooks/useDashboard";

export default function App() {
  const [range, setRange] = useState(30);
  const { data, status, errorMessage, retry } = useDashboard(range);

  return (
    <div className="min-h-screen bg-bg text-ink font-body">
      <Header range={range} setRange={setRange} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState message={errorMessage} onRetry={retry} />}

        {status === "success" && data.stats.totalOrders === 0 && <EmptyState />}

        {status === "success" && data.stats.totalOrders > 0 && (
          <div className="space-y-4">
            <StatCards stats={data.stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <RevenueLineChart data={data.revenueByDay} />
              <CategoryBarChart data={data.ordersByCategory} />
            </div>

            <CategoryPieChart data={data.revenueByCategory} />
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-5 sm:px-8 py-10 text-xs text-muted/70 font-mono">
        Pulse · Express + MongoDB aggregation · Week 4 internship task
      </footer>
    </div>
  );
}
