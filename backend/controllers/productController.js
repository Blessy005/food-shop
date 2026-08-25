const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
    };

    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create(productData);

    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);

    res.status(500).json({
      message: "Failed to create product",
      error: err.message,
    });
  }
};

// READ ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);

    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

// GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);

    res.status(500).json({
      message: "Failed to fetch product",
      error: err.message,
    });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Update Product Error:", err);

    res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete uploaded image from backend/uploads
    if (product.image && product.image.startsWith("/uploads/")) {
      const imageName = path.basename(product.image);
      const imagePath = path.join(__dirname, "..", "uploads", imageName);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted:", imageName);
      }
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product and image deleted successfully",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);

    res.status(500).json({
      message: "Failed to delete product",
      error: err.message,
    });
  }
};