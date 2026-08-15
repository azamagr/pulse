const express = require("express");
const Order = require("../models/Order");
const { generateOrders } = require("../utils/generateOrders");

const router = express.Router();

// GET /api/seed?key=YOUR_SEED_SECRET
// Lets you populate the live database from a browser, with no local
// MongoDB connection required — useful when your own machine can't
// reach Atlas (DNS/ISP issues) but the deployed backend can.
router.get("/", async (req, res, next) => {
  try {
    const providedKey = req.query.key;
    const expectedKey = process.env.SEED_SECRET;

    if (!expectedKey) {
      return res.status(500).json({
        success: false,
        message: "SEED_SECRET is not set on the server, so this endpoint is disabled.",
      });
    }

    if (!providedKey || providedKey !== expectedKey) {
      return res.status(403).json({ success: false, message: "Invalid or missing seed key." });
    }

    await Order.deleteMany({});
    const orders = generateOrders(260);
    await Order.insertMany(orders);

    res.json({ success: true, message: `Seeded ${orders.length} orders across the last 90 days.` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
