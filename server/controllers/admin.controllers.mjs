import Class from "../models/Class.mjs";
import User from "../models/User.mjs";
import Notification from "../models/Notification.mjs";

// Cloudinary imports
import cloudinary from '../services/cloudinary.services.mjs'
import getDataUri from '../services/dataUri.service.mjs'



export const assignTeacher = async (req, res) => {
  try {
    const { classId, teacherId } = req.body;

    // Check if teacher exists
    const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Update class with new teacher
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { teacher: teacherId },
      { new: true }
    ).populate('teacher students');

    // Update teacher's class reference
    teacher.class = classId;
    await teacher.save();

    return res.status(200).json({
      message : 'Teacher has been assign to class',
      success : false
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message : err.message,
      success : false
    });
  }
}

export const getTeachersAndClasses = async (req, res) => {
  try {

    // Execute both queries in parallel for better performance
    const teachers = await User.find({role : 'teacher'}).select("-password");
    const classes = await Class.find();


    res.status(200).json({
      success: true,
      data: {
        teachers,
        classes,
        count: {
          teachers: teachers.length,
          classes: classes.length
        }
      },
      message: 'Successfully retrieved teachers and classes'
    });

  } catch (error) {
    console.error('Error fetching teachers and classes:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch data'
    });
  }
};

export const sendNotification = async (req,res) => {
  try {
    const {message} = req.body;
    const image = req.file;

    console.log('file',image)
    console.log('message : ',message)
    
    
    if (req.file) {
    const signatureFile = req.file;
    const signatureUri = getDataUri(signatureFile);
    const cloudResponse = await cloudinary.uploader.upload(signatureUri.content, {
      folder: 'student_documents/notification'
    });
    const notification = new Notification({
      message,
      notificationImage : cloudResponse.secure_url
    });
    await notification.save();
  }

    res.status(200).json({
      message : 'Notification has been send to Students',
      success : true
    })
  } catch (error) {
    res.status(500).json({
      message : error.message,
      success : false
    })
  }
}
export const manageNotification = async (req,res) => {
  try {
   
    let notification = await Notification.find()

    res.status(200).json({
      message : notification,
      success : true
    })
  } catch (error) {
    res.status(500).json({
      message : error.message,
      success : false
    })
  }
}