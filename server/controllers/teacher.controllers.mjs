
import Marks from "../models/Marks.mjs";
import User from "../models/User.mjs";


export const getAllStudents = async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);
    if (!teacher.class) return res.status(400).json(
      { 
        message: 'No class assigned',
        success : false
       }
    );

    const students = await User.find({ 
      class: teacher.class, 
      role: 'student' 
    }).select('name email gradeLevel section courses');

    res.status(200).json({
      students,
      studentCount : students.length,
      success : true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message : err.message,
      success : false
    });
  }
}

// Controller for saving/updating marks for a single student
export const saveStudentMarks = async (req, res) => {
  try {
    const { studentId, subject, term, remarks, assignment1, assignment2, quiz1, quiz2, mid, final } = req.body
    const teacher = await User.findById(req.user.id)

    // Check if student exists and is in teacher's class
    const student = await User.findOne({
      _id: studentId,
      role: "student",
      class: teacher.class,
    })
    if (!student) return res.status(404).json({ message: "Student not found in your class" })

    // Check if marks record already exists for this student-subject-term
    let marksRecord = await Marks.findOne({
      student: studentId,
      subject,
      term,
    })

    if (marksRecord) {
      // Update existing record
      marksRecord.assignment1 = assignment1
      marksRecord.assignment2 = assignment2
      marksRecord.quiz1 = quiz1
      marksRecord.quiz2 = quiz2
      marksRecord.mid = mid
      marksRecord.final = final
      marksRecord.remarks = remarks
      marksRecord.submittedBy = req.user.id
      marksRecord.status = "submitted"
    } else {
      // Create new record
      marksRecord = new Marks({
        student: studentId,
        class: teacher.class,
        subject,
        assignment1,
        assignment2,
        quiz1,
        quiz2,
        mid,
        final,
        term,
        remarks,
        submittedBy: req.user.id,
        status: "submitted",
      })
    }

    await marksRecord.save()
    res.json(marksRecord)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

// Controller for bulk saving/updating marks for multiple students
export const saveBulkMarks = async (req, res) => {
  try {
    const { students, subject, term } = req.body
    const teacher = await User.findById(req.user._id);

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json(
      { 
      message: "Students data is required",
      success : false
       }
      )
    }

    const results = []
    const errors = []

    // Process each student's marks
    for (const studentData of students) {
      try {
        const { _id, assignment1, assignment2, quiz1, quiz2, mid, final } = studentData

        // Verify student exists and belongs to teacher's class
        const student = await User.findOne({
          _id,
          role: "student",
          class: teacher.class,
        })

        if (!student) {
          errors.push({ studentId: _id, error: "Student not found in your class" })
          continue;
        }

        // Find existing record or create new one (upsert)
        const updatedMarks = await Marks.findOneAndUpdate(
          {
            student: _id,
            subject,
            term,
          },
          {
            $set: {
              class: teacher.class,
              assignment1: assignment1 || 0,
              assignment2: assignment2 || 0,
              quiz1: quiz1 || 0,
              quiz2: quiz2 || 0,
              mid: mid || 0,
              final: final || 0,
              remarks: "",
              submittedBy: req.user._id,
              status: "submitted",
            },
          },
          {
            new: true,
            upsert: true,
          },
        );

        results.push(updatedMarks);
        console.log("results : ",results)

      } catch (studentError) {
        console.error(`Error processing student ${studentData._id}:`, studentError)
        errors.push({ studentId: studentData._id, error: studentError.message })
      }
    }
    res.status(200).json({
      success: true,
      message: `Successfully processed ${results.length} students' marks`,
      results,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (err) {
    console.error("Bulk marks update error:", err.message)
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

// Controller to get marks for students in a class
export const getClassMarks = async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id)

    if (!teacher.class) {
      return res.json(
        {
          students : [], 
          message: "You are not assigned to any class",
          success : true
        })
    }

    // Get all students in the class
    const students = await User.find({
      role: "student",
      class: teacher.class,
    }).select("_id name")

    // Get existing marks records
    const existingMarks = await Marks.find({
      class: teacher.class,
    })

    // Map marks to students
    const studentsWithMarks = students.map((student) => {
      const studentMarks = existingMarks.find((mark) => mark.student.toString() === student._id.toString());

      return {
        _id: student._id,
        name: student.name,
        assignment1: studentMarks?.assignment1 || 0,
        assignment2: studentMarks?.assignment2 || 0,
        quiz1: studentMarks?.quiz1 || 0,
        quiz2: studentMarks?.quiz2 || 0,
        mid: studentMarks?.mid || 0,
        final: studentMarks?.final || 0,
        remarks: studentMarks?.remarks || "",
      }
    })

    res.status(200).json({
      students : studentsWithMarks,
      success : true
    })
  } catch (err) {
    console.error("Error fetching class marks:", err.message)
    res.status(500).json({ message: "Server error", error: err.message })
  }
}
