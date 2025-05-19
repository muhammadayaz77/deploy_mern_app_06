import Class from "../models/Class.mjs";
import User from "../models/User.mjs";





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

    res.json(updatedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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