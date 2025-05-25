

import Class from "../models/Class.mjs";
import Marks from "../models/Marks.mjs";
import MarksHistory from "../models/MarksHistory.mjs";
import Notification from "../models/Notification.mjs";
import mongoose from "mongoose";

// 1. Get all classes with submitted marks (organized by class)
export const getClassesWithPendingMarks = async (req, res) => {
  try {

    // Get classes with pending marks using aggregation
    const classesWithMarks = await Class.aggregate([
      {
        $lookup: {
          from: 'marks',
          let: { classId: '$_id' },
          pipeline: [
            { 
              $match: { 
                $expr: { $eq: ['$class', '$$classId'] },
                status: 'submitted'
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'student',
                foreignField: '_id',
                as: 'student'
              }
            },
            { $unwind: '$student' },
            {
              $project: {
                _id: 1,
                subject: 1,
                term: 1,
                assignment1: 1,
                assignment2: 1,
                quiz1: 1,
                quiz2: 1,
                mid: 1,
                final: 1,
                student: {
                  _id: '$student._id',
                  name: '$student.name',
                  gradeLevel: '$student.gradeLevel'
                },
                submittedAt: '$createdAt'
              }
            }
          ],
          as: 'pendingMarks'
        }
      },
      { 
        $match: { 
          'pendingMarks.0': { $exists: true } // Only classes with pending marks
        } 
      },
      {
        $project: {
          _id: 1,
          name: 1,
          gradeLevel: 1,
          section: 1,
          pendingMarksCount: { $size: '$pendingMarks' },
          pendingMarks: 1
        }
      }
    ]);

    res.status(200).json({ 
      success: true, 
      count : classesWithMarks.length,
      data: classesWithMarks 
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: err.message 
    });
  }
};


export const approveClassMarksAndArchive = async (req, res) => {
  try {
    const { classId } = req.body;
    const admin2Id = req.user._id;

    // Validate classId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid class ID'
      });
    }

    // Get class with complete details
    const classObj = await Class.findById(classId)
      .select('name gradeLevel section academicYear teacher students')
      .lean();

    if (!classObj) {
      return res.status(404).json({ 
        success: false, 
        message: 'Class not found' 
      });
    }

    // Get all submitted marks
    const submittedMarks = await Marks.find({
      class: classId,
      status: 'submitted'
    }).lean();

    if (submittedMarks.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No marks to archive' 
      });
    }

    // Calculate next academic year
    const nextAcademicYear = calculateNextAcademicYear(classObj.academicYear);

    // Prepare marks history records with complete class details
    const historyRecords = submittedMarks.map(mark => {
      const total = calculateTotalMarks(mark);
      
      return {
        originalMark: mark._id,
        student: mark.student,
        class: {
          _id: classObj._id,
          name: classObj.name,
          gradeLevel: classObj.gradeLevel,
          section: classObj.section
        },
        subject: mark.subject,
        term: mark.term,
        assignment1: mark.assignment1,
        assignment2: mark.assignment2,
        quiz1: mark.quiz1,
        quiz2: mark.quiz2,
        mid: mark.mid,
        final: mark.final,
        totalMarks: total,
        academicYear: classObj.academicYear,
        approvedBy: admin2Id,
        status: 'archived',
        createdAt: new Date()
      };
    });

    // Execute all operations (without notifications)
    const [historyResult] = await Promise.all([
      MarksHistory.insertMany(historyRecords),
      Marks.deleteMany({ _id: { $in: submittedMarks.map(m => m._id) } }),
      Class.findByIdAndUpdate(
        classId,
        { 
          academicYear: nextAcademicYear,
          $unset: { students: "", teacher: "" } 
        }
      )
    ]);

    return res.status(200).json({
      success: true,
      message: `Archived ${submittedMarks.length} marks`,
      data: {
        academicYear: classObj.academicYear,
        archivedCount: historyResult.length,
        nextAcademicYear,
        classDetails: {
          name: classObj.name,
          gradeLevel: classObj.gradeLevel,
          section: classObj.section
        }
      }
    });

  } catch (err) {
    console.error('Archive Error:', err);
    return res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'Archive failed. Contact admin.'
    });
  }
};

// Helper functions
const calculateNextAcademicYear = (currentYear) => {
  const [start, end] = currentYear.split('-').map(Number);
  return `${end}-${end + 1}`;
};

const calculateTotalMarks = (mark) => {
  return (mark.assignment1 || 0) + 
         (mark.assignment2 || 0) + 
         (mark.quiz1 || 0) + 
         (mark.quiz2 || 0) + 
         (mark.mid || 0) + 
         (mark.final || 0);
};