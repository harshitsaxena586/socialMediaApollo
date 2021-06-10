import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = {
  userName: { type: String, index: true, unique: true },
  password: String,
  posts:[{type: Schema.Types.ObjectId, ref: "Post"}],
  followers:[{type: Schema.Types.ObjectId, ref:"User"}],
  following:[{type: Schema.Types.ObjectId, ref: "User"}]
};

export const User = mongoose.model("User", userSchema);
