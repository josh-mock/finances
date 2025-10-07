import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAccounts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/accounts`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch accounts");
  }
};

export const createAccount = async (account) => {
  try {
    const { data } = await axios.post(`${API_URL}/accounts`, account);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to create account");
  }
};

export const updateAccount = async (id, account) => {
  try {
    const { data } = await axios.put(`${API_URL}/accounts/${id}`, account);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to update account");
  }
};

export const deleteAccount = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/accounts/${id}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to delete account");
  }
};
