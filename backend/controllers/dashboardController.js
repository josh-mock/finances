import pool from "../db/db.js";

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

export const getNetTable = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        'This month' AS period,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expenditure,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS net,
        1 AS sort_order
      FROM transactions
      WHERE date >= date_trunc('month', CURRENT_DATE)
        AND date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'

      UNION ALL

      SELECT 
        'Last month' AS period,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expenditure,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS net,
        2 AS sort_order
      FROM transactions
      WHERE date >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
        AND date < date_trunc('month', CURRENT_DATE)

      UNION ALL

      SELECT 
        'This year' AS period,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expenditure,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS net,
        3 AS sort_order
      FROM transactions
      WHERE date >= date_trunc('year', CURRENT_DATE)
        AND date < CURRENT_DATE + INTERVAL '1 day'

      UNION ALL

      SELECT 
        'All time' AS period,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expenditure,
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS net,
        4 AS sort_order
      FROM transactions;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
