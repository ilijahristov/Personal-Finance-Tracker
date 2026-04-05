import { useEffect, useState } from "react"
import { AddTransactionModal } from "@/components/AddTransactionModal"
import { DeleteCardModal } from "@/components/DeleteCardModal"
import { useAddTransaction } from "@/context/AddTransactionContext"
import { getAllTransactions, type Transaction } from "@/api/transactions"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TransactionsPage() {
  const { refreshKey, triggerRefresh } = useAddTransaction()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    getAllTransactions().then(setTransactions).catch(console.error)
  }, [refreshKey])

  return (
    <>
      <AddTransactionModal />
      <DeleteCardModal
        transactionId={deleteId}
        onClose={() => setDeleteId(null)}
        onDeleted={() => triggerRefresh()}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4 px-4 lg:px-6">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No transactions yet. Click "+ Add Transaction" to get started.
          </p>
        ) : (
          transactions.map((tx) => (
            <Card key={tx.id}>
              <CardHeader>
                <CardTitle>Transaction details</CardTitle>
                <CardAction>
                  <button
                    className="text-black text-lg font-bold cursor-pointer leading-none hover:opacity-60 transition-opacity"
                    onClick={() => setDeleteId(tx.id)}
                  >
                    &times;
                  </button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded text-white ${tx.type === "income" ? "bg-green-800" : "bg-red-800"
                    }`}>
                    {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {tx.description || <span className="italic">No description</span>}
                </p>                
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
