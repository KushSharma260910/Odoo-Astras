const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

router.get("/", vehicleController.getAllVehicles);

router.get("/available", vehicleController.getAvailableVehicles);

router.get("/:id", vehicleController.getVehicleById);

// router.post("/", vehicleController.createVehicle);

// router.put("/:id", vehicleController.updateVehicle);

// router.delete("/:id", vehicleController.deleteVehicle);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN", "FLEET_MANAGER"),
    vehicleController.createVehicle
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "FLEET_MANAGER"),
    vehicleController.updateVehicle
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    vehicleController.deleteVehicle
);

module.exports = router;