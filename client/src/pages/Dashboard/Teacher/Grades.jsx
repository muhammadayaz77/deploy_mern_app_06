import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSelector } from "react-redux"
import axios from "axios"
import { ADD_MARKS_API_ENDPOINT } from "../../../utils/constants"
import useGetAllStudents from "../../../custom-hooks/useGetAllStudents"

export default function Grades() {
  const initStudent = useSelector((store) => store.teacher)
  const student = initStudent.students || [];

  // Initialize all grades to 0 if undefined
  const initializedStudents = student.map((s) => ({
    ...s,
    assignment1: s.assignment1 ?? 0,
    assignment2: s.assignment2 ?? 0,
    quiz1: s.quiz1 ?? 0,
    quiz2: s.quiz2 ?? 0,
    mid: s.mid ?? 0,
    final: s.final ?? 0,
  }))

  const [students, setStudents] = useState(initializedStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false);

  useGetAllStudents()

  // Simulate data loading
  useEffect(() => {
    setIsDataLoading(true)
    setTimeout(() => setIsDataLoading(false), 1000)
  }, [])

  // Filter students by search term
  const filteredStudents = student.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Update grade for specific student and field
  const updateGrade = (studentId, field, value) => {
    // Convert empty string to 0, otherwise parse as number
    let numValue = value === "" ? 0 : Number.parseInt(value, 10)

    // Apply max constraints based on field type
    const maxValues = {
      assignment1: 5,
      assignment2: 5,
      quiz1: 5,
      quiz2: 5,
      mid: 30,
      final: 50,
    }

    // Ensure value doesn't exceed maximum
    if (numValue > maxValues[field]) {
      numValue = maxValues[field]
    }

    // Ensure value is not negative
    if (numValue < 0) {
      numValue = 0
    }

    setStudents((prevStudents) =>
      prevStudents.map((student) => (student._id === studentId ? { ...student, [field]: numValue } : student)),
    )
  }

  // Save all grades
  const onSubmit = async () => {
    setIsLoading(true)
    try {
      console.log("All Student Grades:", students);
      await axios.post(ADD_MARKS_API_ENDPOINT,{students, subject:'Mathematics',term:'current'},{
        headers : {
          'Content-Type' : 'application/json'
        },
        withCredentials : true
      })
      .then(res => {
        window.toastify(res.data.message, "success");
      })
      .catch(err => {
        window.toastify("Internal Server Error", "err");
      })
    } catch (error) {
      console.error("Error saving grades:", error);
      window.toastify("Error saving grades", "error");
    } finally {
      setIsLoading(false);
    }
  }

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
        <Button onClick={onSubmit} disabled={isLoading || isDataLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save All"
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    {["assignment1", "assignment2", "quiz1", "quiz2", "mid", "final"].map((field) => {
                      // Define max value based on field type
                      const maxValue =
                        field.includes("assignment") || field.includes("quiz") ? 5 : field === "mid" ? 30 : 50

                      return (
                        <TableCell key={`${student._id}-${field}`}>
                          <Input
                            type="number"
                            className="w-16 h-8"
                            min={0}
                            max={maxValue}
                            value={student[field]}
                            onChange={(e) => updateGrade(student._id, field, e.target.value)}
                            onBlur={(e) => {
                              const value = e.target.value
                              if (value === "") {
                                updateGrade(student._id, field, "0")
                              } else {
                                const numValue = Number.parseInt(value, 10)
                                if (numValue > maxValue) {
                                  updateGrade(student._id, field, maxValue.toString())
                                } else if (numValue < 0) {
                                  updateGrade(student._id, field, "0")
                                }
                              }
                            }}
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                  You are not assigned to any class
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
