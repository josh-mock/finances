const API_URL = "http://localhost:3000";

export const fetchBanks = async () => {
  const res = await fetch(`${API_URL}/banks`);
  if (!res.ok) throw new Error("Failed to fetch banks");
  return res.json();
};

export const createBank = async (bank) => {
  const res = await fetch("http://localhost:3000/banks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bank),
  });
  if (!res.ok) throw new Error("Failed to create bank");
  return res.json();
};
