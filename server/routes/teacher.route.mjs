import express from 'express'
import {auth} from '../middleware/auth.middleware.mjs'
import {roleAuth} from '../middleware/auth.middleware.mjs'
import {getClassMarks, getClassStudents, saveBulkMarks, saveStudentMarks } from '../controllers/teacher.controllers.mjs'

const router = express.Router();

router.post("/marks", auth, roleAuth(["teacher"]), saveStudentMarks)

// Route for bulk saving marks for multiple students
router.post("/marks/bulk", auth, roleAuth(["teacher"]), saveBulkMarks)

// Route for getting marks for all students in a class
router.get("/marks/class", auth, roleAuth(["teacher"]), getClassMarks)

// Route for Getting student
router.get("/class/students", auth, roleAuth(["teacher"]), getClassStudents)

export default router;