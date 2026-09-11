const express = require("express");

const {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} = require("../controllers/couponController");

const router = express.Router();

// ========================================
// ADMIN COUPON ROUTES
// ========================================

// Create coupon
router.post("/", createCoupon);

// Get all coupons
router.get("/", getCoupons);

// Get single coupon
router.get("/:id", getCoupon);

// Update coupon
router.put("/:id", updateCoupon);

// Delete coupon
router.delete("/:id", deleteCoupon);

// ========================================
// CUSTOMER COUPON ROUTE
// ========================================

// Apply / validate coupon
router.post("/apply", applyCoupon);

module.exports = router;