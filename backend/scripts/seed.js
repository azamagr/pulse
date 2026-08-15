require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const Order = require("../src/models/Order");
const { generateOrders } = require("../src/utils/generateOrders");

async function seed() {
  try {
    await connectDB();
    await Order.deleteMany({});

    const orders = generateOrders(260);
    await Order.insertMany(orders);

    console.log(`Seeded ${orders.length} orders across the last 90 days.`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
