import { useQuery } from "@tanstack/react-query";
import Currency from "../../components/Currency/Currency";
import { fetchUsInterestTable } from "../../api/dashboard";

export default function UsInterestTable() {
  const { data: usInterestTable = [] } = useQuery({
    queryKey: ["usInterestTable"],
    queryFn: fetchUsInterestTable,
  });

  if (!usInterestTable.length)
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
          {usInterestTable.map((row) => (
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
                    <Currency value={row.total} />
                  </strong>
                ) : (
                  <Currency value={row.total} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
