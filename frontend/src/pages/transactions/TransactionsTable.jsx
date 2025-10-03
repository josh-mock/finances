import { fetchTransactions } from "../../api/transactions";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function TransactionsTable() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const data = transactions;
  const columns = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => dayjs(getValue()).format("YYYY/MM/DD"),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) =>
        `£${(getValue() / 100).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "account_name", header: "Account" },
    { accessorKey: "category", header: "Category" },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (transactions.length === 0) {
    return <div className="table__empty">No transactions.</div>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
