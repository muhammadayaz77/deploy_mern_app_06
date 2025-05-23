import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { type: String, enum: ["marks_approved", "promotion"] },
  relatedData: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;