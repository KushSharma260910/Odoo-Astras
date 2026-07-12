const dashboardService = require("../services/dashboardService");

exports.getDashboardStats = async (req, res) => {

    try {

        const stats = await dashboardService.getDashboardStats();

        res.status(200).json({

            success: true,

            data: stats

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};