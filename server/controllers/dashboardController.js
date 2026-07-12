const dashboardService = require("../services/dashboardService");

exports.getDashboard = async (req, res) => {

    try {

        const dashboard =
            await dashboardService.getDashboard();

        res.status(200).json({

            success: true,

            data: dashboard

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};