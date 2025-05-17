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

// React Icons
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import { REMOVE_ADMIN_API_ENDPOINT } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setRemoveAdmin } from "../../../redux/Slices/adminSlice";


export default function ManageAdmin() {
  const {loading, error } = useGetAllAdmin();
  const admins = useSelector(store => store.admin.user);
  const dispatch = useDispatch();
  let handleClick = async(id) => {
    await axios.post(REMOVE_ADMIN_API_ENDPOINT,{id},{
      headers : {
        'Content-Type' : 'application/json'
      },
      withCredentials : true
    })
    .then(res => {
      console.log(res)
      dispatch(setRemoveAdmin(id))
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <Table className="sm:w-[80%] mx-5 sm:mx-auto mt-2">
            <TableCaption>{admins.length <= 0 ? 'Admins not available.' : 'A list of admins' }</TableCaption>
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
            <TableCell className="font-medium">{item.role}</TableCell>
            <TableCell className="text-right flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="mr-4">
                    <PiDotsThreeOutlineFill />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  <DropdownMenuLabel>Setting</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleClick(item._id)}><span><FcCancel /></span><span>Remove</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))
        : 
        <TableRow className=''>
        <span className="text-gray-600"></span>
        </TableRow>
      }
      </TableBody>
    </Table>
  );
}
