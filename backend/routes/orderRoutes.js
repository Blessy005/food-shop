const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// CUSTOMER ROUTES

// Create a new order
router.post(
  "/",
  verifyToken,
  createOrder
);

// ADMIN-ONLY ROUTES

// Get all orders
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getOrders
);

// Get one order
router.get(
  "/:id",
  verifyToken,
  verifyAdmin,
  getOrder
);

// Update order
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateOrder
);

// Delete order
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteOrder
);

module.exports = router;