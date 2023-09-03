const express = require("express");
const router = express.Router();
const {
  addUserOrder,
  getUserOrders,
  cancelOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { protectRoute, isAdmin } = require("../controllers/authHelper");

router.use(protectRoute);
router.route("/").post(addUserOrder).get(getUserOrders);
router.patch("/:id", cancelOrder);
router.use(isAdmin(["Admin", "BusinessOwner"]));
router.route("/upper/:id").patch(updateOrder);
router.use(isAdmin(["Admin"]));
router.route("/super/:id").delete(deleteOrder);

module.exports = router;
