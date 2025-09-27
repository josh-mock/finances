import pool from "../db/db.js";

export const getAllBanks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banks");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBankById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM banks WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Bank not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBank = async (req, res) => {
  try {
    const { legal_name, display_name, address } = req.body;
    const result = await pool.query(
      "INSERT INTO banks (legal_name, display_name, address) VALUES ($1, $2, $3) RETURNING *",
      [legal_name, display_name, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBank = async (req, res) => {
  try {
    const { id } = req.params;
    const { legal_name, display_name, address } = req.body;
    const result = await pool.query(
      "UPDATE banks SET legal_name=$1, display_name=$2, address=$3 WHERE id=$4 RETURNING *",
      [legal_name, display_name, address, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Bank not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBank = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM banks WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Bank not found" });
    res.json({ message: "Bank deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
