const Product = require("../models/productModel");

const getAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategory = async function (req, res) {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
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
    let newProduct = req.body;
    const oId = req.id;
    if (req.body.thumbnail == "") {
      const no =
        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
      newProduct = {
        ...newProduct,
        thumbnail: no,
      };
    }
    newProduct = { ...newProduct, businessOwnerId: oId };
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
    let dataToBeUpdated = req.body;
    const { id } = req.params;
    const productToBeUpdated = await Product.findById(id);

    if (!productToBeUpdated) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (req.body.thumbnail == "") {
      const no =
        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
      dataToBeUpdated = {
        ...dataToBeUpdated,
        thumbnail: no,
      };
    }
    dataToBeUpdated = { ...productToBeUpdated, ...dataToBeUpdated };
    productToBeUpdated.set(dataToBeUpdated);
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
const getAllProduct = async function (req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchProduct = async function (req, res) {
  try {
    const searchQuery = req.query.search;
    const products = await Product.find({
      title: { $regex: new RegExp(searchQuery, "i") },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProductsfromBusiness = async function (req, res) {
  try {
    const businessOwnerId = req.id;
    const products = await Product.find({ businessOwnerId });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error " });
  }
};
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
  getCategory,
  searchProduct,
  getAllProduct,
  getProductsfromBusiness,
};
