import { getAllTransactions, type Transaction } from "./transactions"

// key value pair to export the transactions by category(string)
export type TransactionsByCategory = Record<string, Transaction[]>

// function to get the transactions by category
export async function getTransactionsByCategory(): Promise<TransactionsByCategory> {
  const transactions = await getAllTransactions()

  // reduce the transactions to a key value pair of category and transactions
  // reduce loops through the transactions and adds the transaction to the category
  // acc is the accumulator, tx is the transaction
  // acc[key] is the category, acc[key] = [] is the transactions array
  // acc[key].push(tx) is the transaction added to the category
  // return acc is the accumulator
  // {} is the initial value of the accumulator
  return transactions.reduce<TransactionsByCategory>((acc, tx) => {
    // if the category is not in the transaction, set the category to Uncategorized
    const key = tx.category ?? "Uncategorized"
    // if the category is not in the accumulator, create a new bucket for the category
    if (!acc[key]) acc[key] = []
    acc[key].push(tx)
    return acc
  }, {})
}
