import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useNavigate,Link } from 'react-router-dom';
import useLogout from '../../custom-hooks/useLogout';
import { useDispatch, useSelector } from 'react-redux';


// React Icons

import { GrUserAdmin } from "react-icons/gr";
import { Home, User, BookOpen, Calendar, Settings, LogOut } from "lucide-react"
import { LiaUsersCogSolid } from "react-icons/lia";
import { setRemoveData } from '../../redux/Slices/adminSlice';
import { setLogout } from '../../redux/Slices/authSlice';


function Sidebar({sidebarOpen}) {
  let {user} = useSelector(store => store.auth);
  // console.log("user : ",user)
  const navigate = useNavigate();
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const dispatch = useDispatch()

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout()
      .then((res) => {
        console.log("Logout successful:", res.data);
        window.toastify(res.data.message,'success');
        dispatch(setRemoveData())
        dispatch(setLogout());
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
            <p className="text-sm font-medium leading-none">{user.name || "Guest"}</p>
            <p className="text-xs text-muted-foreground">{user.email || ''}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <nav className="flex flex-col gap-1">
          {
            user.role === 'student' ?
            <>
          <Link
            to="/student/dashboard"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent text-black "
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/student/profile"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          </>
          :
          user.role === 'sup_admin'
          ?
          <>
          <Link
            to="/sup-admin/create-admin"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <GrUserAdmin className="h-4 w-4" />
            <span>Create Admin</span>
          </Link>
          <Link
            to="/sup-admin/manage-admin"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <LiaUsersCogSolid className="h-4 w-4" />
            <span>Manage Admin</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
            </>
            :
            <></>
          }
        </nav>

        <div className="mt-auto pt-4 border-t">
          <button
           onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-accent w-full cursor-pointer"
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