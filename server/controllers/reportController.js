const reportService = require('../services/reportService');

const getReportOverview = async (req, res, next) => {
  try {
    const result = await reportService.getReportOverview();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReportOverview };
