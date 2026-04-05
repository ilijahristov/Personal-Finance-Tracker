import { createContext, useContext, useState } from "react"

interface AddTransactionContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  refreshKey: number
  triggerRefresh: () => void
}

const AddTransactionContext = createContext<AddTransactionContextType | null>(null)

export function AddTransactionProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const triggerRefresh = () => setRefreshKey((k) => k + 1)

  return (
    <AddTransactionContext.Provider value={{
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
      refreshKey,
      triggerRefresh,
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
