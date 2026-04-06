"use client"

import { useLocation } from "react-router-dom"
import { useAddTransaction } from "@/context/AddTransactionContext"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { openModal } = useAddTransaction()

  const titleMap: Record<string, string> = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/categories": "Categories",
  }
  
  // In component:
  const { pathname } = useLocation()
  const title = titleMap[pathname] ?? "Dashboard"
  
  // Replace hardcoded "Dashboard" with {title}

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=offcanvas]/sidebar-wrapper:h-12"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        {pathname === "/transactions" && (
          <button
            className="ml-auto bg-black text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            onClick={openModal}
          >
            + Add Transaction
          </button>
        )}
      </div>
    </header>
  )
}
