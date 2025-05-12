import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// react-icons
import { FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";


// Drop down imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function NavDashboard({ toggleSidebar, sidebarOpen }) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:px-6 z-50 bg-[#B9B2F1] text-white">
      <div className="flex items-center">
      <button
  onClick={toggleSidebar}
  className="mr-3 transition-all duration-300 ease-in-out cursor-pointer"
  aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
>
  <div className="relative h-6 w-6">
    <span
      className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
        sidebarOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45"
      }`}
    >
      <ChevronLeft className="h-6 w-6" />
    </span>

    <span
      className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
        sidebarOpen ? "opacity-0 scale-0 -rotate-45" : "opacity-100 scale-100 rotate-0"
      }`}
    >
      <RiMenu2Line className="h-6 w-6 font-bold" />
    </span>
  </div>
</button>

        <h1 className="text-lg font-semibold">Student Dashboard</h1>
      </div>
      <div className="flex items-center gap-5 mr-5">
        <FaBell className="text-white border-white h-5 w-5" />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:border-none">
            <Avatar className="cursor-pointer h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
            asChild
            className="flex items-center gap-3 text-base p-2 hover:rounded-md cursor-pointer w-full"
            >
            <Link
              to="/student/profile"
              
              >
              <span>
                <FaUserCircle className="h-5 w-5" />
              </span>
              <span className="text-gray-700">My Profile</span>
            </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
            asChild
            className="flex items-center gap-3 text-base p-2 hover:rounded-md cursor-pointer w-full"
            >

            <div className="flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer">
              <span>
                <TbLockPassword className="h-5 w-5" />
              </span>
              <span className="text-gray-700">Change Password</span>
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem
            asChild
            className="flex items-center gap-3 text-base p-2 hover:rounded-md cursor-pointer w-full"
            >
            <Link to='/web/login' className="flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer">
              <span>
                <MdLogout className="h-5 w-5" />
              </span>
              <span className="text-gray-700">Logout</span>
            </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default NavDashboard;
