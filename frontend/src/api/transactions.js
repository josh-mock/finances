const API_URL = import.meta.env.VITE_API_URL;

export const fetchTransactions = async () => {
  const res = await fetch(`${API_URL}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const createTransaction = async (transaction) => {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) throw new Error("Failed to create transaction");
  return res.json();
};
