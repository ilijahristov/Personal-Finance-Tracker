const BASE_URL = 'http://localhost:3000';

// GET all transactions
export async function getAllTransactions() {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
  
}

// GET one transaction by id
export async function getTransactionById(id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`);
  if (!res.ok) throw new Error('Transaction not found');
  return res.json();
}

// POST - create new transaction
export async function createTransaction(data) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create transaction');
  return res.json();
}

// PUT - update existing transaction
export async function updateTransaction(id, data) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update transaction');
  return res.json();
}

// DELETE - delete transaction
export async function deleteTransaction(id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete transaction');
}