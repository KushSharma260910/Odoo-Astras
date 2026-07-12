const tripService = require("../services/tripService");

// Get all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await tripService.getAllTrips();

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Get trip by ID
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

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Get active trips
exports.getActiveTrips = async (req, res) => {

    try {

        const trips = await tripService.getActiveTrips();

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Create trip
exports.createTrip = async (req, res) => {

    try {

        const result = await tripService.createTrip(req.body);

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            tripId: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Update trip
exports.updateTrip = async (req, res) => {

    try {

        await tripService.updateTrip(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Trip updated successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Delete trip
exports.deleteTrip = async (req, res) => {

    try {

        await tripService.deleteTrip(req.params.id);

        res.status(200).json({
            success: true,
            message: "Trip deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Dispatch trip
exports.dispatchTrip = async (req, res) => {

    try {

        await tripService.dispatchTrip(req.params.id);

        res.status(200).json({
            success: true,
            message: "Trip dispatched successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Complete trip
exports.completeTrip = async (req, res) => {

    try {

        await tripService.completeTrip(req.params.id);

        res.status(200).json({
            success: true,
            message: "Trip completed successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Cancel trip
exports.cancelTrip = async (req, res) => {

    try {

        await tripService.cancelTrip(req.params.id);

        res.status(200).json({
            success: true,
            message: "Trip cancelled successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};