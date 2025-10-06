import { useQuery } from "@tanstack/react-query";
import { fetchBalances } from "../../../api/dashboard";
import formatCurrency from "../../../lib/formatCurrency";

export default function BalancesTable() {
  const { data: balances = [] } = useQuery({
    queryKey: ["balances"],
    queryFn: fetchBalances,
  });

  const total_balance = balances[0]?.total_balance || 0;
  const accounts = balances
    .map(({ total_balance, ...rest }) => rest)
    .sort((a, b) => a.account_name.localeCompare(b.account_name));

  if (!balances.length) return <div className="table__empty">No data.</div>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Last Transaction</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((balance) => (
            <tr key={balance.account_id}>
              <td>{balance.account_name}</td>
              <td>{new Date(balance.last_transaction).toLocaleDateString()}</td>

              <td>
                <div className="currency">
                  <span className="currency__symbol">£</span>
                  <span className="currency__value">
                    {formatCurrency(balance.balance)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <strong>Total</strong>
            </td>
            <td>
              <div className="currency">
                <span className="currency__symbol">£</span>
                <strong className="currency__value">
                  {formatCurrency(total_balance)}
                </strong>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
