import express from 'express'
import { getStudentMarksHistory } from '../controllers/student.controllers.mjs';
import { auth, roleAuth } from '../middleware/auth.middleware.mjs';

let router = express.Router();


router.get("/marks/history",auth,roleAuth(['student']),getStudentMarksHistory)


export default router;