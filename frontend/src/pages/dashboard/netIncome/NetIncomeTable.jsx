import { useQuery } from "@tanstack/react-query";
import { fetchNetTable } from "../../../api/dashboard";
import Currency from "../../../components/Currency";

export default function NetIncomeTable() {
  const { data: netIncomeTable = [] } = useQuery({
    queryKey: ["netIncomeTable"],
    queryFn: fetchNetTable,
  });

  if (!netIncomeTable.length)
    return <div className="table__empty">No data.</div>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Period</th>
          <th>Income</th>
          <th>Expenditure</th>
          <th>Net</th>
        </tr>
      </thead>
      <tbody>
        {netIncomeTable
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((row) => (
            <tr key={row.period}>
              <td>{row.period}</td>
              <td>
                <Currency value={row.income} />
              </td>
              <td>
                <Currency value={row.expenditure} />
              </td>
              <td>
                <Currency value={row.net} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
