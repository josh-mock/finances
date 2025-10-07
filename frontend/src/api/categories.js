import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/categories`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to fetch categories");
  }
};

export const createCategory = async (category) => {
  try {
    const { data } = await axios.post(`${API_URL}/categories`, category);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to create category");
  }
};

export const updateCategory = async (id, category) => {
  try {
    const { data } = await axios.put(`${API_URL}/categories/${id}`, category);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to update category");
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/categories/${id}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error ?? "Failed to delete category");
  }
};
