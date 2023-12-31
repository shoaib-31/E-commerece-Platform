const User = require("../models/userModel");

const signUp = async function (req, res) {
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

const updateUser = async function (req, res) {
  const { email } = req.params;
  const dataToBeUpdated = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newData = { ...user, ...dataToBeUpdated };
    user.set(newData);
    await user.save();
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

const deleteUser = async function (req, res) {
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

const getUserByEmail = async function (req, res) {
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

const getAllUsers = async function (req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
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
