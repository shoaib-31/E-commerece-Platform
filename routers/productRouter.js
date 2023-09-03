const express = require("express");
const router = express.Router();
const { protectRoute, isAdmin } = require("../controllers/authHelper");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
} = require("../controllers/productController");

router.get("/:id", getAProduct);
router.get("/category/:category", getProducts);
router.use(protectRoute);
router.use(isAdmin(["Admin", "BusinessOwner"]));
router.post("/", addProduct);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;
