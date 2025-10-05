const API_URL = import.meta.env.VITE_API_URL;

export const fetchBalances = async () => {
  const res = await fetch(`${API_URL}/dashboard/balances`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch balances");
  }
  return res.json();
};
