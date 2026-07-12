const maintenanceService = require("../services/maintenanceService");

exports.getAllMaintenance = async (req, res) => {

    try {

        const maintenance =
            await maintenanceService.getAllMaintenance();

        res.status(200).json({
            success: true,
            count: maintenance.length,
            data: maintenance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.createMaintenance = async (req, res) => {

    try {

        const result =
            await maintenanceService.createMaintenance(req.body);

        res.status(201).json({
            success: true,
            message: "Maintenance created successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

exports.closeMaintenance = async (req, res) => {

    try {

        const result =
            await maintenanceService.closeMaintenance(req.params.id);

        res.status(200).json({
            success: true,
            message: "Maintenance completed successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};