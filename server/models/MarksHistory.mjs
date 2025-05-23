  import mongoose from "mongoose";

  const marksHistorySchema = new mongoose.Schema({
    originalMark: { type: mongoose.Schema.Types.ObjectId, ref: "Marks" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subject: { type: String, required: true },
    assignment1: { type: Number },
    assignment2: { type: Number },
    quiz1: { type: Number },
    quiz2: { type: Number },
    mid: { type: Number },
    final: { type: Number },
    term: { type: String, required: true },
    academicYear: { type: String, required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  const MarksHistory = mongoose.model("MarksHistory", marksHistorySchema);

  export default MarksHistory;