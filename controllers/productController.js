const Product = require("../models/productModel");

getAllProducts = async function (req, res) {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
addProduct = async function (req, res) {
  try {
    const newProduct = req.body;
    const savedProduct = await Product.create(newProduct);
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating a new product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getAllProducts, addProduct };
