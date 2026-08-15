require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const Order = require("../src/models/Order");

const PRODUCTS = {
  Electronics: ["Wireless Earbuds", "Smart Watch", "Bluetooth Speaker", "Laptop Stand", "USB-C Hub"],
  Apparel: ["Denim Jacket", "Cotton Hoodie", "Running Shoes", "Graphic Tee", "Wool Scarf"],
  Home: ["Ceramic Mug Set", "Table Lamp", "Throw Blanket", "Scented Candle", "Cutting Board"],
  Beauty: ["Face Serum", "Lip Balm Set", "Hair Dryer", "Makeup Brush Kit", "Sunscreen SPF50"],
  Sports: ["Yoga Mat", "Resistance Bands", "Water Bottle", "Running Belt", "Foam Roller"],
};

const NAMES = [
  "Ayesha Khan", "Bilal Ahmed", "Sara Malik", "Usman Raza", "Hina Farooq",
  "Ali Hassan", "Zainab Iqbal", "Hamza Sheikh", "Mahnoor Tariq", "Fahad Nawaz",
  "Sana Yousaf", "Omar Siddiqui", "Rabia Aslam", "Danish Qureshi", "Areeba Javed",
];

const CATEGORIES = Object.keys(PRODUCTS);
const STATUS_WEIGHTS = [
  ["completed", 0.82],
  ["pending", 0.1],
  ["refunded", 0.08],
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedStatus() {
  const r = Math.random();
  let acc = 0;
  for (const [status, weight] of STATUS_WEIGHTS) {
    acc += weight;
    if (r <= acc) return status;
  }
  return "completed";
}

function randomDateWithinDays(days) {
  const now = Date.now();
  const past = now - days * 24 * 60 * 60 * 1000;
  return new Date(past + Math.random() * (now - past));
}

function generateOrder() {
  const category = pick(CATEGORIES);
  const product = pick(PRODUCTS[category]);
  const basePrice = { Electronics: 60, Apparel: 25, Home: 20, Beauty: 15, Sports: 18 }[category];
  const amount = Math.round((basePrice + Math.random() * basePrice * 1.5) * 100) / 100;

  return {
    customerName: pick(NAMES),
    product,
    category,
    amount,
    status: weightedStatus(),
    createdAt: randomDateWithinDays(90),
  };
}

async function seed() {
  try {
    await connectDB();
    await Order.deleteMany({});

    const orders = Array.from({ length: 260 }, generateOrder);
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
