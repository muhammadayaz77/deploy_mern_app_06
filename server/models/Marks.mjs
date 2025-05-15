import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true, min: 0, max: 100 },
  term: { type: String, required: true, enum: ['midterm', 'final'] },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['draft', 'submitted', 'approved', 'rejected'], 
    default: 'draft' 
  },
  remarks: { type: String }
}, { timestamps: true });

const Marks = mongoose.model("Marks",marksSchema)
export default Marks