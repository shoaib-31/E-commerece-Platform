const express = require("express");
const router = express.Router();

const {
  signUp,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAllUsers,
} = require("../controllers/userController");

router
  .post("/signup", signUp)
  .put("/:email", updateUser)
  .delete("/:email", deleteUser)
  .get("/email/:email", getUserByEmail)
  .get("/", getAllUsers);

module.exports = router;
