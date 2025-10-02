CREATE MATERIALIZED VIEW net_income_mv AS
SELECT 'this_month' AS period,
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expenditure,
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS net,
       1 AS sort_order
FROM transactions
WHERE date >= date_trunc('month', CURRENT_DATE)
  AND date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'

UNION ALL

SELECT 'last_month' AS period,
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END),
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END),
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END),
       2 AS sort_order
FROM transactions
WHERE date >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
  AND date < date_trunc('month', CURRENT_DATE)

UNION ALL

SELECT 'this_year' AS period,
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END),
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END),
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END),
       3 AS sort_order
FROM transactions
WHERE date >= date_trunc('year', CURRENT_DATE)
  AND date < CURRENT_DATE + INTERVAL '1 day'

UNION ALL

SELECT 'all_time' AS period,
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END),
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END),
       SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) -
       SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END),
       4 AS sort_order
FROM transactions;
