const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const couponRoutes = require("./routes/couponRoutes");

const app = express();

// ========================================
// CONNECT MONGODB
// ========================================

connectDB();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// SERVE UPLOADED PRODUCT IMAGES
// ========================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ========================================
// API ROUTES
// ========================================

// Product routes
app.use("/api/products", productRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/users", userRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Coupon routes
app.use("/api/coupons", couponRoutes);

// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "Flavor Feast API is running",
  });
});

// ========================================
// CREATE HTTP SERVER
// ========================================

const server = http.createServer(app);

// ========================================
// CREATE SOCKET.IO SERVER
// ========================================

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make Socket.IO available to controllers
app.set("io", io);

// ========================================
// SOCKET CONNECTION
// ========================================

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});