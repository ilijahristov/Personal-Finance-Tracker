"use client"

import { deleteTransaction } from "@/api/transactions"


interface DeleteCardModalProps {
  transactionId: string | null
  onClose: () => void
  onDeleted: () => void
}

async function handleDelete(transactionId: string, onDeleted: () => void, onClose: () => void) {

  try {
    await deleteTransaction(transactionId)
    onDeleted()
    onClose()
  } catch {
  }
}



export function DeleteCardModal({ transactionId, onClose, onDeleted }: DeleteCardModalProps) {
  if (!transactionId) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="bg-white rounded-xl border border-black p-6 w-full max-w-sm relative flex flex-col items-center gap-4"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-black text-lg font-bold cursor-pointer leading-none hover:opacity-60 transition-opacity"
          onClick={onClose}
        >
          x
        </button>

        <h2 className="text-base font-semibold mt-2">Are you sure?</h2>
        <p className="text-sm text-gray-500 text-center">
          This will delete all data about this transaction
        </p>

        <button
          className="bg-black text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
          onClick={async () => { 
            handleDelete(transactionId, onDeleted, onClose)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}