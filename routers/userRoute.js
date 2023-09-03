const express = require("express");
const router = express.Router();
const {
  signUp,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAllUsers,
} = require("../controllers/userController");
const protectRoute = require("../controllers/authHelper");

router.post("/signup", signUp);
router.use(protectRoute);
router
  .get("/email/:email", getUserByEmail)
  .put("/:email", updateUser)
  .delete("/:email", deleteUser)
  .get("/", getAllUsers);

module.exports = router;
