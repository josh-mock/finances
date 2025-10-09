import { useQuery } from "@tanstack/react-query";
import { fetchFbarTable } from "../../api/fbar";
import Currency from "../../components/Currency/Currency";
import styles from "./fbar.module.css";
import UsInterestTable from "./UsInterestTable";

export default function Fbar() {
  const { data: fbar = [], isLoading } = useQuery({
    queryKey: ["fbarTable"],
    queryFn: fetchFbarTable,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!fbar) return <div>No data</div>;

  return (
    <div>
      <h2 className={styles.title}>FBAR</h2>
      <p className={styles.paragraph}>
        Highest balance may not be calculated correctly if transactions have not
        been added in order. Double check with bank statements, and endeavour to
        add transactions in the correct order.
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Bank</th>
            <th>Bank Address</th>
            <th>Highest balance (£)</th>
            <th>Highest balance ($)</th>
          </tr>
        </thead>
        <tbody>
          {fbar.map((row) => (
            <tr key={row.account_name}>
              <td>{row.account_name}</td>
              <td>{row.bank_legal_name}</td>
              <td>{row.bank_address}</td>
              <td>
                <Currency value={row.highest_balance_last_year} />
              </td>
              <td>
                <Currency value={row.highest_balance_usd} symbol="$" roundUp />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Interest</h2>
      <UsInterestTable />
    </div>
  );
}
