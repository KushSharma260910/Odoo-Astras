const tripService = require("../services/tripService");

// =====================================
// GET ALL TRIPS
// =====================================
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await tripService.getAllTrips();

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =====================================
// GET TRIP BY ID
// =====================================
exports.getTripById = async (req, res) => {

    try {

        const trip = await tripService.getTripById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.status(200).json({
            success: true,
            data: trip
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// CREATE TRIP
// =====================================
exports.createTrip = async (req, res) => {

    try {

        const trip = await tripService.createTrip(req.body);

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            data: trip
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// DISPATCH TRIP
// =====================================
exports.dispatchTrip = async (req, res) => {

    try {

        const result = await tripService.dispatchTrip(req.params.id);

        res.status(200).json({
            success: true,
            message: "Trip dispatched successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// COMPLETE TRIP
// =====================================
exports.completeTrip = async (req, res) => {

    try {

        const result = await tripService.completeTrip(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Trip completed successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// =====================================
// CANCEL TRIP
// =====================================
exports.cancelTrip = async (req, res) => {

    try {

        const result = await tripService.cancelTrip(req.params.id);

        res.status(200).json({
            success: true,
            message: "Trip cancelled successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};