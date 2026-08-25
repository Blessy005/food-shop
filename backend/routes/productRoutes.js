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

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProduct);


// ==========================================
// ADMIN-ONLY ROUTES
// ==========================================

// Create product
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  createProduct
);

// Update product
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteProduct
);

module.exports = router;