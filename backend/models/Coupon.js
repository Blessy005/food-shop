const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    // Coupon code customers will enter
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // Percentage or fixed amount
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    // Discount value
    // Example:
    // 10 for 10%
    // 50 for ₹50
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    // Minimum order amount required to use coupon
    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Maximum discount allowed for percentage coupons
    maximumDiscount: {
      type: Number,
      default: null,
      min: 0,
    },

    // Coupon expiry date
    expiryDate: {
      type: Date,
      required: true,
    },

    // Admin can enable/disable coupon
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);