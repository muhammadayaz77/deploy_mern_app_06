import {  X } from "lucide-react"
import SubNavDashboard from "../../components/dashboard/SubNavDashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import ChangePasswordForm from "../../components/dashboard/ChangePasswordForm";
import { useSelector } from "react-redux";



function ChangePassword() {
  let {user} = useSelector(store => store.auth);
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
  <Link to={user.role ==='sup_admin' ? '/sup-admin/create-admin' : user.role === 'admin1' ? '/admin/assign-class' : user.role === 'admin2' ? '/admin/get/classes' : user.role === 'teacher' ? '/teacher/add-marks' : user.role === 'student' ? '/student/profile' : '/'}>
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
    <ChangePasswordForm />
</div>
      </div>
    </div>
    </div>
  )
}

export default ChangePassword