import express from 'express'
import { auth } from '../middleware/auth.middleware.mjs'
import { roleAuth } from '../middleware/auth.middleware.mjs'
import { assignTeacher, getTeachersAndClasses, manageNotification, sendNotification } from '../controllers/admin.controllers.mjs'
import { approveClassMarksAndArchive, getClassesWithPendingMarks } from '../controllers/admin2.controllers.mjs'
import { singleUpload } from '../middleware/multer.middleware.mjs'

let router = express.Router();

// Admin1: Assign teacher to class
router.post('/assign-teacher', auth, roleAuth(['admin1']), assignTeacher);

// admin1 : Get Teacher and Classes
router.get('/get-teacher-classes', auth, roleAuth(['admin1']), getTeachersAndClasses);
router.post('/send-notification',auth,roleAuth(['admin1']),singleUpload,sendNotification);
router.get('/manage-notification',auth,roleAuth(['admin1']),manageNotification);


// Admin 2 : 
router.get('/get-submit-marks', auth, roleAuth(['admin2']), getClassesWithPendingMarks);
router.put('/approve-class-marks', auth, roleAuth(['admin2']), approveClassMarksAndArchive);
// Get all classes with teachers and students
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