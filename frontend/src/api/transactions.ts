const BASE_URL = 'http://localhost:3000' as const;

export interface TransactionPayload {
  amount: number
  type: string
  category: string | null
  description: string | null
  date: string
}

export interface Transaction extends TransactionPayload {
  id: string
  created_at: string
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function getTransactionById(id: string): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions/${id}`);
  if (!res.ok) throw new Error('Transaction not found');
  return res.json();
}

export async function createTransaction(data: TransactionPayload): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create transaction');
  return res.json();
}

export async function updateTransaction(id: string, data: TransactionPayload): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update transaction');
  return res.json();
}

export async function deleteTransaction(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete transaction');
}
