const express = require("express");

const router = express.Router();

const {

    getFuelLogs,
    createFuelLog

} = require("../controllers/fuelController");


// GET ALL FUEL LOGS
router.get("/", getFuelLogs);


// CREATE FUEL LOG
router.post("/", createFuelLog);


module.exports = router;