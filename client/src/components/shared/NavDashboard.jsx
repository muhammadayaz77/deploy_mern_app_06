"use client"
import { Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function NavDashboard() {
  const { open, toggleSidebar } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-16 border-b bg-background z-50 flex items-center px-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4 transition-all duration-300">
        {open ? (
          <ArrowLeft className="h-5 w-5 transition-transform duration-300" />
        ) : (
          <Menu className="h-5 w-5 transition-transform duration-300" />
        )}
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="font-semibold text-lg mr-auto">Your App</div>

      <Button variant="ghost" asChild className="ml-auto">
        <Link to="/" className="flex items-center gap-2">
          <span>Dashboard</span>
        </Link>
      </Button>
    </div>
  )
}
