
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useGetAllStudents from "../../../custom-hooks/useGetAllStudents"



// Sample student data
const initialStudents = [
  {
    id: 1,
    name: "John Doe",
    assignment1: 4,
    assignment2: 5,
    quiz1: 3,
    quiz2: 4,
    mid: 25,
    final: 45,
  },
  {
    id: 2,
    name: "Jane Smith",
    assignment1: 5,
    assignment2: 4,
    quiz1: 5,
    quiz2: 5,
    mid: 28,
    final: 48,
  },
  {
    id: 3,
    name: "Michael Johnson",
    assignment1: 3,
    assignment2: 3,
    quiz1: 4,
    quiz2: 3,
    mid: 22,
    final: 40,
  },
]

export default function Grades() {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // get all students
  useGetAllStudents();

  // Filter students based on search term
  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Handle form submission
  const onSubmit = () => {
    console.log("Saved student data:", students)
    // Here you would typically send the data to a server
  }

  // Update student grade
  const updateGrade = (id, field, value) => {
    const numValue = value === "" ? 0 : Number.parseInt(value)
    setStudents(students.map((student) => (student.id === id ? { ...student, [field]: numValue } : student)))
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
        <Button onClick={handleSubmit(onSubmit)}>Save All</Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px] font-bold">S.No</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Assignment 1</TableHead>
                <TableHead className="font-bold">Assignment 2</TableHead>
                <TableHead className="font-bold">Quiz 1</TableHead>
                <TableHead className="font-bold">Quiz 2</TableHead>
                <TableHead className="font-bold">Mid</TableHead>
                <TableHead className="font-bold">Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      min={0}
                      max={5}
                      value={student.assignment1}
                      {...register(`student-${student.id}-assignment1`, {
                        min: 0,
                        max: 5,
                      })}
                      onChange={(e) => updateGrade(student.id, "assignment1", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      min={0}
                      max={5}
                      value={student.assignment2}
                      {...register(`student-${student.id}-assignment2`, {
                        min: 0,
                        max: 5,
                      })}
                      onChange={(e) => updateGrade(student.id, "assignment2", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      min={0}
                      max={5}
                      value={student.quiz1}
                      {...register(`student-${student.id}-quiz1`, {
                        min: 0,
                        max: 5,
                      })}
                      onChange={(e) => updateGrade(student.id, "quiz1", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      min={0}
                      max={5}
                      value={student.quiz2}
                      {...register(`student-${student.id}-quiz2`, {
                        min: 0,
                        max: 5,
                      })}
                      onChange={(e) => updateGrade(student.id, "quiz2", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      min={0}
                      max={30}
                      value={student.mid}
                      {...register(`student-${student.id}-mid`, {
                        min: 0,
                        max: 30,
                      })}
                      onChange={(e) => updateGrade(student.id, "mid", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      min={0}
                      max={50}
                      value={student.final}
                      {...register(`student-${student.id}-final`, {
                        min: 0,
                        max: 50,
                      })}
                      onChange={(e) => updateGrade(student.id, "final", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </form>
    </div>
  )
}
