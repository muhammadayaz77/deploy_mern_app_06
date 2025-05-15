import express from 'express'
import { auth } from '../middleware/auth.mjs';
import {getMe,register,login, logout} from '../controllers/authController.mjs'


const router = express.Router();


router.post('/register', auth, register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);

export default router
