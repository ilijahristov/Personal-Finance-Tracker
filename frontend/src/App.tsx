"use client"

import { Routes, Route } from "react-router-dom"
import { AppSidebar } from "@/components/nav/app-sidebar"
import { SiteHeader } from "@/components/header/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AddTransactionProvider } from "@/context/AddTransactionContext"
import TransactionsPage from "@/pages/transactions/TransactionsPage"
import DashboardPage from "@/pages/dashboard/DashboardPage"

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
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                
              </Routes>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </AddTransactionProvider>
  )
}
