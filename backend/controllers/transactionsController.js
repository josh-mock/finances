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
         t.account_id,
         a.account_name,
         t.category_id,
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

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, description, type, account_id, category_id } =
      req.body;

    const result = await pool.query(
      `UPDATE transactions
         SET
          date = $1, 
          amount = $2, 
          description = $3, 
          type = $4, 
          account_id = $5, 
          category_id = $6 
        WHERE id = $7 
        RETURNING *`,
      [date, amount, description, type, account_id, category_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
