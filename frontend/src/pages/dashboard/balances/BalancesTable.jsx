import { useQuery } from "@tanstack/react-query";
import { fetchBalancesTable } from "../../../api/dashboard";
import Currency from "../../../components/Currency/Currency";

export default function BalancesTable() {
  const { data: balancesTable = [] } = useQuery({
    queryKey: ["balancesTable"],
    queryFn: fetchBalancesTable,
  });

  if (!balancesTable.length)
    return <div className="table__empty">No data.</div>;

  const total_balance = balancesTable[0]?.total_balance || 0;
  const accounts = balancesTable
    .map(({ total_balance, ...rest }) => rest)
    .sort((a, b) => a.account_name.localeCompare(b.account_name));

  return (
    <div className="dashboard__table-container">
      <table className="table balances-table">
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
                <Currency value={balance.balance} />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <strong>Total</strong>
            </td>
            <td>
              <strong>
                <Currency value={total_balance} />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
