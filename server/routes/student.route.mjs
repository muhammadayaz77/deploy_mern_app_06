import express from 'express'
import { addStudentFiles, getStudentMarksHistory, getStudentNotification } from '../controllers/student.controllers.mjs';
import { auth, roleAuth } from '../middleware/auth.middleware.mjs';
import { multipleUpload } from '../middleware/multer.middleware.mjs';


let router = express.Router();

router.post('/upload/files', auth, roleAuth(['student']),multipleUpload, addStudentFiles);
router.get("/marks/history",auth,roleAuth(['student']),getStudentMarksHistory)
router.get("/notifications",auth,roleAuth(['student']),getStudentNotification)


export default router;