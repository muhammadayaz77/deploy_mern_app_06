

import Class from "../models/Class.mjs";
import Marks from "../models/Marks.mjs";
import { MarksHistory } from "../models/MarksHistory.mjs";
import { Notification } from "../models/Notification.mjs";
import User from "../models/User.mjs";

// Approve marks and add to history
export const approveMarks = async (req, res) => {
  try {
    const { markId } = req.params;
    const admin2Id = req.user._id;

    // Approve marks
    const approvedMark = await Marks.findByIdAndUpdate(
      markId,
      { status: "approved" },
      { new: true }
    ).populate("student", "name email");

    if (!approvedMark) {
      return res.status(404).json({ success: false, message: "Marks not found" });
    }

    // Create history record
    const historyRecord = new MarksHistory({
      originalMark: approvedMark._id,
      student: approvedMark.student,
      class: approvedMark.class,
      subject: approvedMark.subject,
      assignment1: approvedMark.assignment1,
      assignment2: approvedMark.assignment2,
      quiz1: approvedMark.quiz1,
      quiz2: approvedMark.quiz2,
      mid: approvedMark.mid,
      final: approvedMark.final,
      term: approvedMark.term,
      academicYear: "2023-2024", // Adjust as needed
      approvedBy: admin2Id
    });
    await historyRecord.save();

    // Create notification for student
    const notification = new Notification({
      user: approvedMark.student._id,
      message: `Your marks for ${approvedMark.subject} have been approved`,
      type: "marks_approved",
      relatedData: {
        subject: approvedMark.subject,
        term: approvedMark.term
      }
    });
    await Notification.save();

    res.status(200).json({
      success: true,
      message: "Marks approved and added to history",
      data: approvedMark
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Remove teacher from class
export const removeTeacherFromClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { teacher: null },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher removed from class",
      data: updatedClass
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Promote student to next grade
export const promoteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    if (student.gradeLevel >= 10) {
      return res.status(400).json({
        success: false,
        message: "Student is already in the highest grade"
      });
    }

    const promotedStudent = await User.findByIdAndUpdate(
      studentId,
      { $inc: { gradeLevel: 1 } },
      { new: true }
    );

    // Create promotion notification
    const notification = new Notification({
      user: studentId,
      message: `You have been promoted to grade ${promotedStudent.gradeLevel}`,
      type: "promotion",
      relatedData: {
        newGrade: promotedStudent.gradeLevel
      }
    });
    await notification.save();

    res.status(200).json({
      success: true,
      message: `Student promoted to grade ${promotedStudent.gradeLevel}`,
      data: promotedStudent
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Get pending marks for approval
export const getPendingMarks = async (req, res) => {
  try {
    const pendingMarks = await Marks.find({ status: "submitted" })
      .populate("student", "name email gradeLevel")
      .populate("class", "name")
      .populate("submittedBy", "name");

    res.status(200).json({
      success: true,
      data: pendingMarks
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};