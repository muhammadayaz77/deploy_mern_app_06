"use client"
import { Home, Settings, User, Mail, Calendar } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center py-4">
        <Avatar className="h-20 w-20 mb-2">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-medium mt-2">User Name</h3>
        <p className="text-sm text-muted-foreground">user@example.com</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Mail className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-center text-muted-foreground">© 2025 Your Company</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
