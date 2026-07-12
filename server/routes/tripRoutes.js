const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");

// CRUD
router.get("/", tripController.getAllTrips);

router.get("/active", tripController.getActiveTrips);

router.get("/:id", tripController.getTripById);

router.post("/", tripController.createTrip);

router.put("/:id", tripController.updateTrip);

router.delete("/:id", tripController.deleteTrip);

// Business Logic APIs
router.patch("/:id/dispatch", tripController.dispatchTrip);

router.patch("/:id/complete", tripController.completeTrip);

router.patch("/:id/cancel", tripController.cancelTrip);

module.exports = router;