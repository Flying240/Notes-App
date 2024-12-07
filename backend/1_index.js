const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Load Environment Variables
require("dotenv").config();
const config = require("./2_config/config.json");

// Import Routes
const userRoutes = require("./4_routes/userRoutes");
const noteRoutes = require("./4_routes/noteRoutes");

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB Connection
mongoose
    .connect(config.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Base Route
app.get("/", (req, res) => res.send("Hello, World!"));

// API Routes
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

// Start the Server
app.listen(8000, () => console.log("Server is running on port 8000"));

module.exports = app;
