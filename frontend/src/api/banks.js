const API_URL = import.meta.env.VITE_API_URL;

export const fetchBanks = async () => {
  const res = await fetch(`${API_URL}/banks`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch banks");
  }
  return res.json();
};

export const createBank = async (bank) => {
  const res = await fetch(`${API_URL}/banks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bank),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create bank");
  }
  return res.json();
};

export const updateBank = async (id, bank) => {
  const res = await fetch(`${API_URL}/banks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bank),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update bank");
  }
  return res.json();
};

export const deleteBank = async (id) => {
  const res = await fetch(`${API_URL}/banks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to delete bank");
  }
  return res.json();
};
