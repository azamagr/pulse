const express = require("express");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");
const seedRoutes = require("./routes/seedRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Pulse Dashboard API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/seed", seedRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
