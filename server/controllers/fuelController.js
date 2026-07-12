const fuelService = require("../services/fuelService");

exports.getFuelLogs = async (req, res) => {

    try {

        const logs = await fuelService.getFuelLogs();

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.createFuelLog = async (req, res) => {

    try {

        const result =
            await fuelService.createFuelLog(req.body);

        res.status(201).json({
            success: true,
            message: "Fuel log created",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};