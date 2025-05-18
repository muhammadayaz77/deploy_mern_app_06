import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetAllAdmin from "../../../custom-hooks/useGetAllAdmin";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import { REMOVE_ADMIN_API_ENDPOINT } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setRemoveAdmin } from "../../../redux/Slices/adminSlice";
import { useState } from "react";

export default function ManageAdmin() {
  const { loading, error } = useGetAllAdmin();
  const admins = useSelector(store => store.admin.user);
  const currentUser = useSelector(store => store.auth.user); // Get current user info
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveAdmin = async (id) => {
    // Check if current user is super admin
    if (currentUser?.role !== 'sup_admin') {
      window.toastify('Only Super Admin can remove admins','error');
      return;
    }

    setIsRemoving(true);
    try {
      const response = await axios.post(
        REMOVE_ADMIN_API_ENDPOINT,
        { id },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data.success) {
        dispatch(setRemoveAdmin(id));
        window.toastify('Admin removed successfully','success');
      } else {
        window.toastify(response.data.message || 'Failed to remove admin','error');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error removing admin';
      window.toastify(errorMsg,'error');
      console.error("Remove error:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Table className="sm:w-[80%] mx-5 sm:mx-auto mt-2">
      <TableCaption>
        {loading ? 'Loading admins...' : 
         admins.length <= 0 ? 'No admins available' : 'List of all admins'}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[100px]">Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.length > 0 ? admins.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell className="font-medium">
              {item.role}
              {item.role === 'sup_admin' && ' (Super Admin)'}
            </TableCell>
            <TableCell className="text-right flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="mr-4 cursor-pointer">
                    <PiDotsThreeOutlineFill />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleRemoveAdmin(item._id)}
                    disabled={isRemoving || currentUser?.role !== 'sup_admin'}
                    className={currentUser?.role !== 'sup_admin' ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    <span className="flex items-center gap-2">
                      <FcCancel />
                      <span>Remove</span>
                      {currentUser?.role !== 'sup_admin' && ' (Super Admin Only)'}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        )) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-600">
              
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}