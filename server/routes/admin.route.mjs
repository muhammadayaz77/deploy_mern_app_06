import express from 'express'
import { auth } from '../middleware/auth.middleware.mjs'
import { roleAuth } from '../middleware/auth.middleware.mjs'
import User from '../models/User.mjs'
import Class from '../models/Class.mjs'
import { assignTeacher, getTeachersAndClasses } from '../controllers/admin.controllers.mjs'
import { approveClassMarksAndArchive, getClassesWithPendingMarks } from '../controllers/admin2.controllers.mjs'

let router = express.Router();

// Admin1: Assign teacher to class
router.post('/assign-teacher', auth, roleAuth(['admin1']), assignTeacher);

// admin1 : Get Teacher and Classes
router.get('/get-teacher-classes', auth, roleAuth(['admin1']), getTeachersAndClasses);

router.get('/get-submit-marks', auth, roleAuth(['admin2']), getClassesWithPendingMarks);
router.put('/approve-class-marks', auth, roleAuth(['admin2']), approveClassMarksAndArchive);

  



// Admin1: Remove teacher from class
router.post('/remove-teacher', auth, roleAuth(['admin1']), async (req, res) => {
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


export default router;