import MarksHistory from "../models/MarksHistory.mjs";
import Notification from "../models/Notification.mjs";

// Get student's marks history
export const getMarksHistory = async (req, res) => {
  try {
    const studentId = req.user._id;
    
    const history = await MarksHistory.find({ student: studentId })
      .sort({ academicYear: -1, term: -1 })
      .populate("class", "name gradeLevel");

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Get student notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      user: req.user._id,
      read: false
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notifications
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndUpdate(
      notificationId,
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: "Notification marked as read"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};



// now
export const getStudentMarksHistory = async (req, res) => {
  try {
    const studentId = req.user._id;

    const marksHistory = await MarksHistory.aggregate([
      { $match: { student: new mongoose.Types.ObjectId(studentId) } },
      {
        $group: {
          _id: "$academicYear",
          year: { $first: "$academicYear" },
          classes: {
            $push: {
              classId: "$class._id",
              className: "$class.name",
              gradeLevel: "$class.gradeLevel",
              section: "$class.section",
              subjects: {
                $push: {
                  subject: "$subject",
                  term: "$term",
                  assignments: {
                    asg1: "$assignment1",
                    asg2: "$assignment2"
                  },
                  quizzes: {
                    quiz1: "$quiz1",
                    quiz2: "$quiz2"
                  },
                  exams: {
                    mid: "$mid",
                    final: "$final"
                  },
                  total: "$totalMarks",
                  archivedDate: "$createdAt"
                }
              }
            }
          }
        }
      },
      { $sort: { year: -1 } } // Newest first
    ]);

    res.status(200).json({
      success: true,
      data: marksHistory
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history'
    });
  }
};