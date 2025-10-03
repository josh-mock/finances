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