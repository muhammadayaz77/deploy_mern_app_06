import express from 'express'
import {auth} from '../middleware/auth.mjs'
import {roleAuth} from '../middleware/auth.mjs'
import Marks from '../models/Marks.mjs'
const router = express.Router();

// Admin2: Get all marks for a class
router.get('/class/:classId', auth, roleAuth(['admin2']), async (req, res) => {
  try {
    const marks = await Marks.find({ class: req.params.classId })
      .populate('student', 'name email')
      .populate('submittedBy', 'name');
    
    res.json(marks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Admin2: Approve/reject marks
router.put('/:id/status', auth, roleAuth(['admin2']), async (req, res) => {
  try {
    const { status } = req.body;
    
    const marks = await Marks.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(marks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router