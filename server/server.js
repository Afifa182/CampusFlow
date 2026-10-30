require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "CaampusFlow API is running" }));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/students", require("./routes/students"));

// Fallback for unknown routes
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
