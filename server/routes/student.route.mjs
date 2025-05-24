import express from 'express'
import { getStudentMarksHistory } from '../controllers/student.controllers.mjs';

let router = express.Router();


router.get("/marks/history",getStudentMarksHistory)