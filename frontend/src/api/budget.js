const API_URL = import.meta.env.VITE_API_URL;

export const fetchBudget = async () => {
  const res = await fetch(`${API_URL}/budget`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to fetch budget");
  }
  return res.json();
};

export const updateBudget = async (amounts) => {
  const res = await fetch(`${API_URL}/budget`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amounts }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update budget");
  }

  return res.json();
};
