import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBudget = async () => {
  try {
    const response = await axios.get(`${API_URL}/budget`);
    return response.data;
  } catch (err) {
    const message = err.response?.data?.error ?? "Failed to fetch budget";
    throw new Error(message);
  }
};

export const updateBudget = async (amounts) => {
  try {
    const response = await axios.put(`${API_URL}/budget`, { amounts });
    return response.data;
  } catch (err) {
    const message = err.response?.data?.error ?? "Failed to update budget";
    throw new Error(message);
  }
};
