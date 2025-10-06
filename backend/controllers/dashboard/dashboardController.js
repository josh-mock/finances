import pool from "../../db/db.js";

export const getBalancesTable = async (req, res) => {
  try {
    const result = await pool.query(`
      WITH total AS (
        SELECT COALESCE(SUM(
          CASE 
            WHEN type IN ('Expense', 'Transfer Out') THEN -amount
            ELSE amount
          END
        ), 0) AS total_balance
        FROM transactions t
        JOIN accounts a ON t.account_id = a.id
        WHERE a.is_closed = FALSE
      )
      SELECT
        a.id AS account_id,
        a.account_name,
        COALESCE(SUM(
          CASE 
            WHEN t.type IN ('Expense', 'Transfer Out') THEN -t.amount
            ELSE t.amount
          END
        ), 0) AS balance,
        MAX(t.date) AS last_transaction,
        total.total_balance
      FROM accounts a
      LEFT JOIN transactions t ON a.id = t.account_id
      CROSS JOIN total
      WHERE a.is_closed = FALSE
      GROUP BY a.id, a.account_name, total.total_balance
      ORDER BY a.id;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBalancesGraph = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.account_name,
        COALESCE(SUM(
          CASE 
            WHEN t.type IN ('Expense', 'Transfer Out') THEN -t.amount
            ELSE t.amount
          END
        ), 0) AS balance
      FROM accounts a
      LEFT JOIN transactions t ON a.id = t.account_id
      WHERE a.is_closed = FALSE
        AND a.account_type != 'credit'
      GROUP BY a.account_name
      ORDER BY a.account_name;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
