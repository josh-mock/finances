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
      filterFn: (row, columnId, value) => {
        if (!value?.min && !value?.max) return true;
        const date = dayjs(row.getValue(columnId));
        if (value.min && date.isBefore(dayjs(value.min), "day")) return false;
        if (value.max && date.isAfter(dayjs(value.max), "day")) return false;
        return true;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) =>
        `£${(getValue() / 100).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      filterFn: (row, columnId, value) => {
        if (!value?.min && !value?.max) return true;
        const amount = row.getValue(columnId); // already in pennies
        if (value.min && amount < value.min * 100) return false; // convert pounds to pennies
        if (value.max && amount > value.max * 100) return false;
        return true;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      filterFn: (row, columnId, value) => {
        if (!value) return true;
        return row
          .getValue(columnId)
          ?.toLowerCase()
          .includes(value.toLowerCase());
      },
    },
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
    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== id),
      { id, value },
    ]);
  };

  if (transactions.length === 0) {
    return <div className="table__empty">No transactions.</div>;
  }

  return (
    <div className="table-container">
      <div>
        <h2>Filters</h2>

        <h3>Description</h3>
        <input
          type="text"
          value={columnFilters.find((f) => f.id === "description")?.value || ""}
          onChange={(e) => handleFilterChange("description", e.target.value)}
        />

        <h3>Amount</h3>
        <label>
          Min:
          <input
            type="number"
            step="0.01"
            value={
              columnFilters.find((f) => f.id === "amount")?.value?.min || ""
            }
            onChange={(e) =>
              handleFilterChange("amount", {
                ...columnFilters.find((f) => f.id === "amount")?.value,
                min: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            step="0.01"
            value={
              columnFilters.find((f) => f.id === "amount")?.value?.max || ""
            }
            onChange={(e) =>
              handleFilterChange("amount", {
                ...columnFilters.find((f) => f.id === "amount")?.value,
                max: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </label>

        <h3>Date</h3>
        <label>
          From:
          <input
            type="date"
            value={columnFilters.find((f) => f.id === "date")?.value?.min || ""}
            onChange={(e) =>
              handleFilterChange("date", {
                ...columnFilters.find((f) => f.id === "date")?.value,
                min: e.target.value || undefined,
              })
            }
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={columnFilters.find((f) => f.id === "date")?.value?.max || ""}
            onChange={(e) =>
              handleFilterChange("date", {
                ...columnFilters.find((f) => f.id === "date")?.value,
                max: e.target.value || undefined,
              })
            }
          />
        </label>

        <h3>Account</h3>
        {accountOptions.map((account) => {
          const values =
            columnFilters.find((f) => f.id === "account_name")?.value || [];
          return (
            <label key={account}>
              <input
                type="checkbox"
                checked={values.includes(account)}
                onChange={() =>
                  handleFilterChange(
                    "account_name",
                    values.includes(account)
                      ? values.filter((v) => v !== account)
                      : [...values, account]
                  )
                }
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
                onChange={() =>
                  handleFilterChange(
                    "category",
                    values.includes(category)
                      ? values.filter((v) => v !== category)
                      : [...values, category]
                  )
                }
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
                onChange={() =>
                  handleFilterChange(
                    "type",
                    values.includes(type)
                      ? values.filter((v) => v !== type)
                      : [...values, type]
                  )
                }
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
