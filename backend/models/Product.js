const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,

    category: String,

    price: Number,

    image: String,

    description: String,

    stock: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);