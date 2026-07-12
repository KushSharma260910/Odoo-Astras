const maintenanceService = require('../services/maintenanceService');

const getMaintenances = async (req, res, next) => {
  try {
    const result = await maintenanceService.getMaintenances(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createMaintenance = async (req, res, next) => {
  try {
    const result = await maintenanceService.createMaintenance(req.body);
    res.status(201).json({ success: true, message: 'Maintenance record created', data: result });
  } catch (error) {
    next(error);
  }
};

const updateMaintenance = async (req, res, next) => {
  try {
    const result = await maintenanceService.updateMaintenance(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Maintenance updated', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteMaintenance = async (req, res, next) => {
  try {
    const result = await maintenanceService.deleteMaintenance(req.params.id);
    res.status(200).json({ success: true, message: 'Maintenance deleted', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMaintenances, createMaintenance, updateMaintenance, deleteMaintenance };
