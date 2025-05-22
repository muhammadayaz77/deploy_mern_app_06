import { MarksHistory } from "../models/MarksHistory.mjs";
import { Notification } from "../models/Notification.mjs";

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