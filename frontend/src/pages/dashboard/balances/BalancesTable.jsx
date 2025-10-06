import { useQuery } from "@tanstack/react-query";
import { fetchBalances } from "../../../api/dashboard";
import formatCurrency from "../../../lib/formatCurrency";

export default function BalancesTable() {
  const { data: balances = [] } = useQuery({
    queryKey: ["balances"],
    queryFn: fetchBalances,
  });

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Balance</th>
            <th>Last Transaction</th>
          </tr>
        </thead>
        <tbody>
          {balances
            .sort((a, b) => a.account_name.localeCompare(b.account_name))
            .map((balance) => (
              <tr key={balance.account_id}>
                <td>{balance.account_name}</td>
                <td>
                  <div className="currency">
                    <span className="currency__symbol">£</span>
                    <span className="currency__value">
                      {formatCurrency(balance.balance)}
                    </span>
                  </div>
                </td>
                <td>
                  {new Date(balance.last_transaction).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
