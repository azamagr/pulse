const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchDashboard(range) {
  const res = await fetch(`${API_URL}/api/dashboard?range=${range}`);
  const body = await res.json();
  if (!res.ok || body.success === false) {
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }
  return body.data;
}
