
import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { ChevronLeft, ChevronRight, Home, User, BookOpen, Calendar, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import NavDashboard from "./NavDashboard"
import Sidebar from "./Sidebar"

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <NavDashboard toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} />
        {/* Main content - with proper transition */}
        <main
          className={cn("flex-1 overflow-auto transition-all duration-300 ease-in-out", "w-full")}
          style={{
            marginLeft: sidebarOpen && !isMobile ? "16rem" : "0",
          }}
        >
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
