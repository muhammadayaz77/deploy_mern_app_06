import {  X } from "lucide-react"
import SubNavDashboard from "../../components/dashboard/SubNavDashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";



function ChangePassword() {
  return (
    <div className="bg-[#ECECEC] min-h-full">
    <SubNavDashboard />
    <div className="flex justify-center mt-10">
      <div className="w-[80%] grid grid-cols-12 rounded-xs shadow-lg overflow-hidden">
        <div className="lg:col-span-8 col-span-12">
          <img src="/public/changePassword.jpg" alt="Auth Image"
          className="w-full h-full object-center"
          />
        </div>
        <div className="lg:col-span-4 col-span-12 relative bg-white text-black shadow-md p-6">
  {/* Close button */}
  <Link to='/student/profile'>
  <div className="absolute top-4 right-4 group">
    <X className="h-6 w-6 text-gray-500 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-90 cursor-pointer" />
  </div>
  </Link>

  <div className="flex justify-center mt-4">
    <Avatar className="cursor-pointer h-20 w-20 transition-transform duration-300 hover:scale-105">
      <AvatarImage src="/placeholder.svg" alt="User" />
      <AvatarFallback className="bg-gray-200 text-gray-700">US</AvatarFallback>
    </Avatar>
  </div>

  <div className="mt-6 mb-6 text-center">
    <h3 className="primary-text text-xl font-semibold">Reset Password</h3>
  </div>

  <form>
    <div className="flex flex-col gap-6">
      {/* Old Password Field */}
      <div className="relative">
        <input 
          type="password" 
          className="w-full bg-transparent border-b-2 border-gray-300 text-black pt-5 pb-1 px-0 outline-none peer transition-all duration-300"
          placeholder=" "
        />
        <label className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform -translate-y-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none">
          Old Password
        </label>
        <div className="relative overflow-hidden h-0.5">
          <span className="absolute bottom-0 left-1/2 w-0 h-full bg-blue-500 transition-all duration-500 transform -translate-x-1/2 peer-focus:w-full"></span>
        </div>
      </div>

      {/* New Password Field */}
      <div className="relative">
        <input 
          type="password" 
          className="w-full bg-transparent border-b-2 border-gray-300 text-black pt-5 pb-1 px-0 outline-none peer transition-all duration-300"
          placeholder=" "
        />
        <label className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform -translate-y-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none">
          New Password
        </label>
        <div className="relative overflow-hidden h-0.5">
          <span className="absolute bottom-0 left-1/2 w-0 h-full bg-blue-500 transition-all duration-500 transform -translate-x-1/2 peer-focus:w-full"></span>
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <div className="mt-8">
      <button className="w-full py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-500 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group">
        <span>UPDATE PASSWORD</span>
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </form>
</div>
      </div>
    </div>
    </div>
  )
}

export default ChangePassword