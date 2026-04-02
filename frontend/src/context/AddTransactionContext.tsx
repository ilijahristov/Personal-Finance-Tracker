import { createContext, useContext, useState } from "react"

interface AddTransactionContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const AddTransactionContext = createContext<AddTransactionContextType | null>(null)

export function AddTransactionProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AddTransactionContext.Provider value={{
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }}>
      {children}
    </AddTransactionContext.Provider>
  )
}

export function useAddTransaction() {
  const ctx = useContext(AddTransactionContext)
  if (!ctx) throw new Error("useAddTransaction must be used within AddTransactionProvider")
  return ctx
}
