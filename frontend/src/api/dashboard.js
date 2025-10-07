const API_URL = import.meta.env.VITE_API_URL;

export const fetchBalancesTable = async () => {
  const res = await fetch(`${API_URL}/dashboard/balances/table`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch balances table");
  }
  return res.json();
};

export const fetchBalancesGraph = async () => {
  const res = await fetch(`${API_URL}/dashboard/balances/graph`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch balances graph");
  }
  return res.json();
};

export const fetchNetTable = async () => {
  const res = await fetch(`${API_URL}/dashboard/net/table`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch net table");
  }
  return res.json();
};

export const fetchNetGraph = async (period = "day") => {
  const res = await fetch(`${API_URL}/dashboard/net/graph?period=${period}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch net graph");
  }
  return res.json();
};

export const fetchBudgetTable = async () => {
  const res = await fetch(`${API_URL}/dashboard/budget/table`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch budget table");
  }
  return res.json();
};
