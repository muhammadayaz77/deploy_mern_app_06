import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidbar"
import { NavDashboard } from "./NavDashboard"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col">
        <NavDashboard />
        <div className="flex flex-1 pt-16 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-auto transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
