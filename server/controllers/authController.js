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
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid == false) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const login = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      data: { message: "login successful", login: login, user: user },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 });
  res.json({
    message: "user logged out succesfully",
  });
};
module.exports = { login, logout };
