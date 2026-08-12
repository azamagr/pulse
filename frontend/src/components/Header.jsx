import { Activity } from "lucide-react";

const RANGES = [
  { value: 7, label: "7 days" },
  { value: 30, label: "30 days" },
  { value: 90, label: "90 days" },
];

export default function Header({ range, setRange }) {
  return (
    <header className="border-b border-line bg-panel">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald" strokeWidth={2.5} />
          <div>
            <h1 className="font-display font-bold text-lg leading-none">Pulse</h1>
            <p className="text-xs text-muted mt-1">Sales at a glance</p>
          </div>
        </div>

        <div className="flex items-center bg-bg border border-line rounded-full p-1 self-start sm:self-auto">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                range === r.value ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
            >
              Last {r.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
