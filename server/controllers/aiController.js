const aiService = require('../services/aiService');

const getDispatchRecommendations = async (req, res, next) => {
  try {
    const result = await aiService.getDispatchRecommendations();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getPredictiveMaintenance = async (req, res, next) => {
  try {
    const result = await aiService.getPredictiveMaintenance();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDispatchRecommendations, getPredictiveMaintenance };
