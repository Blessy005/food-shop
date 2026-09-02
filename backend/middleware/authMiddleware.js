const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Get token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user information in request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};

const verifyDelivery = (req, res, next) => {
  if (req.user.role !== "delivery") {
    return res.status(403).json({
      message: "Delivery partner access required",
    });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyDelivery,
};