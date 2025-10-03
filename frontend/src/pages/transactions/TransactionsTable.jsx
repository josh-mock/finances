import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";
import { fetchTransactions } from "../../api/transactions";

export default function TransactionsTable() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const [columnFilters, setColumnFilters] = useState([]);

  const data = transactions;

  const accountOptions = Array.from(
    new Set(transactions.map((t) => t.account_name))
  );

  const categoryOptions = Array.from(
    new Set(transactions.map((t) => t.category))
  );

  const typeOptions = Array.from(new Set(transactions.map((t) => t.type)));

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
    {
      accessorKey: "type",
      header: "Type",
      filterFn: (row, columnId, filterValues) =>
        filterValues.length === 0 ||
        filterValues.includes(row.getValue(columnId)),
    },
    {
      accessorKey: "account_name",
      header: "Account",
      cell: ({ getValue }) => getValue(),
      filterFn: (row, columnId, filterValues) =>
        filterValues.length === 0 ||
        filterValues.includes(row.getValue(columnId)),
    },
    {
      accessorKey: "category",
      header: "Category",
      filterFn: (row, columnId, filterValues) =>
        filterValues.length === 0 ||
        filterValues.includes(row.getValue(columnId)),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleFilterChange = (id, value) => {
    const currentFilter = columnFilters.find((f) => f.id === id);
    let values = currentFilter?.value || [];

    if (values.includes(value)) {
      values = values.filter((v) => v !== value);
    } else {
      values = [...values, value];
    }

    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== id),
      { id, value: values },
    ]);
  };

  if (transactions.length === 0) {
    return <div className="table__empty">No transactions.</div>;
  }

  return (
    <div className="table-container">
      <div>
        <h2>Filters</h2>

        <h3>Account</h3>
        {accountOptions.map((account) => {
          const values =
            columnFilters.find((f) => f.id === "account_name")?.value || [];
          return (
            <label key={account}>
              <input
                type="checkbox"
                checked={values.includes(account)}
                onChange={() => handleFilterChange("account_name", account)}
              />
              {account}
            </label>
          );
        })}

        <h3>Category</h3>
        {categoryOptions.map((category) => {
          const values =
            columnFilters.find((f) => f.id === "category")?.value || [];
          return (
            <label key={category}>
              <input
                type="checkbox"
                checked={values.includes(category)}
                onChange={() => handleFilterChange("category", category)}
              />
              {category}
            </label>
          );
        })}

        <h3>Type</h3>
        {typeOptions.map((type) => {
          const values =
            columnFilters.find((f) => f.id === "type")?.value || [];
          return (
            <label key={type}>
              <input
                type="checkbox"
                checked={values.includes(type)}
                onChange={() => handleFilterChange("type", type)}
              />
              {type}
            </label>
          );
        })}
      </div>

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
