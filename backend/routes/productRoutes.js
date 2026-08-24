const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../upload");

// CREATE
router.post("/", upload.single("image"), createProduct);

// READ ALL
router.get("/", getProducts);

// READ ONE
router.get("/:id", getProduct);

// UPDATE
router.put("/:id", upload.single("image"), updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;