const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// ADMIN-ONLY USER ROUTES

// Get all users
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getUsers
);

// Get one user
router.get(
  "/:id",
  verifyToken,
  verifyAdmin,
  getUser
);

// Update user
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateUser
);

// Delete user
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteUser
);

module.exports = router;