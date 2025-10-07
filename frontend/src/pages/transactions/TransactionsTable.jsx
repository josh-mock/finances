import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";
import { fetchTransactions } from "../../api/transactions";
import DeleteTransactionButton from "./DeleteTransactionButton";
import EditTransactionModal from "./EditTransactionModal";
import TransactionFilters from "./transactionFilters";

export default function TransactionsTable() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [editingTransaction, setEditingTransaction] = useState(null);

  const accountOptions = Array.from(
    new Set(transactions.map((t) => t.account_name))
  ).sort();
  const categoryOptions = Array.from(
    new Set(transactions.map((t) => t.category))
  ).sort();
  const typeOptions = Array.from(
    new Set(transactions.map((t) => t.type))
  ).sort();

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
        const amount = row.getValue(columnId);
        if (value.min && amount < value.min * 100) return false;
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
          .toLowerCase()
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
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="table__actions">
          <button
            className="table__button"
            onClick={() => setEditingTransaction(row.original)}
          >
            Edit
          </button>
          <DeleteTransactionButton id={row.original.id} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = (id, value) => {
    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== id),
      { id, value },
    ]);
  };

  if (!transactions.length)
    return <div className="table__empty">No transactions.</div>;

  return (
    <div className="table-container">
      <TransactionFilters
        columnFilters={columnFilters}
        handleFilterChange={handleFilterChange}
        accountOptions={accountOptions}
        categoryOptions={categoryOptions}
        typeOptions={typeOptions}
      />

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

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}

      <div className="pagination">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
