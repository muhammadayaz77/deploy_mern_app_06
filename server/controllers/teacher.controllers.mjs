import User from "../models/User.mjs";




export const getAllStudents = async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);
    if (!teacher.class) return res.status(400).json({ message: 'No class assigned' });

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