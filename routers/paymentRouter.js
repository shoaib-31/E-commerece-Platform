// server/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");
const { protectRoute } = require("../controllers/authHelper");

router.use(protectRoute);
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
