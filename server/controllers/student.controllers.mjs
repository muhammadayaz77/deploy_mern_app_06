import MarksHistory from "../models/MarksHistory.mjs";
import Notification from "../models/Notification.mjs";
import mongoose from 'mongoose'
import User from "../models/User.mjs";
import cloudinary from "../services/cloudinary.services.mjs";
import getDataUri from "../services/dataUri.service.mjs";


// Configure multer storage
export const addStudentFiles = async (req, res) => {
  try {
    const user = await User.findOne({_id : req.user.id});
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false
      });
    }
    // Handle covid certificate upload
    if (req.files?.covid) {
      const covidFile = req.files.covid[0];
      const covidUri = getDataUri(covidFile);
      const cloudResponse = await cloudinary.uploader.upload(covidUri.content, {
        folder: 'student_documents/covid_certificates'
      });
      user.images.covid = cloudResponse.secure_url;
    }

    // Handle signature upload
    if (req.files?.signature) {
      const signatureFile = req.files.signature[0];
      const signatureUri = getDataUri(signatureFile);
      const cloudResponse = await cloudinary.uploader.upload(signatureUri.content, {
        folder: 'student_documents/signatures'
      });
      user.images.signature = cloudResponse.secure_url;
    }

    await user.save();
    
    return res.status(200).json({
      message: "Files uploaded successfully",
      success: true,
      images: user.images
    });

  } catch (error) {
    console.error("Error in addStudentFiles:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false
    });
  }
};
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



export const getStudentMarksHistory = async (req, res) => {
  try {
    const studentId = req.user.id;
    console.log("student id : ", studentId);
    
    const marksHistory = await MarksHistory.aggregate([
      { $match: { student: new mongoose.Types.ObjectId(studentId) } },
      {
        $group: {
          _id: { 
            academicYear: "$academicYear",
            classId: "$class._id"
          },
          year: { $first: "$academicYear" },
          classId: { $first: "$class._id" },
          className: { $first: "$class.name" },
          gradeLevel: { $first: "$class.gradeLevel" },
          section: { $first: "$class.section" },
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
      },
      {
        $group: {
          _id: "$year",
          year: { $first: "$year" },
          classes: {
            $push: {
              classId: "$classId",
              className: "$className",
              gradeLevel: "$gradeLevel",
              section: "$section",
              subjects: "$subjects"
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
      message: err.message
    });
  }
};

export const getStudentNotification = async (req,res) => {
  try {
   
    let notification = await Notification.find()

    res.status(200).json({
      data : notification,
      success : true
    })
  } catch (error) {
    res.status(500).json({
      message : error.message,
      success : false
    })
  }
}