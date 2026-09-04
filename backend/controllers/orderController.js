const Order = require("../models/Order");
const User = require("../models/User");

// ========================================
// CREATE ORDER
// Customers can create an order for themselves
// ========================================

const createOrder = async (req, res) => {
  try {
    const {
      items,
      subtotal,
      deliveryFee,
      total,
      paymentStatus,
      name,
      phone,
      address,
      specialInstructions,
    } = req.body;

    // Validate required order data
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    if (subtotal === undefined || total === undefined) {
      return res.status(400).json({
        message: "Subtotal and total are required",
      });
    }

    // Validate delivery details
    if (!name || !phone || !address) {
      return res.status(400).json({
        message: "Name, phone and address are required",
      });
    }

    // Generate a simple order number
    const orderNumber = `FF${Date.now().toString().slice(-6)}`;

    // Create order using the authenticated customer's ID
    const order = await Order.create({
      orderNumber,
      customer: req.user.id,
      deliveryDetails: {
        name,
        phone,
        address,
        specialInstructions: specialInstructions || "",
      },
      deliveryPartner: null,
      items,
      subtotal,
      deliveryFee: deliveryFee || 0,
      total,
      paymentStatus: paymentStatus || "Pending",
      status: "Pending",
    });

    // Return the newly created order
    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image");

    res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ========================================
// GET ALL ORDERS
// Admin can view all customer orders
// ========================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ========================================
// GET CUSTOMER ORDERS
// Customer can only view their own orders
// ========================================

const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get Customer Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch customer orders",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE ORDER
// Admin can view one order by its MongoDB ID
// ========================================

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE ORDER
// Admin can:
// - Update Confirmed / Preparing / Cancelled
// - Assign or remove delivery partner
//
// Admin CANNOT:
// - Set Out for Delivery
// - Set Delivered
// - Change payment status
// ========================================

const updateOrder = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Prevent changing the customer through this endpoint
    delete updateData.customer;

    // Prevent changing the order number
    delete updateData.orderNumber;

    // Prevent admin from changing delivery-controlled statuses
    if (
      updateData.status === "Out for Delivery" ||
      updateData.status === "Delivered"
    ) {
      return res.status(403).json({
        message:
          "Out for Delivery and Delivered statuses can only be updated by the delivery partner",
      });
    }

    // Prevent admin from changing payment status
    if (updateData.paymentStatus !== undefined) {
      return res.status(403).json({
        message:
          "Payment status can only be updated by the delivery partner",
      });
    }

    // Prevent assigning an unavailable delivery partner
    if (updateData.deliveryPartner) {
      const deliveryPartner = await User.findOne({
        _id: updateData.deliveryPartner,
        role: "delivery",
      });

      if (!deliveryPartner) {
        return res.status(404).json({
          message: "Delivery partner not found",
        });
      }

      if (!deliveryPartner.isAvailable) {
        return res.status(400).json({
          message: "Delivery partner is currently unavailable",
        });
      }
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ========================================
    // REAL-TIME ADMIN STATUS UPDATE
    // ========================================

    const io = req.app.get("io");

    // Only emit when Admin changed the order status
    if (req.body.status !== undefined) {
      io.emit("orderStatusUpdated", order);
    }

    res.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error);

    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// ========================================
// DELETE ORDER
// Admin can delete an order
// ========================================

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);

    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

// ========================================
// GET DELIVERY PARTNER ORDERS
// Delivery partner can only see orders assigned to themselves
// ========================================

const getDeliveryOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user.id,
    })
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get Delivery Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch delivery orders",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE DELIVERY ORDER
// Delivery partner can only view an order assigned to themselves
// ========================================

const getDeliveryOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      deliveryPartner: req.user.id,
    })
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found or not assigned to you",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Get Delivery Order Error:", error);

    res.status(500).json({
      message: "Failed to fetch delivery order",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE DELIVERY STATUS
// Delivery partner can only update the status
// of their assigned order
// ========================================

const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid delivery status",
      });
    }

    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        deliveryPartner: req.user.id,
      },
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found or not assigned to you",
      });
    }

    // Send real-time status update to connected clients
    const io = req.app.get("io");

    io.emit("orderStatusUpdated", order);

    res.json({
      message: "Delivery status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Delivery Status Error:", error);

    res.status(500).json({
      message: "Failed to update delivery status",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE DELIVERY PAYMENT STATUS
// Delivery partner can only update payment status
// of their assigned order
// ========================================

const updateDeliveryPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const allowedPaymentStatuses = [
      "Pending",
      "Paid",
      "Failed",
    ];

    if (!allowedPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        message: "Invalid payment status",
      });
    }

    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        deliveryPartner: req.user.id,
      },
      {
        paymentStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer", "name email role")
      .populate("deliveryPartner", "name email role")
      .populate("items.product", "name category image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found or not assigned to you",
      });
    }

    // Send real-time payment update to connected clients
    const io = req.app.get("io");

    io.emit("orderPaymentStatusUpdated", order);

    res.json({
      message: "Payment status updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Update Delivery Payment Status Error:",
      error
    );

    res.status(500).json({
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

// ========================================
// EXPORT CONTROLLERS
// ========================================

module.exports = {
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
};