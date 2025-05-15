import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  section: { type: String, required: true },
  academicYear: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Class = mongoose.model("Class",classSchema)
export default Class
