const express = require("express");
const router = express.Router();
const {
  signUp,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAllUsers,
} = require("../controllers/userController");
const { login, logout } = require("../controllers/authController");
const { protectRoute, isAdmin } = require("../controllers/authHelper");

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.use(protectRoute);
router
  .route("/email/:email")
  .get(getUserByEmail)
  .patch(updateUser)
  .delete(deleteUser);
router.route("/logout").get(logout);
router.use(isAdmin(["Admin"]));
router.get("/getAll", getAllUsers);

module.exports = router;
