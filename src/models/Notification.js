import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = {
  postId: String,
  refUserId: String,
  type: String,
  content: String,
  isRead: Boolean,
};

export const Notification = mongoose.model("Notification", NotificationSchema);
