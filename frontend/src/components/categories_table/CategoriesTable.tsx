import { useState, useEffect } from "react"
import { getAllTransactions, type Transaction } from "@/api/transactions"
import { DataTable } from "@/components/categories_table/data-table"
import { columns } from "@/components/categories_table/columns"

export default function CategoriesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    getAllTransactions().then(setTransactions).catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={transactions} />
    </div>
  )
}
