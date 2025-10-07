import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTransactions = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/transactions`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch transactions");
  }
};

export const createTransaction = async (transaction) => {
  try {
    const { data } = await axios.post(`${API_URL}/transactions`, transaction);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to create transaction");
  }
};

export const updateTransaction = async (id, transaction) => {
  try {
    const { data } = await axios.put(`${API_URL}/transactions/${id}`, transaction);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to update transaction");
  }
};

export const deleteTransaction = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/transactions/${id}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to delete transaction");
  }
};
