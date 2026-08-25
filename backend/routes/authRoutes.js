const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const router = express.Router();

// Customer registration
router.post("/register", register);

// Admin/customer login
router.post("/login", login);

module.exports = router;