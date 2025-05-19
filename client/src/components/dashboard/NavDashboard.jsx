import React, { useReducer } from "react";
import { ChevronLeft } from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import useLogout from '../../custom-hooks/useLogout'
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/Slices/authSlice";
import { setRemoveData } from "../../redux/Slices/adminSlice";

function NavDashboard({ toggleSidebar, sidebarOpen }) {
  const navigate = useNavigate();
  const logout = useLogout();
  const dispatch = useDispatch();
  let {user} = useSelector(store => store.auth) || {}
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout()
      .then((res) => {
        // console.log("Logout successful:", res.data);
        dispatch(setLogout());
        dispatch(setRemoveData());
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
    <header className="flex h-14 items-center justify-between border-b px-4 md:px-6 z-50 bg-[#B9B2F1] text-white">
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

        <h1 className="text-lg font-semibold">
          {
            user?.role === 'student' ? 'Student ' : user?.role === 'sup_admin' ? "Super Admin " :
            user?.role === 'admin1' ? "Admin no. 1 " :  user?.role === 'admin1' ? "Admin no. 2 " : ''
          } 
          Dashboard</h1>
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
            {
              user.role === 'student' ?
            <DropdownMenuItem
              asChild
              className="flex items-center gap-3 text-base p-2 hover:rounded-md cursor-pointer w-full"
            >
              <Link to="/student/profile">
                <span>
                  <FaUserCircle className="h-5 w-5" />
                </span>
                <span className="text-gray-700">My Profile</span>
              </Link>
            </DropdownMenuItem>
            :
            ""
            }
            <DropdownMenuItem
              asChild
              className="flex items-center gap-3 text-base p-2 hover:rounded-md cursor-pointer w-full"
            >
              <Link to={`${user.role === 'student' ? '/student/credentials/change' : user.role === 'sup_admin' ? '/sup-admin/credentials/change' : ''}`} className="flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer">
                <span>
                  <TbLockPassword className="h-5 w-5" />
                </span>
                <span className="text-gray-700">Change Password</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="flex items-center gap-3 text-base p-2 hover:rounded-md cursor-pointer w-full"
            >
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 text-base p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer w-full text-left"
              >
                <span>
                  <MdLogout className="h-5 w-5" />
                </span>
                <span className="text-gray-700">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default NavDashboard;