import { useQuery } from "@tanstack/react-query";
import Currency from "../../../components/Currency/Currency";
import { fetchUkInterestTable } from "../../../api/dashboard";

export default function UkInterestTable() {
  const { data: ukInterestTable = [] } = useQuery({
    queryKey: ["ukInterestTable"],
    queryFn: fetchUkInterestTable,
  });

  if (!ukInterestTable.length)
    return <div className="table__empty">No data.</div>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {ukInterestTable.map((row) => (
            <tr key={row.account_name}>
              <td>
                {row.account_name === "Total" ? (
                  <strong>{row.account_name}</strong>
                ) : (
                  row.account_name
                )}
              </td>
              <td>
                {row.account_name === "Total" ? (
                  <strong>
                    <Currency value={row.total_interest} />
                  </strong>
                ) : (
                  <Currency value={row.total_interest} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
