import express from 'express'
import { login } from '../controllers/user.controller.mjs';
import isAuthenticated from '../middleware/isAuthenticated.mjs'

let router = express.Router();


router.post('/login',login)

router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'Protected route accessed!', user: req.user });
});


export default router;