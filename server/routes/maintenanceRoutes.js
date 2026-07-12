const express = require("express");

const router = express.Router();

const {
    getAllMaintenance,
    createMaintenance,
    closeMaintenance
} = require("../controllers/maintenanceController");

router.get("/", getAllMaintenance);

router.post("/", createMaintenance);

router.patch("/:id/close", closeMaintenance);

module.exports = router;