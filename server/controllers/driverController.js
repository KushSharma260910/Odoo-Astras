const driverService = require("../services/driverService");

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getAllDrivers();

        res.status(200).json({
            success: true,
            count: drivers.length,
            data: drivers
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getDriverById = async (req, res) => {

    try {

        const driver = await driverService.getDriverById(req.params.id);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }

        res.json({
            success: true,
            data: driver
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAvailableDrivers = async (req, res) => {

    try {

        const drivers = await driverService.getAvailableDrivers();

        res.json({
            success: true,
            count: drivers.length,
            data: drivers
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.createDriver = async (req, res) => {

    try {

        const result = await driverService.createDriver(req.body);

        res.status(201).json({
            success: true,
            message: "Driver created successfully",
            driverId: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updateDriver = async (req, res) => {

    try {

        await driverService.updateDriver(req.params.id, req.body);

        res.json({
            success: true,
            message: "Driver updated successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.deleteDriver = async (req, res) => {

    try {

        await driverService.deleteDriver(req.params.id);

        res.json({
            success: true,
            message: "Driver deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};