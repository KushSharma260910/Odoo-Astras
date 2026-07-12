const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const tripRoutes = require("./routes/tripRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use("/api/dashboard", dashboardRoutes);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TransitOps API Running"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/trips", tripRoutes);

module.exports = app;