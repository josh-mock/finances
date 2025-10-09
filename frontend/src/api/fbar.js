import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchFbarTable = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/fbar`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch FBAR");
  }
};
