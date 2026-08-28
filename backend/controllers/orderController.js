const Order = require("../models/Order");

// CREATE ORDER
// Customers can create an order for themselves
const createOrder = async (req, res) => {
  try {
    const {
      items,
      subtotal,
      deliveryFee,
      total,
      paymentStatus,
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

    // Generate a simple order number
    const orderNumber = `FF${Date.now().toString().slice(-6)}`;

    // Create order using the authenticated customer's ID
    const order = await Order.create({
      orderNumber,
      customer: req.user.id,
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

// GET ALL ORDERS
// Admin can view all customer orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email role")
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

// GET SINGLE ORDER
// Admin can view one order by its MongoDB ID
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email role")
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

// UPDATE ORDER
// Admin can update order details and status
const updateOrder = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Prevent changing the customer through this endpoint
    delete updateData.customer;

    // Prevent changing the order number
    delete updateData.orderNumber;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer", "name email role")
      .populate("items.product", "name category image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
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

// DELETE ORDER
// Admin can delete an order
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

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};