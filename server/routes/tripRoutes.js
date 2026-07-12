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

router.get("/", getAllTrips);

router.get("/:id", getTripById);

router.post("/", createTrip);

router.patch("/:id/dispatch", dispatchTrip);

router.patch("/:id/complete", completeTrip);

router.patch("/:id/cancel", cancelTrip);

module.exports = router;