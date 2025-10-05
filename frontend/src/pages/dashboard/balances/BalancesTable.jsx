import { useQuery } from "@tanstack/react-query";
import { fetchBalances } from "../../../api/dashboard";

export default function BalancesTable() {
  const { data: balances = [] } = useQuery({
    queryKey: ["balances"],
    queryFn: fetchBalances,
  });

  return (
    <div>
      <table>
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
                <td>{`£${Number(balance.balance / 100).toLocaleString()}`}</td>
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
