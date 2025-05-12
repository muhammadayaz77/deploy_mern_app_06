import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// react-icons
import { FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

// Drop down imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function NavDashboard({toggleSidebar,sidebarOpen}) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:px-6 z-50 bg-[#B9B2F1]">
            <div className='flex items-center'>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            <h1 className="text-lg font-semibold">Student Dashboard</h1>
            </div>
            <div className='flex items-center gap-5 mr-5'>
              <FaBell className='text-white border-white h-5 w-5' />
             
                        <DropdownMenu>
  <DropdownMenuTrigger className='focus:border-none'>
  <Avatar className='cursor-pointer h-10 w-10'>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>

  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <div className='flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer'>
    <span><FaUserCircle className='h-5 w-5' /></span>
    <span className='text-gray-700'>My Profile</span>
    </div>
    <div className='flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer'>
    <span><TbLockPassword className='h-5 w-5' /></span>
    <span className='text-gray-700'>Change Password</span>
    </div>
    <div className='flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer'>
    <span><MdLogout className='h-5 w-5' /></span>
    <span className='text-gray-700'>Logout</span>
    </div>
  </DropdownMenuContent>
</DropdownMenu>
            </div>
          </header>
  )
}

export default NavDashboard