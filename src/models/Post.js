import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = {
  postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  caption: String,
  public_id: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
};

export const Post = mongoose.model("Post", postSchema);
