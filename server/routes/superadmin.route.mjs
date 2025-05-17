import express from 'express'
import {getAllAdmin} from '../controllers/superadmin.controller.mjs'
import { auth, roleAuth } from '../middleware/auth.middleware.mjs';

const router = express.Router();

router.get('/get-all-admin',auth,roleAuth(['sup_admin']),getAllAdmin)

export default router