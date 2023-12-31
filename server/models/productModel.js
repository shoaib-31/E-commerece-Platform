const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Smartphones",
      "Laptops",
      "Skincare",
      "Home-Decoration",
      "Groceries",
      "Fragrences",
      "Shoes",
      "Clothings",
    ],
  },
  businessOwnerId: { type: String, required: true },
  thumbnail: {
    type: String,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
