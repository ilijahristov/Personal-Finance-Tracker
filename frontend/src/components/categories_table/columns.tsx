import { type Transaction } from "@/api/transactions"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category ?? "Uncategorized",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type
      const isIncome = type === "income"

      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            isIncome
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
          }`}
        >
          {type}
        </span>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const isIncome = row.original.type === "income"
      const sign = isIncome ? "+" : "-"
      const formatted = Math.abs(row.original.amount).toLocaleString("en-GB", {
        style: "currency",
        currency: "USD",
      })

      return `${sign}${formatted}`
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description ?? "—",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("en-GB"),
  },
]