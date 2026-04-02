"use client"

import type * as React from "react"
import {
  IconDashboard,
  IconHelp,
  IconList,
  IconReport,
  IconSettings,
  IconTag,
  IconTrendingDown,
  IconTrendingUp,
  IconWallet,
  IconFileSpreadsheet,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/placeholder.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: IconList,
    },
    {
      title: "Income",
      url: "/income",
      icon: IconTrendingUp,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: IconTrendingDown,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: IconTag,
    },
  ],
  navDocuments: [
    {
      name: "Monthly Summary",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Export CSV",
      url: "#",
      icon: IconFileSpreadsheet,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "#",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              render={<link href="/" />}
            >
              <IconWallet className="!size-5" />
              <span className="text-base font-semibold">Finance Tracker</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navDocuments} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
