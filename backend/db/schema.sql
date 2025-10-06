CREATE TABLE banks (
    id SERIAL PRIMARY KEY,
    legal_name TEXT NOT NULL UNIQUE,
    display_name TEXT UNIQUE,
    address TEXT
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    bank_id INTEGER REFERENCES banks(id),
    account_name TEXT NOT NULL,
    account_type TEXT NOT NULL CHECK (account_type IN ('bank', 'credit')),
    account_number TEXT UNIQUE,
    year_opened SMALLINT,
    year_closed SMALLINT,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    is_isa BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL UNIQUE
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES accounts(id),
    date DATE NOT NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    type TEXT NOT NULL CHECK (type IN ('Income', 'Expense', 'Transfer In', 'Transfer Out'))
);