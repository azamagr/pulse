import { CloudOff, RotateCcw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <CloudOff className="w-10 h-10 text-muted mx-auto" strokeWidth={1.5} />
      <h2 className="font-display font-semibold text-lg mt-4">Couldn't load the dashboard</h2>
      <p className="text-sm text-muted mt-2">We couldn't reach the sales data right now.</p>
      <p className="text-xs text-muted/70 font-mono mt-3">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 mt-6 bg-ink text-white font-medium text-sm px-5 py-2.5 rounded-full hover:brightness-110 transition"
      >
        <RotateCcw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
}
