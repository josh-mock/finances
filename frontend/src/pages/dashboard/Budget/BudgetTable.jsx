import { useQuery } from "@tanstack/react-query";
import { fetchBudgetTable } from "../../../api/dashboard";
import Currency from "../../../components/Currency/Currency";

export default function BudgetTable() {
  const { data: budgetTable = [] } = useQuery({
    queryKey: ["budgetTable"],
    queryFn: fetchBudgetTable,
  });

  if (!budgetTable.length) return <div className="table__empty">No data.</div>;

  const rows = budgetTable.filter((row) => row.category !== "Total");
  const totalRow = budgetTable.find((row) => row.category === "Total");

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budgeted Amount</th>
            <th>Spent This Month</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((budget) => (
            <tr key={budget.category}>
              <td>{budget.category}</td>
              <td>
                <Currency value={budget.budgeted_amount} />
              </td>
              <td>
                <Currency value={budget.spent_this_month} />
              </td>
              <td>
                <Currency value={budget.remaining} />
              </td>
            </tr>
          ))}
          {totalRow && (
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>
                  <Currency value={totalRow.budgeted_amount} />
                </strong>
              </td>
              <td>
                <strong>
                  <Currency value={totalRow.spent_this_month} />
                </strong>
              </td>
              <td>
                <strong>
                  <Currency value={totalRow.remaining} />
                </strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
