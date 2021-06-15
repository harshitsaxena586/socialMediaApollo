import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = {
  userName: { type: String, index: true, unique: true },
  name: String,
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
};

export const User = mongoose.model("User", userSchema);
