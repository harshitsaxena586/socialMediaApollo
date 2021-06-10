var router = express.Router();
require("dotenv").config();
import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

router.route("/").post(async (req, res) => {
  const { userName, password } = req.body.credentials;
  const user = await User.findOne({ userName: userName });
  if (!user) {
    res.status(404).json({ success: false, msg: "no userName found" });
  }
  console.log(user);
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userName, id: user._id }, process.env.secretKey, {
      expiresIn: "10d",
    });
    res.json({ success: true, token });
  } else
    res.status(401).json({ success: false, message: "Incorrect Password" });
});

router.route("/s").post(async (req, res) => {
  const { userName, password } = req.body.credentials;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ userName: userName, password: hashedPassword });
  user.save();
  res.json({ success: true });
});
// router.route("/s").post(async (req, res) => {});
router.route("/slow").get(async (req, res) => {
  setTimeout(() => {
    res.json({ success: true });
  }, 4000);
});

export default router;
