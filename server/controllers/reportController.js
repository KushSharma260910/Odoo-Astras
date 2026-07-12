const reportService = require("../services/reportService");

exports.getReports = async (req, res) => {

    try {

        const reports =
            await reportService.getReports();

        res.status(200).json({
            success: true,
            data: reports
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};