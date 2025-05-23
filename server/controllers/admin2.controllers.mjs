

import Class from "../models/Class.mjs";
import Marks from "../models/Marks.mjs";
import MarksHistory from "../models/MarksHistory.mjs";
import Notification from "../models/Notification.mjs";
import User from '../models/User.mjs'
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
    const { classId } = req.params;
    const admin2Id = req.user._id;
    const currentYear = new Date().getFullYear();
    const nextAcademicYear = `${currentYear}-${currentYear + 1}`;

    // 1. Verify class exists
    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res.status(404).json({ 
        success: false, 
        message: 'Class not found' 
      });
    }

    // 2. Get submitted marks
    const submittedMarks = await Marks.find({
      class: classId,
      status: 'submitted'
    });

    if (submittedMarks.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No submitted marks found' 
      });
    }

    // 3. Create history records
    const historyRecords = submittedMarks.map(mark => ({
      originalMark: mark._id,
      student: mark.student,
      class: mark.class,
      subject: mark.subject,
      assignment1: mark.assignment1,
      assignment2: mark.assignment2,
      quiz1: mark.quiz1,
      quiz2: mark.quiz2,
      mid: mark.mid,
      final: mark.final,
      term: mark.term,
      academicYear: classObj.academicYear,
      approvedBy: admin2Id
    }));

    // 4. Execute operations sequentially
    await MarksHistory.insertMany(historyRecords);
    await Marks.deleteMany({ _id: { $in: submittedMarks.map(m => m._id) } });
    
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        academicYear: nextAcademicYear,
        $unset: { students: 1, teacher: 1 }
      },
      { new: true }
    );

    // 5. Create notifications
    const notifications = submittedMarks.map(mark => ({
      user: mark.student,
      message: `Your ${mark.subject} marks (${classObj.academicYear}) archived`,
      type: 'marks_archived',
      relatedData: {
        subject: mark.subject,
        academicYear: classObj.academicYear
      }
    }));

    await Notification.insertMany(notifications);

    res.status(200).json({
      success: true,
      message: `Archived ${submittedMarks.length} marks`,
      data: {
        newAcademicYear: updatedClass.academicYear,
        archivedCount: submittedMarks.length
      }
    });

  } catch (err) {
    console.error('Archive error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Archive failed',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
    });
  }
};