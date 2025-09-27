const API_URL = "http://localhost:3000";

export const fetchAccounts = async () => {
  const res = await fetch(`${API_URL}/accounts`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
};
