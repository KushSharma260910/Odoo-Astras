const express = require("express");
const router = express.Router();

const driverController = require("../controllers/driverController");

router.get("/", driverController.getAllDrivers);

router.get("/available", driverController.getAvailableDrivers);

router.get("/:id", driverController.getDriverById);

// router.post("/", driverController.createDriver);

// router.put("/:id", driverController.updateDriver);

// router.delete("/:id", driverController.deleteDriver);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN", "FLEET_MANAGER"),
    driverController.createDriver
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "FLEET_MANAGER"),
    driverController.updateDriver
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    driverController.deleteDriver
);

module.exports = router;