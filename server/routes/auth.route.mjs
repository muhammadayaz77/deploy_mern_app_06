import express from 'express'
import { auth, roleAuth } from '../middleware/auth.middleware.mjs';
import {getMe,register,login, logout, changePassword} from '../controllers/auth.controller.mjs'


const router = express.Router();

// super admin
router.post('/register',auth,roleAuth(['sup_admin']), register);

router.post('/login', login);
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);
router.post('/change-password', auth, changePassword);

export default router
