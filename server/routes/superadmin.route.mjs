import express from 'express';
import { getAllAdmin, removeAdmin } from '../controllers/superadmin.controller.mjs';
import { auth, roleAuth } from '../middleware/auth.middleware.mjs';

const router = express.Router();

// Apply auth first, then role check
router.get('/get-all-admin', auth, roleAuth(['sup_admin']), getAllAdmin);
router.post('/remove-admin', auth, roleAuth(['sup_admin']), removeAdmin);

export default router;