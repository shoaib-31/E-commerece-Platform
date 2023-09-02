const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const login = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.cookie("login", login, { httpOnly: true });
    res.json({ message: "login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { login };
