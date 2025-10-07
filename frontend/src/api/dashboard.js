import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBalancesTable = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/dashboard/balances/table`);
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error ?? "Failed to fetch balances table"
    );
  }
};

export const fetchBalancesGraph = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/dashboard/balances/graph`);
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error ?? "Failed to fetch balances graph"
    );
  }
};

export const fetchNetTable = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/dashboard/net/table`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch net table");
  }
};

export const fetchNetGraph = async (period = "day") => {
  try {
    const { data } = await axios.get(`${API_URL}/dashboard/net/graph`, {
      params: { period },
    });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch net graph");
  }
};

export const fetchBudgetTable = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/dashboard/budget/table`);
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error ?? "Failed to fetch budget table"
    );
  }
};
