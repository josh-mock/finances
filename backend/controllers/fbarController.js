import pool from "../db/db.js";

export const getFbarTable = async (req, res) => {
  try {
    const exchangeRate = parseFloat(process.env["31_DECEMBER_EXCHANGE_RATE"]);
    if (isNaN(exchangeRate)) {
      throw new Error("Invalid 31_DECEMBER_EXCHANGE_RATE value in .env file");
    }

    const result = await pool.query(
      `
      WITH
        tx_last_year AS (
          SELECT
            t.account_id,
            t.date,
            SUM(
              CASE
                WHEN t.type IN ('Income', 'Transfer In') THEN t.amount
                ELSE -t.amount
              END
            ) OVER (
              PARTITION BY t.account_id
              ORDER BY t.date, t.id
            ) AS running_balance
          FROM transactions t
          WHERE EXTRACT(YEAR FROM t.date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1
        ),
        open_accounts AS (
          SELECT id
          FROM accounts
          WHERE
            (
              year_opened IS NULL
              OR year_opened <= EXTRACT(YEAR FROM CURRENT_DATE) - 1
            )
            AND (
              year_closed IS NULL
              OR year_closed >= EXTRACT(YEAR FROM CURRENT_DATE) - 1
            )
            AND account_type = 'bank'
        )
      SELECT
        a.account_name,
        b.legal_name AS bank_legal_name,
        b.address AS bank_address,
        MAX(tx.running_balance) AS highest_balance_last_year,
        MAX(tx.running_balance) / $1::numeric AS highest_balance_usd
      FROM accounts a
      JOIN open_accounts oa ON a.id = oa.id
      JOIN banks b ON a.bank_id = b.id
      JOIN tx_last_year tx ON a.id = tx.account_id
      GROUP BY
        a.account_name,
        b.legal_name,
        b.address
      ORDER BY
        a.account_name;
    `,
      [exchangeRate]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
