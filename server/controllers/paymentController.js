// server/controllers/paymentController.js
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/orderModel");

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
module.exports = { createPaymentIntent };
