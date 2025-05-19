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
import SubNavDashboard from "../../../components/dashboard/SubNavDashboard";

export default function ManageAdmin() {
  const { loading, error } = useGetAllAdmin();
  const admins = useSelector((store) => store.admin.user);
  const currentUser = useSelector((store) => store.auth.user); // Get current user info
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveAdmin = async (id) => {
    try {
      const response = await axios.post(
        REMOVE_ADMIN_API_ENDPOINT,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setRemoveAdmin(id));
        // console.log("remove admin res : ", response);
        window.toastify(response.data.message, "success");
        return;
      } else {
        window.toastify(response.data.message, "error");
        console.log("remove admin err : ", response);
        return;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to remove admin";
      window.toastify(errorMsg, "error");
      return;
      if (err.response?.status === 401) {
        // Handle unauthorized (redirect to login)
        // window.location.href = '/login';
      }
    }
  };

  return (
    <>
      <SubNavDashboard />
      <Table className="sm:w-[80%] mx-5 sm:mx-auto mt-2">
        <TableCaption>
          {loading
            ? "Loading admins..."
            : admins.length <= 0
            ? "No admins available"
            : "List of all admins"}
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
          {admins.length > 0 ? (
            admins.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="font-medium">{item.role}</TableCell>
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
                        disabled={
                          isRemoving || currentUser?.role !== "sup_admin"
                        }
                        className={
                          currentUser?.role !== "sup_admin"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      >
                        <span className="flex items-center gap-2">
                          <FcCancel />
                          <span>Remove</span>
                          {currentUser?.role !== "sup_admin" &&
                            " (Super Admin Only)"}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-600"
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
