"use client"

import { Routes, Route } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AddTransactionProvider } from "@/context/AddTransactionContext"
import TransactionsPage from "@/pages/transactions/TransactionsPage"
import IncomePage from "@/pages/income/IncomePage"
import ExpensesPage from "@/pages/expenses/ExpensesPage"
import CategoriesPage from "@/pages/categories/CategoriesPage"

export default function App() {
  return (
    <AddTransactionProvider>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Routes>
                <Route path="/" element={<SectionCards />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/income" element={<IncomePage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </AddTransactionProvider>
  )
}
