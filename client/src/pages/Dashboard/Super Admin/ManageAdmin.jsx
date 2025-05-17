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


export default function ManageAdmin() {
  const { admins, loading, error } = useGetAllAdmin();
  return (
    <Table className="sm:w-[80%] mx-5 sm:mx-auto mt-2">
      <TableCaption>A list of your admins.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[100px]">Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((item) => (
          <TableRow key={item.id}>
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
                  <DropdownMenuItem><span><FcCancel /></span><span>Remove</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
