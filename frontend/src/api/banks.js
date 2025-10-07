import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchBanks = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/banks`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch banks");
  }
};

export const createBank = async (bank) => {
  try {
    const { data } = await axios.post(`${API_URL}/banks`, bank);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to create bank");
  }
};

export const updateBank = async (id, bank) => {
  try {
    const { data } = await axios.put(`${API_URL}/banks/${id}`, bank);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to update bank");
  }
};

export const deleteBank = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/banks/${id}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to delete bank");
  }
};
