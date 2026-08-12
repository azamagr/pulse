const Order = require("../models/Order");

const VALID_RANGES = [7, 30, 90];

function parseRange(query) {
  const n = parseInt(query.range, 10);
  return VALID_RANGES.includes(n) ? n : 30;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return startOfDay(d);
}

function formatDateKey(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Fills in $0-revenue days so the line chart doesn't have gaps where no orders happened.
function fillDayRange(startDate, endDate, revenueByDayMap) {
  const days = [];
  const cursor = new Date(startDate);
  while (cursor <= endDate) {
    const key = formatDateKey(cursor);
    days.push({ date: key, revenue: revenueByDayMap.get(key) || 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function percentChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

// GET /api/dashboard?range=7|30|90
async function getDashboard(req, res, next) {
  try {
    const range = parseRange(req.query);
    const startDate = daysAgo(range - 1); // inclusive of today
    const today = startOfDay(new Date());
    const previousStart = daysAgo(range * 2 - 1);
    const previousEnd = daysAgo(range);

    const [overview, previousOverview, revenueByDayRaw, ordersByCategory, revenueByCategory] =
      await Promise.all([
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalRevenue: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, "$amount", 0] } },
              completedCount: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
            },
          },
        ]),
        Order.aggregate([
          { $match: { createdAt: { $gte: previousStart, $lt: previousEnd } } },
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalRevenue: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, "$amount", 0] } },
            },
          },
        ]),
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate }, status: "completed" } },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              revenue: { $sum: "$amount" },
            },
          },
        ]),
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          { $group: { _id: "$category", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate }, status: "completed" } },
          { $group: { _id: "$category", revenue: { $sum: "$amount" } } },
          { $sort: { revenue: -1 } },
        ]),
      ]);

    const current = overview[0] || { totalOrders: 0, totalRevenue: 0, completedCount: 0 };
    const previous = previousOverview[0] || { totalOrders: 0, totalRevenue: 0 };

    const avgOrderValue = current.completedCount > 0 ? current.totalRevenue / current.completedCount : 0;
    const previousAvgOrderValue =
      previousOverview[0] && previousOverview[0].totalOrders > 0
        ? previous.totalRevenue / previousOverview[0].totalOrders
        : 0;

    const revenueByDayMap = new Map(revenueByDayRaw.map((d) => [d._id, d.revenue]));
    const revenueByDay = fillDayRange(startDate, today, revenueByDayMap);

    res.json({
      success: true,
      data: {
        range,
        stats: {
          totalRevenue: current.totalRevenue,
          totalRevenueChange: percentChange(current.totalRevenue, previous.totalRevenue),
          totalOrders: current.totalOrders,
          totalOrdersChange: percentChange(current.totalOrders, previous.totalOrders),
          avgOrderValue,
          avgOrderValueChange: percentChange(avgOrderValue, previousAvgOrderValue),
        },
        revenueByDay,
        ordersByCategory: ordersByCategory.map((c) => ({ category: c._id, count: c.count })),
        revenueByCategory: revenueByCategory.map((c) => ({ category: c._id, revenue: c.revenue })),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboard };
