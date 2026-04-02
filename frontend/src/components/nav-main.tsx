"use client"

import { useNavigate, useMatch } from "react-router-dom"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItemProps {
  title: string
  url: string
  icon?: Icon
}

function NavItem({ item }: { item: NavItemProps }) {
  const navigate = useNavigate()
  const match = useMatch(item.url === "/" ? { path: "/", end: true } : item.url)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.title}
        isActive={!!match}
        onClick={() => navigate(item.url)}
      >
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function NavMain({ items }: { items: NavItemProps[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
