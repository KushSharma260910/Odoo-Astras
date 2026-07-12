const driverService = require("../services/driverService");

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getAllDrivers();

        res.status(200).json(drivers);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

exports.getDriverById = async (req, res) => {

    try {

        const driver = await driverService.getDriverById(req.params.id);

        if (!driver) {

            return res.status(404).json({
                message: "Driver not found"
            });

        }

        res.status(200).json(driver);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getAvailableDrivers = async (req, res) => {

    try {

        const drivers = await driverService.getAvailableDrivers();

        res.status(200).json(drivers);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.createDriver = async (req, res) => {

    try {

        const result = await driverService.createDriver(req.body);

        res.status(201).json({
            message: "Driver created successfully",
            id: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.updateDriver = async (req, res) => {

    try {

        await driverService.updateDriver(req.params.id, req.body);

        res.status(200).json({
            message: "Driver updated successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.deleteDriver = async (req, res) => {

    try {

        await driverService.deleteDriver(req.params.id);

        res.status(200).json({
            message: "Driver deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};