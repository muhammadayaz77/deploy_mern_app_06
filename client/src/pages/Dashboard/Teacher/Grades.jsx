import { useState, useEffect, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector } from "react-redux";
import axios from "axios";
import { ADD_MARKS_API_ENDPOINT } from "../../../utils/constants";
import useGetAllStudents from "../../../custom-hooks/useGetAllStudents";

export default function Grades() {
  const initStudent = useSelector((store) => store.teacher);
  const student = initStudent.students || [];

  // Validate grade value
  const validateGrade = (value, max) => {
    if (value === undefined || value === null) return 0;
    const numValue = Number(value);
    if (isNaN(numValue)) return 0;
    return Math.min(Math.max(numValue, 0), max);
  };

  // Initialize all grades with proper validation
  const initializeStudents = (students) => {
    return students.map((s) => ({
      ...s,
      assignment1: validateGrade(s.assignment1, 5) || 0,
      assignment2: validateGrade(s.assignment2, 5) || 0,
      quiz1: validateGrade(s.quiz1, 5) || 0,
      quiz2: validateGrade(s.quiz2, 5) || 0,
      mid: validateGrade(s.mid, 30) || 0,
      final: validateGrade(s.final, 50) || 0,
    }));
  };

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync with Redux updates
  useEffect(() => {
    if (student.length > 0) {
      setStudents(initializeStudents(student));
    } else {
      setStudents([]);
    }
  }, [student]);

  useGetAllStudents();

  // Filter students by search term
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Update grade with validation
  const updateGrade = (studentId, field, value) => {
    const maxValues = {
      assignment1: 5,
      assignment2: 5,
      quiz1: 5,
      quiz2: 5,
      mid: 30,
      final: 50,
    };

    let numValue = value === "" ? 0 : Number(value);
    
    // Validate input
    if (isNaN(numValue)) {
      setErrors((prev) => ({
        ...prev,
        [studentId]: { ...prev[studentId], [field]: "Must be a number" },
      }));
      return;
    }

    // Apply constraints
    numValue = Math.min(Math.max(numValue, 0), maxValues[field]);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[studentId]) {
        delete newErrors[studentId][field];
        if (Object.keys(newErrors[studentId]).length === 0) {
          delete newErrors[studentId];
        }
      }
      return newErrors;
    });

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === studentId ? { ...student, [field]: numValue } : student
      )
    );
  };

  // Handle input blur with validation
  const handleBlur = (studentId, field, value, max) => {
    if (value === "") {
      updateGrade(studentId, field, "0");
      return;
    }

    const numValue = Number(value);
    if (isNaN(numValue)) {
      updateGrade(studentId, field, "0");
      return;
    }

    if (numValue > max) {
      updateGrade(studentId, field, max.toString());
    } else if (numValue < 0) {
      updateGrade(studentId, field, "0");
    }
  };

  // Save all grades
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        ADD_MARKS_API_ENDPOINT,
        {
          students,
          subject: "Mathematics",
          term: "current",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.errors && response.data.errors.length > 0) {
        const newErrors = {};
        response.data.errors.forEach((error) => {
          newErrors[error.studentId] = {
            ...newErrors[error.studentId],
            general: error.error,
          };
        });
        setErrors(newErrors);
        window.toastify("Some students couldn't be saved", "warning");
      } else {
        window.toastify(response.data.message, "success");
      }
    } catch (error) {
      console.error("Error saving grades:", error);
      window.toastify(
        error.response?.data?.message || "Error saving grades",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                filteredStudents.map((student, index) => {
                  const studentError = errors[student._id];
                  return (
                    <TableRow key={student._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        {student.name}
                        {studentError?.general && (
                          <p className="text-red-500 text-xs mt-1">
                            {studentError.general}
                          </p>
                        )}
                      </TableCell>
                      {["assignment1", "assignment2", "quiz1", "quiz2", "mid", "final"].map((field) => {
                        const maxValue =
                          field.includes("assignment") || field.includes("quiz")
                            ? 5
                            : field === "mid"
                            ? 30
                            : 50;

                        return (
                          <TableCell key={`${student._id}-${field}`}>
                            <Input
                              type="number"
                              className={`w-16 h-8 ${
                                studentError?.[field] ? "border-red-500" : ""
                              }`}
                              min={0}
                              max={maxValue}
                              value={student[field]}
                              onChange={(e) =>
                                updateGrade(student._id, field, e.target.value)
                              }
                              onBlur={(e) =>
                                handleBlur(
                                  student._id,
                                  field,
                                  e.target.value,
                                  maxValue
                                )
                              }
                            />
                            {studentError?.[field] && (
                              <p className="text-red-500 text-xs mt-1">
                                {studentError[field]}
                              </p>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    {student.length === 0
                      ? "You are not assigned to any class"
                      : "No students match your search"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}