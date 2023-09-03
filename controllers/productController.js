const Product = require("../models/productModel");

const getAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product found",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getProducts = async function (req, res) {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addProduct = async function (req, res) {
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
const updateProduct = async function (req, res) {
  try {
    const dataToBeUpdated = req.body;
    const { id } = req.params;
    const productToBeUpdated = await Product.findById(id);
    if (!productToBeUpdated) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newData = { ...productToBeUpdated, ...dataToBeUpdated };
    productToBeUpdated.set(newData);
    await productToBeUpdated.save();
    res.status(201).json({
      message: "Product updated successfully",
      product: productToBeUpdated,
    });
  } catch (error) {
    console.error("Error updating a new product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async function (req, res) {
  const { id } = req.params;
  try {
    const productToBeDeleted = await Product.findByIdAndDelete(id);
    if (!productToBeDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: productToBeDeleted,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
};
