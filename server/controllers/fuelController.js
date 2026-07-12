const fuelService = require('../services/fuelService');

const getFuelLogs = async (req, res, next) => {
  try {
    const result = await fuelService.getFuelLogs(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createFuelLog = async (req, res, next) => {
  try {
    const result = await fuelService.createFuelLog(req.body);
    res.status(201).json({ success: true, message: 'Fuel log created', data: result });
  } catch (error) {
    next(error);
  }
};

const updateFuelLog = async (req, res, next) => {
  try {
    const result = await fuelService.updateFuelLog(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Fuel log updated', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteFuelLog = async (req, res, next) => {
  try {
    const result = await fuelService.deleteFuelLog(req.params.id);
    res.status(200).json({ success: true, message: 'Fuel log deleted', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFuelLogs, createFuelLog, updateFuelLog, deleteFuelLog };
