const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

dotenv.config();

const createDeliveryPartner = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const existingDelivery = await User.findOne({
      email: "delivery@flavorfeast.com",
    });

    if (existingDelivery) {
      console.log("Delivery partner already exists");
      console.log("Email:", existingDelivery.email);
      console.log("Role:", existingDelivery.role);

      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "Delivery@123",
      10
    );

    const deliveryPartner = await User.create({
      name: "Flavor Feast Delivery",
      email: "delivery@flavorfeast.com",
      password: hashedPassword,
      role: "delivery",
    });

    console.log("Delivery partner created successfully!");
    console.log("Email:", deliveryPartner.email);
    console.log("Role:", deliveryPartner.role);

    process.exit(0);
  } catch (error) {
    console.error("Delivery creation error:", error);
    process.exit(1);
  }
};

createDeliveryPartner();