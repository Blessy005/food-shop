const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getCustomerOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getDeliveryOrders,
  getDeliveryOrder,
  updateDeliveryStatus,
  updateDeliveryPaymentStatus,
} = require("../controllers/orderController");

const {
  verifyToken,
  verifyAdmin,
  verifyDelivery,
} = require("../middleware/authMiddleware");

// CUSTOMER

router.get("/my-orders", verifyToken, getCustomerOrders);

router.post("/", verifyToken, createOrder);

// DELIVERY

router.get(
  "/delivery",
  verifyToken,
  verifyDelivery,
  getDeliveryOrders
);

router.get(
  "/delivery/:id",
  verifyToken,
  verifyDelivery,
  getDeliveryOrder
);

router.patch(
  "/delivery/:id/status",
  verifyToken,
  verifyDelivery,
  updateDeliveryStatus
);

router.patch(
  "/delivery/:id/payment",
  verifyToken,
  verifyDelivery,
  updateDeliveryPaymentStatus
);

// ADMIN

router.get("/", verifyToken, verifyAdmin, getOrders);

router.get(
  "/:id",
  verifyToken,
  verifyAdmin,
  getOrder
);

router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateOrder
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteOrder
);

module.exports = router;