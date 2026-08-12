import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, change, index = 0 }) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="rounded-xl border border-line bg-panel p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted uppercase tracking-wide">{label}</span>
        <Icon className="w-4 h-4 text-muted" />
      </div>
      <p className="font-mono font-semibold text-2xl mt-3">{value}</p>
      <div
        className={`flex items-center gap-1 text-xs font-medium mt-2 ${
          isPositive ? "text-emerald" : "text-rose"
        }`}
      >
        {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        {Math.abs(change)}% vs previous period
      </div>
    </motion.div>
  );
}
