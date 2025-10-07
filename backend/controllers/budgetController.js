import pool from "../db/db.js";

export const getBudget = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.*,
        COALESCE(AVG(monthly.total), 0) AS average_monthly_spend
      FROM categories c
      LEFT JOIN (
          SELECT 
              category_id,
              DATE_TRUNC('month', date) AS month,
              SUM(amount) AS total
          FROM transactions
          WHERE type = 'Expense'
          GROUP BY category_id, DATE_TRUNC('month', date)
      ) monthly ON monthly.category_id = c.id
      WHERE c.include_in_budget = TRUE
      GROUP BY c.id
      ORDER BY c.category;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { amounts } = req.body;

    const entries = Object.entries(amounts);

    const valuesClause = entries
      .map(
        (_, index) => `($${index * 2 + 1}::integer, $${index * 2 + 2}::integer)`
      )
      .join(", ");

    const values = entries.flatMap(([id, amount]) => [
      Number(id),
      Number(amount),
    ]);

    const query = `
      UPDATE categories AS c
      SET budgeted_amount = u.amount
      FROM (VALUES ${valuesClause}) AS u(id, amount)
      WHERE c.id = u.id
    `;

    await pool.query(query, values);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
