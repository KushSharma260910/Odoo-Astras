const express = require("express");
const router = express.Router();

const {
    getAllTrips,
    getTripById,
    createTrip,
    dispatchTrip,
    completeTrip,
    cancelTrip
} = require("../controllers/tripController");

// GET all trips
router.get("/", getAllTrips);

// GET trip by ID
router.get("/:id", getTripById);

// CREATE new trip
router.post("/", createTrip);

// DISPATCH trip
router.patch("/:id/dispatch", dispatchTrip);

// COMPLETE trip
router.patch("/:id/complete", completeTrip);

// CANCEL trip
router.patch("/:id/cancel", cancelTrip);

module.exports = router;