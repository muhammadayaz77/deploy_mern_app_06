import express from 'express'
import { auth } from '../middleware/auth.mjs'
import { roleAuth } from '../middleware/auth.mjs'
import User from '../models/User.mjs'
import Class from '../models/Class.mjs'

let router = express.Router();

// Admin1: Assign teacher to class
router.post('/assign-teacher', auth, roleAuth(['admin1']), async (req, res) => {
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
});

// Admin2: Remove teacher from class
router.post('/remove-teacher', auth, roleAuth(['admin2']), async (req, res) => {
  try {
    const { classId } = req.body;

    // Remove teacher from class
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $unset: { teacher: 1 } },
      { new: true }
    );

    res.json(updatedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Admin2: Get all classes with teachers and students
router.get('/classes', auth, roleAuth(['admin2']), async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacher', 'name teacherCode')
      .populate('students', 'name email gradeLevel section');
    
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router