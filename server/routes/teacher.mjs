import express from 'express'
import {auth} from '../middleware/auth.middleware.mjs'
import {roleAuth} from '../middleware/auth.middleware.mjs'
import User from '../models/User.mjs'
import Marks from '../models/Marks.mjs'
import { getAllStudents, saveBulkMarks } from '../controllers/teacher.controllers.mjs'

const router = express.Router()

// // Teacher: Get students in their class
// router.get('/students', auth, roleAuth(['teacher']), getAllStudents);

// // Teacher: Add marks for student
// router.post('/marks', auth, roleAuth(['teacher']), async (req, res) => {
//   try {
//     const { studentId, subject, marks, term, remarks } = req.body;
//     const teacher = await User.findById(req.user.id);

//     // Check if student exists and is in teacher's class
//     const student = await User.findOne({ 
//       _id: studentId, 
//       role: 'student',
//       class: teacher.class 
//     });
//     if (!student) return res.status(404).json({ message: 'Student not found in your class' });

//     // Create marks record
//     const marksRecord = new Marks({
//       student: studentId,
//       class: teacher.class,
//       subject,
//       marks,
//       term,
//       remarks,
//       submittedBy: req.user.id,
//       status: 'submitted'
//     });

//     await marksRecord.save();

//     res.json(marksRecord);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Teacher: Get all marks they've submitted
// router.get('/marks', auth, roleAuth(['teacher']), async (req, res) => {
//   try {
//     const marks = await Marks.find({ submittedBy: req.user.id })
//       .populate('student', 'name email')
//       .populate('class', 'name');
    
//     res.json(marks);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
router.post("/marks", auth, roleAuth(["teacher"]), saveStudentMarks)

// Route for bulk saving marks for multiple students
router.post("/marks/bulk", auth, roleAuth(["teacher"]), saveBulkMarks)

// Route for getting marks for all students in a class
router.get("/marks/class", auth, roleAuth(["teacher"]), getClassMarks)

export default router