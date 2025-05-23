import mongoose from "mongoose";

const marksHistorySchema = new mongoose.Schema({
  originalMark: { type: mongoose.Schema.Types.ObjectId, ref: "Marks" },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  class: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    name: { type: String },
    gradeLevel: { type: Number },
    section: { type: String }
  },
  subject: { type: String, required: true },
  assignment1: { type: Number },
  assignment2: { type: Number },
  quiz1: { type: Number },
  quiz2: { type: Number },
  mid: { type: Number },
  final: { type: Number },
  totalMarks: { type: Number }, // Calculated field
  term: { type: String, required: true, enum: ["current", "previous"] },
  academicYear: { 
    type: String, 
    required: true,
    index: true // For faster queries by year
  },
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  status: {
    type: String,
    enum: ["archived", "promoted"],
    default: "archived"
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

// Calculate total marks before saving
marksHistorySchema.pre('save', function(next) {
  this.totalMarks = (this.assignment1 || 0) + 
                    (this.assignment2 || 0) + 
                    (this.quiz1 || 0) + 
                    (this.quiz2 || 0) + 
                    (this.mid || 0) + 
                    (this.final || 0);
  next();
});

const MarksHistory = mongoose.model("MarksHistory", marksHistorySchema);

export default MarksHistory;