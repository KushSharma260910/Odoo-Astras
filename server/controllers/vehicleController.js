const vehicleService = require("../services/vehicleService");

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();

        res.status(200).json({
            success: true,
            count: vehicles.length,
            data: vehicles
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getVehicleById = async (req, res) => {
    try {

        const vehicle = await vehicleService.getVehicleById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.json({
            success: true,
            data: vehicle
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAvailableVehicles = async (req, res) => {
    try {

        const vehicles = await vehicleService.getAvailableVehicles();

        res.json({
            success: true,
            count: vehicles.length,
            data: vehicles
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.createVehicle = async (req, res) => {
    try {

        const result = await vehicleService.createVehicle(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            vehicleId: result.insertId
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateVehicle = async (req, res) => {
    try {

        await vehicleService.updateVehicle(req.params.id, req.body);

        res.json({
            success: true,
            message: "Vehicle updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {

        await vehicleService.deleteVehicle(req.params.id);

        res.json({
            success: true,
            message: "Vehicle deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};