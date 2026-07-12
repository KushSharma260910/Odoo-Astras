const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TransitOps Backend Running"
    });
});

// Routes
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use("/api/fuel", require("./routes/fuelRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

module.exports = app;