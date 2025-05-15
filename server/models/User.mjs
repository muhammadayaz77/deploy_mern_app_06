import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['student', 'sup_admin', 'admin1', 'admin2', 'admin3', 'teacher']
  },
  teacherCode: { type: String }, // Only for teachers
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, // For students and teachers
  gradeLevel: { type: String }, // For students
  section: { type: String }, // For students
  courses: [{ type: String }], // For students
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const User = mongoose.model("User",userSchema)

export default User