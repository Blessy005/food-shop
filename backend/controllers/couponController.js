const Coupon = require("../models/Coupon");

// ========================================
// CREATE COUPON
// Admin can create a new coupon
// ========================================

const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minimumOrderAmount,
      maximumDiscount,
      expiryDate,
      isActive,
    } = req.body;

    // Validate required fields
    if (
      !code ||
      !discountType ||
      discountValue === undefined ||
      !expiryDate
    ) {
      return res.status(400).json({
        message:
          "Code, discount type, discount value and expiry date are required",
      });
    }

    // Validate discount type
    if (!["percentage", "fixed"].includes(discountType)) {
      return res.status(400).json({
        message: "Invalid discount type",
      });
    }

    // Validate discount value
    if (discountValue <= 0) {
      return res.status(400).json({
        message: "Discount value must be greater than 0",
      });
    }

    // Percentage cannot be more than 100
    if (
      discountType === "percentage" &&
      discountValue > 100
    ) {
      return res.status(400).json({
        message:
          "Percentage discount cannot be more than 100%",
      });
    }

    // Check if coupon already exists
    const existingCoupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (existingCoupon) {
      return res.status(400).json({
        message: "Coupon code already exists",
      });
    }

    // Create coupon
    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue,
      minimumOrderAmount:
        minimumOrderAmount || 0,
      maximumDiscount:
        maximumDiscount || null,
      expiryDate,
      isActive:
        isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error(
      "Create Coupon Error:",
      error
    );

    res.status(500).json({
      message: "Failed to create coupon",
      error: error.message,
    });
  }
};

// ========================================
// GET ALL COUPONS
// Admin can view all coupons
// ========================================

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .sort({ createdAt: -1 });

    res.json(coupons);
  } catch (error) {
    console.error(
      "Get Coupons Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch coupons",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE COUPON
// Admin can view one coupon
// ========================================

const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(
      req.params.id
    );

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    res.json(coupon);
  } catch (error) {
    console.error(
      "Get Coupon Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch coupon",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE COUPON
// Admin can update a coupon
// ========================================

const updateCoupon = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Always store coupon code in uppercase
    if (updateData.code) {
      updateData.code =
        updateData.code.trim().toUpperCase();
    }

    // Validate discount type
    if (
      updateData.discountType &&
      !["percentage", "fixed"].includes(
        updateData.discountType
      )
    ) {
      return res.status(400).json({
        message: "Invalid discount type",
      });
    }

    // Validate percentage
    if (
      updateData.discountType ===
        "percentage" &&
      updateData.discountValue > 100
    ) {
      return res.status(400).json({
        message:
          "Percentage discount cannot be more than 100%",
      });
    }

    // Check duplicate coupon code
    if (updateData.code) {
      const existingCoupon =
        await Coupon.findOne({
          code: updateData.code,
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingCoupon) {
        return res.status(400).json({
          message: "Coupon code already exists",
        });
      }
    }

    const coupon =
      await Coupon.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    res.json({
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    console.error(
      "Update Coupon Error:",
      error
    );

    res.status(500).json({
      message: "Failed to update coupon",
      error: error.message,
    });
  }
};

// ========================================
// DELETE COUPON
// Admin can delete a coupon
// ========================================

const deleteCoupon = async (req, res) => {
  try {
    const coupon =
      await Coupon.findByIdAndDelete(
        req.params.id
      );

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    res.json({
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Coupon Error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete coupon",
      error: error.message,
    });
  }
};

// ========================================
// APPLY COUPON
// Customer can validate a coupon
// ========================================

const applyCoupon = async (req, res) => {
  try {
    const {
      code,
      subtotal,
    } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Coupon code is required",
      });
    }

    if (
      subtotal === undefined ||
      subtotal < 0
    ) {
      return res.status(400).json({
        message: "Valid subtotal is required",
      });
    }

    // Find coupon
    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid coupon code",
      });
    }

    // Check active status
    if (!coupon.isActive) {
      return res.status(400).json({
        message: "This coupon is inactive",
      });
    }

    // Check expiry
    if (
      new Date(coupon.expiryDate) < new Date()
    ) {
      return res.status(400).json({
        message: "This coupon has expired",
      });
    }

    // Check minimum order amount
    if (
      subtotal < coupon.minimumOrderAmount
    ) {
      return res.status(400).json({
        message: `Minimum order amount is ₹${coupon.minimumOrderAmount}`,
      });
    }

    // Calculate discount
    let discount = 0;

    if (
      coupon.discountType === "percentage"
    ) {
      discount =
        (subtotal * coupon.discountValue) /
        100;

      // Apply maximum discount if configured
      if (
        coupon.maximumDiscount !== null &&
        discount > coupon.maximumDiscount
      ) {
        discount =
          coupon.maximumDiscount;
      }
    } else {
      // Fixed discount cannot exceed subtotal
      discount = Math.min(
        coupon.discountValue,
        subtotal
      );
    }

    // Round discount to 2 decimal places
    discount =
      Math.round(discount * 100) / 100;

    const updatedTotal =
      subtotal - discount;

    res.json({
      message: "Coupon applied successfully",
      coupon: {
        id: coupon._id,
        code: coupon.code,
        discountType:
          coupon.discountType,
        discountValue:
          coupon.discountValue,
      },
      discount,
      subtotal,
      updatedTotal,
    });
  } catch (error) {
    console.error(
      "Apply Coupon Error:",
      error
    );

    res.status(500).json({
      message: "Failed to apply coupon",
      error: error.message,
    });
  }
};

// ========================================
// EXPORT CONTROLLERS
// ========================================

module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};