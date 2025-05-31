import express from 'express'
import { addStudentFiles, getStudentMarksHistory } from '../controllers/student.controllers.mjs';
import { auth, roleAuth } from '../middleware/auth.middleware.mjs';
import { singleUpload } from '../middleware/multer.middleware.mjs';


let router = express.Router();

router.post('/upload/files', auth, roleAuth(['student']),singleUpload, addStudentFiles);
router.get("/marks/history",auth,roleAuth(['student']),getStudentMarksHistory)


export default router;