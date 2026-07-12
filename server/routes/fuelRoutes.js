const express = require("express");

const router = express.Router();

const {
    getFuelLogs,
    createFuelLog
} = require("../controllers/fuelController");

router.get("/", getFuelLogs);

router.post("/", createFuelLog);

module.exports = router;