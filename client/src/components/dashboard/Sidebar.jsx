import React from 'react'

import { Home, User, BookOpen, Calendar, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useNavigate } from 'react-router-dom';
import useLogout from '../../custom-hooks/useLogout';


function Sidebar({sidebarOpen}) {
  const navigate = useNavigate();
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout()
      .then((res) => {
        console.log("Logout successful:", res.data);
        window.toastify(res.data.message,'success');
        navigate("/web/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        window.toastify(err.response.data.message,'error');
        // Optionally show error to user
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };
  return (
    <aside
    className={cn(
      "fixed inset-y-0 left-0 top-16 z-40 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
    )}
  >
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <nav className="flex flex-col gap-1">
          <a
            href="/student/dashboard"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a
            href="/student/profile"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </a>
          <a
            href="/student/courses"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </a>
          <a
            href="/student/schedule"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </a>
          <a
            href="/student/settings"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto pt-4 border-t">
          <button
           onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
  )
}

export default Sidebar