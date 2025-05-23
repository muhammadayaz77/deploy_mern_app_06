

import Class from "../models/Class.mjs";
import Marks from "../models/Marks.mjs";
import MarksHistory from "../models/MarksHistory.mjs";
import Notification from "../models/Notification.mjs";

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


// 2. Approve all marks for a specific class

export const approveClassMarks = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { classId } = req.params;
    const admin2Id = req.user._id;

    // Find all submitted marks for the class
    const marksToApprove = await Marks.find({ 
      class: classId, 
      status: 'submitted' 
    }).session(session);

    if (marksToApprove.length === 0) {
      await session.abortTransaction();
      return res.status(404).json({ 
        success: false, 
        message: 'No pending marks found for this class' 
      });
    }

    // Prepare bulk operations
    const bulkUpdates = [];
    const historyRecords = [];
    const notifications = [];

    for (const mark of marksToApprove) {
      // 1. Update mark status
      bulkUpdates.push({
        updateOne: {
          filter: { _id: mark._id },
          update: { $set: { status: 'approved' } }
        }
      });

      // 2. Create history record
      historyRecords.push({
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
        academicYear: '2023-2024',
        approvedBy: admin2Id
      });

      // 3. Prepare student notification
      notifications.push({
        user: mark.student,
        message: `Your ${mark.subject} marks (Term: ${mark.term}) have been approved`,
        type: 'marks_approved',
        relatedData: {
          subject: mark.subject,
          term: mark.term
        }
      });
    }

    // Execute all operations in transaction
    await Marks.bulkWrite(bulkUpdates, { session });
    await MarksHistory.insertMany(historyRecords, { session });
    await Notification.insertMany(notifications, { session });

    await session.commitTransaction();

    res.status(200).json({ 
      success: true,
      message: `Approved ${marksToApprove.length} marks for this class`,
      data: {
        approvedCount: marksToApprove.length,
        classId: classId
      }
    });

  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ 
      success: false, 
      message: 'Approval failed',
      error: err.message 
    });
  } finally {
    session.endSession();
  }
};