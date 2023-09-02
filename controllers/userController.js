const User = require("../models/userModel");

signUp = async function (req, res) {
  try {
    const newUser = req.body;
    const savedUser = await User.create(newUser);
    res.status(201).json({
      message: "User created successfully",
      User: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

updateUser = async function (req, res) {
  const { email } = req.params;
  const updatedUserData = req.body;

  try {
    const user = await User.findOneAndUpdate({ email }, updatedUserData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      User: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

deleteUser = async function (req, res) {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndRemove({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      User: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

getUserByEmail = async function (req, res) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User found",
      User: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

getAllUsers = async function (req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      Users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAllUsers,
};
