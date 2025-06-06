const express = require("express");
const UserMongo = require("../config/UserMongo");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const userMongo = await UserMongo.findOne({ email });
  if (userMongo) return res.status(400).json({ success: false, message: "User already exists" });

  const newUser = new UserMongo({ email, password });
  await newUser.save();

  res.status(201).json({ success: true, message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userMongo = await UserMongo.findOne({ email, password });
  if (!userMongo) {
    return res.status(400).json({ success: false, message: "Invalid email or password" });
  }

  res.json({ success: true, message: "Login successful" });
});

module.exports = router;