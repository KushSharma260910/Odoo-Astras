const fuelService = require("../services/fuelService");


// ======================================
// GET ALL FUEL LOGS
// ======================================

exports.getFuelLogs = async (req, res) => {

    try {

        const fuelLogs = await fuelService.getFuelLogs();

        res.status(200).json({

            success: true,
            count: fuelLogs.length,
            data: fuelLogs

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ======================================
// CREATE FUEL LOG
// ======================================

exports.createFuelLog = async (req, res) => {

    try {

        const result =
            await fuelService.createFuelLog(req.body);

        res.status(201).json({

            success: true,
            message: "Fuel log added successfully",
            data: result

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,
            message: error.message

        });

    }

};  