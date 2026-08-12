import { useState, useEffect, useCallback } from "react";
import { fetchDashboard } from "../api/dashboardApi";

export function useDashboard(range) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setErrorMessage("");
      try {
        const result = await fetchDashboard(range);
        if (cancelled) return;
        setData(result);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message || "Couldn't load dashboard data.");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [range, reloadToken]);

  return { data, status, errorMessage, retry };
}
