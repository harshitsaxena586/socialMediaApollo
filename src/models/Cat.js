import mongoose from "mongoose";

export const Cat = mongoose.model("Cat", {
  naam: String,
  maalik: { type: String, index: true, unique: true },
});
