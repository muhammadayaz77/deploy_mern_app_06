import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useGetAllTeachersAndClasses from "../../../custom-hooks/useGetAllTeachersAndClasses"
import { useSelector } from "react-redux"
import axios from "axios"
import { ASSIGN_TEACHER_API_ENDPOINT } from "../../../utils/constants"



function Assign() {
  // First dropdown state
  const [openTeacher, setOpenTeacher] = useState(false)
  const [teacherValue, setTeacherValue] = useState("")

  // Second dropdown state
  const [openClass, setOpenClass] = useState(false)
  const [classValue, setClassValue] = useState("")

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  // data from redux

  const { teachers } = useSelector(store => store.admin);
  const { classes } = useSelector(store => store.admin);


  // hooks to get all teachers and classes
  useGetAllTeachersAndClasses();
  
  // Submit function to handle the data
  const handleSubmit = async() => {
    if (!teacherValue || !classValue) return;

    setIsSubmitting(true);

    // Simulate API call

      const dataToSubmit = {
        teacherId: teacherValue,
        classId: classValue,
      }

      console.log("Submitting data:", dataToSubmit)
      setSubmittedData(dataToSubmit)
      setIsSubmitting(false)

      // Here is the actual API call to send the data to the backend
      await axios.post(ASSIGN_TEACHER_API_ENDPOINT,dataToSubmit,{
        headers : {
          'Content-Type' : 'application/json'
        },
        withCredentials : true
      })
      .then(res => {
        console.log(res)
        window.toastify(res.data.message,'success')
      })
      .catch(err => {
        window.toastify(err.response.data.messsage,'error')
      })
  }

  return (
    <div className="space-y-6">
      <Table className="sm:w-[80%] mx-5 sm:mx-auto mt-2">
        <TableCaption>Teacher and Class Assignment</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Class</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              {/* Teacher Dropdown */}
              <Popover open={openTeacher} onOpenChange={setOpenTeacher}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTeacher}
                    className="w-[200px] justify-between"
                  >
                    {teacherValue
                      ? teachers.find((framework) => framework._id === teacherValue)?.name
                      : "Select Teacher..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search teacher..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No teacher found.</CommandEmpty>
                      <CommandGroup>
                        {teachers.map((framework) => (
                          <CommandItem
                            key={framework._id}
                            value={framework._id}
                            onSelect={(currentValue) => {
                              setTeacherValue(currentValue === teacherValue ? "" : currentValue)
                              setOpenTeacher(false)
                            }}
                          >
                            {framework.name}  
                            <Check
                              className={cn("ml-auto", teacherValue === framework._id ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </TableCell>

            {/* Class Dropdown */}
            <TableCell>
              <Popover open={openClass} onOpenChange={setOpenClass}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openClass}
                    className="w-[200px] justify-between"
                  >
                    {classValue
                      ? classes.find((framework) => framework._id === classValue)?.name
                      : "Select Class..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search class..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No class found.</CommandEmpty>
                      <CommandGroup>
                        {classes.map((framework) => (
                          <CommandItem
                            key={framework._id}
                            value={framework._id}
                            onSelect={(currentValue) => {
                              setClassValue(currentValue === classValue ? "" : currentValue)
                              setOpenClass(false)
                            }}
                          >
                            {framework.name}
                            <Check
                              className={cn("ml-auto", classValue === framework._id ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </TableCell>

            {/* Save Button with Transition */}
            <TableCell className="text-right">
              <Button
                onClick={handleSubmit}
                disabled={!teacherValue || !classValue || isSubmitting}
                className={cn(
                  "bg-green-600 hover:bg-green-700 transition-all duration-300",
                  isSubmitting && "opacity-70",
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      
    </div>
  )
}

export default Assign
