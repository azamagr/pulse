const mongoose = require("mongoose");

const CATEGORIES = ["Electronics", "Apparel", "Home", "Beauty", "Sports"];
const STATUSES = ["completed", "pending", "refunded"];

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    category: { type: String, enum: CATEGORIES, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: STATUSES, default: "completed" },
  },
  { timestamps: true }
);

orderSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Order", orderSchema);
module.exports.CATEGORIES = CATEGORIES;
module.exports.STATUSES = STATUSES;
