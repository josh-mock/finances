import pool from "../db/db.js";

export const getAllAccounts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         a.id,
         a.bank_id,
         b.display_name AS bank_name,
         a.account_name,
         a.account_type,
         a.account_number,
         a.year_opened,
         a.year_closed,
         a.is_closed,
         a.is_isa
       FROM accounts a
       LEFT JOIN banks b ON a.bank_id = b.id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const {
      bank_id,
      account_name,
      account_type,
      account_number,
      year_opened,
      year_closed,
      is_closed,
      is_isa,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO accounts (
        bank_id, 
        account_name, 
        account_type, 
        account_number, 
        year_opened, 
        year_closed, 
        is_closed,
        is_isa
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        bank_id,
        account_name,
        account_type,
        account_number,
        year_opened,
        year_closed,
        is_closed,
        is_isa,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bank_id,
      account_name,
      account_type,
      account_number,
      year_opened,
      year_closed,
      is_closed,
      is_isa
    } = req.body;

    const result = await pool.query(
      `UPDATE accounts 
       SET 
         bank_id = $1, 
         account_name = $2, 
         account_type = $3, 
         account_number = $4, 
         year_opened = $5, 
         year_closed = $6, 
         is_closed = $7,
         is_isa = $8 
       WHERE id = $9 
       RETURNING *`,
      [
        bank_id,
        account_name,
        account_type,
        account_number,
        year_opened,
        year_closed,
        is_closed,
        is_isa,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM accounts WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
