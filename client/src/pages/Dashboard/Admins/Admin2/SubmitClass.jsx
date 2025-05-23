"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Loader2, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSelector } from "react-redux"
import axios from "axios"
// import { APPROVE_GRADES_API_ENDPOINT } from "../../../utils/constants"
// import useGetAllStudents from "../../../custom-hooks/useGetAllStudents"

export default function SubmitClass() {
  const initStudent = useSelector((store) => store.teacher)
  const student = initStudent.students || []

  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)

  // Sync with Redux updates
  useEffect(() => {
    if (student.length > 0) {
      setStudents(student)
    } else {
      setStudents([])
    }
  }, [student])

  // useGetAllStudents()

  // Filter students by search term
  const filteredStudents = useMemo(() => {
    return students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [students, searchTerm])

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

  // Approve all grades
  // const onApprove = async () => {
  //   setIsLoading(true)
  //   try {
  //     const response = await axios.post(
  //       APPROVE_GRADES_API_ENDPOINT,
  //       {
  //         students,
  //         subject: "Mathematics",
  //         term: "current",
  //         approved: true,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       },
  //     )

  //     if (response.data.success) {
  //       window.toastify("Grades approved successfully", "success")
  //     } else {
  //       window.toastify(response.data.message || "Failed to approve grades", "error")
  //     }
  //   } catch (error) {
  //     console.error("Error approving grades:", error)
  //     window.toastify(error.response?.data?.message || "Error approving grades", "error")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="space-y-4 lg:p-10 md:p-5 p-3">
      <div className="sm:flex justify-between items-center">
        <div className="relative w-full max-w-sm mb-3 sm:mb-0">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          // onClick={onApprove}
          disabled={isLoading || isDataLoading}
          className="bg-green-600 hover:bg-green-700 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Approving...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Approve Grades
            </>
          )}
        </Button>
      </div>

      {isDataLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2">Loading students data...</span>
        </div>
      ) : (
        <div className="rounded-md border">
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => {
                  const total = calculateTotal(student)
                  return (
                    <TableRow key={student._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.assignment1 || 0}</TableCell>
                      <TableCell>{student.assignment2 || 0}</TableCell>
                      <TableCell>{student.quiz1 || 0}</TableCell>
                      <TableCell>{student.quiz2 || 0}</TableCell>
                      <TableCell>{student.mid || 0}</TableCell>
                      <TableCell>{student.final || 0}</TableCell>
                      <TableCell className="font-medium">{total}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    {student.length === 0 ? "You are not assigned to any class" : "No students match your search"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
