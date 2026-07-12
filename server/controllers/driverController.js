const driverService = require('../services/driverService');

const getDrivers = async (req, res, next) => {
  try {
    const result = await driverService.getDrivers(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getDriverById = async (req, res, next) => {
  try {
    const result = await driverService.getDriverById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createDriver = async (req, res, next) => {
  try {
    const result = await driverService.createDriver(req.body);
    res.status(201).json({ success: true, message: 'Driver created', data: result });
  } catch (error) {
    next(error);
  }
};

const updateDriver = async (req, res, next) => {
  try {
    const result = await driverService.updateDriver(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Driver updated', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteDriver = async (req, res, next) => {
  try {
    const result = await driverService.deleteDriver(req.params.id);
    res.status(200).json({ success: true, message: 'Driver deleted', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver };
