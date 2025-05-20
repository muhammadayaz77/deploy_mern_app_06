import mongoose from "mongoose"

const marksSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subject: { type: String, required: true },
    // Replace single marks field with individual assessment fields
    assignment1: { type: Number, min: 0, max: 5, default: 0 },
    assignment2: { type: Number, min: 0, max: 5, default: 0 },
    quiz1: { type: Number, min: 0, max: 5, default: 0 },
    quiz2: { type: Number, min: 0, max: 5, default: 0 },
    mid: { type: Number, min: 0, max: 30, default: 0 },
    final: { type: Number, min: 0, max: 50, default: 0 },
    term: { type: String, required: true, enum: ["current", "previous"] },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "submitted",
    },
    remarks: { type: String },
  },
  { timestamps: true },
)

// Add a compound index to ensure uniqueness for student-subject-term combination
marksSchema.index({ student: 1, subject: 1, term: 1 }, { unique: true })

const Marks = mongoose.model("Marks", marksSchema)
export default Marks
