import { BarChart3 } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <BarChart3 className="w-10 h-10 text-muted mx-auto" strokeWidth={1.5} />
      <h2 className="font-display font-semibold text-lg mt-4">No sales in this window</h2>
      <p className="text-sm text-muted mt-2">
        There's no order data for the selected date range yet. Try a wider range.
      </p>
    </div>
  );
}
