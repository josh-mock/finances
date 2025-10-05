const API_URL = import.meta.env.VITE_API_URL;

export const fetchTransactions = async () => {
  const res = await fetch(`${API_URL}/transactions`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch transactions");
  }
  return res.json();
};

export const createTransaction = async (transaction) => {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create transaction");
  }
  return res.json();
};

export const updateTransaction = async (id, transaction) => {
  const res = await fetch(`${API_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update transaction");
  }
  return res.json();
};

export const deleteTransaction = async (id) => {
  const res = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to delete transaction");
  }
  return res.json();
};
