CREATE TABLE banks (
    id SERIAL PRIMARY KEY,
    legal_name TEXT NOT NULL UNIQUE,
    display_name TEXT UNIQUE,
    address TEXT
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    bank_id INTEGER REFERENCES banks(id),  -- nullable for credit cards or cash
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('bank', 'credit')),
    account_number TEXT UNIQUE,
    date_opened DATE,
    date_closed DATE,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
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