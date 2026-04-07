"use client"

import type * as React from "react"
import {
  IconDashboard,
  IconList,
  IconWallet,
} from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav/nav-documents"
import { NavMain } from "@/components/nav/nav-main"
// import { NavSecondary } from "@/components/nav/nav-secondary"
import { NavUser } from "@/components/nav/nav-user"
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
  ],
  /* navDocuments: [
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
  ], */
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconWallet className="!size-5" />
                <span className="text-base font-semibold">Finance Tracker</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.navDocuments} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
