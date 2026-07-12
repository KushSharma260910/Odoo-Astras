const express = require("express");

const router = express.Router();

const maintenanceController = require("../controllers/maintenanceController");

router.get(
    "/",
    maintenanceController.getAllMaintenance
);

router.post(
    "/",
    maintenanceController.createMaintenance
);

router.patch(
    "/:id/close",
    maintenanceController.closeMaintenance
);

module.exports = router;