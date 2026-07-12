const vehicleService = require('../services/vehicleService');

const getVehicles = async (req, res, next) => {
  try {
    const result = await vehicleService.getVehicles(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const result = await vehicleService.getVehicleById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createVehicle = async (req, res, next) => {
  try {
    const result = await vehicleService.createVehicle(req.body);
    res.status(201).json({ success: true, message: 'Vehicle created', data: result });
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const result = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Vehicle updated', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const result = await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json({ success: true, message: 'Vehicle deleted', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
