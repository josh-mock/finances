const API_URL = import.meta.env.VITE_API_URL;

export const fetchAccounts = async () => {
  const res = await fetch(`${API_URL}/accounts`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
};
