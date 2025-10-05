import pool from "../db/db.js";

export const getAllTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         t.id,
         t.date,
         t.amount,
         t.description,
         t.type,
         a.account_name,
         c.category
       FROM transactions t
       INNER JOIN accounts a ON t.account_id = a.id
       LEFT JOIN categories c ON t.category_id = c.id
       ORDER BY t.date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { date, amount, description, type, account_id, category_id } =
      req.body;

    const result = await pool.query(
      `INSERT INTO transactions (
        date, 
        amount, 
        description, 
        type, 
        account_id, 
        category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [date, amount, description, type, account_id, category_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
