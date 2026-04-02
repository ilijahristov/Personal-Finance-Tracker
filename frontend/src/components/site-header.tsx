"use client"

import { useLocation } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {

  const titleMap: Record<string, string> = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/income": "Income",
    "/expenses": "Expenses",
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
        <h1 className="text-base font-medium">Dashboard</h1>
      </div>
    </header>
  )
}
