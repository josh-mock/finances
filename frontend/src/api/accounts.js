const API_URL = import.meta.env.VITE_API_URL;

export const fetchAccounts = async () => {
  const res = await fetch(`${API_URL}/accounts`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch accounts");
  }
  return res.json();
};

export const createAccount = async (account) => {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create account");
  }
  return res.json();
};

export const updateAccount = async (id, account) => {
  const res = await fetch(`${API_URL}/accounts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update account");
  }
  return res.json();
};

export const deleteAccount = async (id) => {
  const res = await fetch(`${API_URL}/accounts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to delete account");
  }
  return res.json();
};
