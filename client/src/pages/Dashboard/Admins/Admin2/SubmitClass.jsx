"use client"

import { useState, useMemo } from "react"
import { Search, Loader2, Check, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSelector } from "react-redux"
import useGetAllSubmitClass from "../../../../custom-hooks/useGetAllSubmitClass"
import { cn } from "@/lib/utils"

export default function SubmitClass() {
  const initData = useSelector((store) => store.admin.submitClass)

  // Mock data structure for multiple classes
  const [classes, setClasses] = useState(initData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingStates, setLoadingStates] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [expandedClasses, setExpandedClasses] = useState({});

  // Sync with Redux updates
  // useEffect(() => {
  //   if (initData.classes && initData.classes.length > 0) {
  //     setClasses(initData.classes)
  //   } else {
  //     // Mock data for demonstration - replace with your actual data structure
  //     setClasses([
  //       {
  //         id: "class1",
  //         name: "Mathematics - Grade 10A",
  //         subject: "Mathematics",
  //         term: "Fall 2023",
  //         teacher: "Mr. Johnson",
  //         students: initData.students?.slice(0, 5) || [],
  //       },
  //       {
  //         id: "class2",
  //         name: "Physics - Grade 10B",
  //         subject: "Physics",
  //         term: "Fall 2023",
  //         teacher: "Ms. Smith",
  //         students: initData.students?.slice(5, 10) || [],
  //       },
  //       {
  //         id: "class3",
  //         name: "Chemistry - Grade 11A",
  //         subject: "Chemistry",
  //         term: "Fall 2023",
  //         teacher: "Dr. Williams",
  //         students: initData.students?.slice(0, 8) || [],
  //       },
  //     ])
  //   }
  // }, [initData]);

  useGetAllSubmitClass();

  // Filter classes by search term
  const filteredClasses = useMemo(() => {
    return classes.filter((classItem) => classItem.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [classes, searchTerm])

  // Calculate total grade for each student
  const calculateTotal = (student) => {
    const assignment1 = Number(student.assignment1) || 0
    const assignment2 = Number(student.assignment2) || 0
    const quiz1 = Number(student.quiz1) || 0
    const quiz2 = Number(student.quiz2) || 0
    const mid = Number(student.mid) || 0
    const final = Number(student.final) || 0

    return assignment1 + assignment2 + quiz1 + quiz2 + mid + final
  }

  // Approve grades for a specific class
  // const onApproveClass = async (classId) => {
  //   setLoadingStates((prev) => ({ ...prev, [classId]: true }))

  //   try {
  //     // Find the class to approve
  //     const classToApprove = classes.find((c) => c.id === classId)

  //     // Mock API call
  //     await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

  //     // Success message
  //     window.toastify(`Grades for ${classToApprove.name} approved successfully`, "success")
  //   } catch (error) {
  //     console.error("Error approving grades:", error)
  //     window.toastify("Error approving grades", "error")
  //   } finally {
  //     setLoadingStates((prev) => ({ ...prev, [classId]: false }))
  //   }
  // }

  // Toggle class expansion
  const toggleClass = (classId) => {
    setExpandedClasses((prev) => ({
      ...prev,
      [classId]: !prev[classId],
    }))
  }

  return (
    <div className="space-y-4 lg:p-10 md:p-5 p-3">
      <div className="relative w-full max-w-sm mb-6">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search classes..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-2 text-sm text-muted-foreground">Click on a class to view student details</div>

      {isDataLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2">Loading classes data...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <div key={classItem._id} className="border rounded-md overflow-hidden">
                <div
                  className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors duration-200"
                  onClick={() => toggleClass(classItem.id)}
                >
                  <div>
                    <h3 className="text-lg font-semibold">{classItem.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {classItem.subject} • {classItem.term} • Teacher: {classItem.teacher} •{" "}
                      {classItem.pendingMarks.length} students
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onApproveClass(classItem.id)
                      }}
                      disabled={loadingStates[classItem.id]}
                      className="bg-green-600 hover:bg-green-700 cursor-pointer"
                      size="sm"
                    >
                      {loadingStates[classItem._id] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Approving...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </>
                      )}
                    </Button>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        expandedClasses[classItem.id] && "transform rotate-180",
                      )}
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    expandedClasses[classItem.id] ? "max-h-[2000px] opacity-100 py-4" : "max-h-0 opacity-0 py-0",
                  )}
                >
                  <div className="px-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[80px] font-bold">S.No</TableHead>
                          <TableHead className="font-bold">Name</TableHead>
                          <TableHead className="font-bold">Assignment 1 (0-5)</TableHead>
                          <TableHead className="font-bold">Assignment 2 (0-5)</TableHead>
                          <TableHead className="font-bold">Quiz 1 (0-5)</TableHead>
                          <TableHead className="font-bold">Quiz 2 (0-5)</TableHead>
                          <TableHead className="font-bold">Mid (0-30)</TableHead>
                          <TableHead className="font-bold">Final (0-50)</TableHead>
                          <TableHead className="font-bold">Total (0-100)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classItem.pendingMarks.length > 0 ? (
                          classItem.pendingMarks.map((stud, index) => {
                            const total = calculateTotal(stud)
                            return (
                              <TableRow key={stud._id || index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{stud.student?.name}</TableCell>
                                <TableCell>{stud.assignment1 || 0}</TableCell>
                                <TableCell>{stud.assignment2 || 0}</TableCell>
                                <TableCell>{stud.quiz1 || 0}</TableCell>
                                <TableCell>{stud.quiz2 || 0}</TableCell>
                                <TableCell>{stud.mid || 0}</TableCell>
                                <TableCell>{stud.final || 0}</TableCell>
                                <TableCell className="font-medium">{total}</TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-4">
                              No students in this class
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 border rounded-md">No classes found</div>
          )}
        </div>
      )}
    </div>
  )
}
