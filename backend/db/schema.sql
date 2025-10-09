CREATE TABLE
    banks (
        id SERIAL PRIMARY KEY,
        legal_name TEXT NOT NULL UNIQUE,
        display_name TEXT UNIQUE,
        address TEXT
    );

CREATE TABLE
    accounts (
        id SERIAL PRIMARY KEY,
        bank_id INTEGER REFERENCES banks (id),
        account_name TEXT NOT NULL,
        account_type TEXT NOT NULL CHECK (account_type IN ('bank', 'credit')),
        account_number TEXT UNIQUE,
        year_opened SMALLINT,
        year_closed SMALLINT,
        is_closed BOOLEAN NOT NULL DEFAULT FALSE,
        is_isa BOOLEAN NOT NULL DEFAULT FALSE
    );

CREATE TABLE
    categories (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL UNIQUE,
        include_in_budget BOOLEAN DEFAULT TRUE,
        budgeted_amount INTEGER DEFAULT 0
    );

CREATE TABLE
    transactions (
        id SERIAL PRIMARY KEY,
        account_id INTEGER NOT NULL REFERENCES accounts (id),
        date DATE NOT NULL,
        amount INTEGER NOT NULL,
        description TEXT,
        category_id INTEGER REFERENCES categories (id),
        type TEXT NOT NULL CHECK (
            type IN (
                'Income',
                'Expense',
                'Transfer In',
                'Transfer Out'
            )
        )
    );

-- Interest in calendar year
SELECT
    COALESCE(accounts.account_name, 'Total') AS account_name,
    SUM(transactions.amount) AS total
FROM
    transactions
    JOIN accounts ON transactions.account_id = accounts.id
WHERE
    "type" = 'Income'
    AND transactions.date >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
    AND transactions.date < DATE_TRUNC('year', CURRENT_DATE)
    AND category_id = (
        SELECT
            id
        FROM
            categories
        WHERE
            category = 'Interest'
    )
GROUP BY
    ROLLUP (accounts.account_name)
ORDER BY
    accounts.account_name;