import pool from "../../db/db.js";

export const getBalances = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
          a.id AS account_id,
          a.account_name,
          COALESCE(SUM(
              CASE 
                  WHEN t.type IN ('Expense', 'Transfer Out') THEN -t.amount
                  ELSE t.amount
              END
          ), 0) AS balance,
          MAX(t.date) AS last_transaction
      FROM accounts a
      LEFT JOIN transactions t ON a.id = t.account_id
      WHERE a.is_closed = FALSE
      GROUP BY a.id, a.account_name
      ORDER BY a.id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
