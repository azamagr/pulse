const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not set in the environment (check your .env file)");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected:", mongoose.connection.name);
}

module.exports = connectDB;
const mongoose = require("mongoose");
const dns = require("dns");

// Some Windows networks/ISPs cause Node's own DNS resolver to fail SRV
// lookups (mongodb+srv://...) even when the OS-level DNS is set correctly
// and everything else on the machine has internet access. Pointing Node's
// resolver at Google's DNS directly, in code, works around it.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not set in the environment (check your .env file)");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected:", mongoose.connection.name);
}

module.exports = connectDB;