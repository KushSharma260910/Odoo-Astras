const Vehicle = require('../models/Vehicle');
const { buildPagination } = require('../utils/calculations');

const getVehicles = async ({ page, limit, status }) => {
  const pagination = buildPagination(page, limit);
  const filter = status ? { status } : {};
  const [vehicles, total] = await Promise.all([
    Vehicle.find(filter).populate('assignedDriver').skip(pagination.skip).limit(pagination.limit).sort({ createdAt: -1 }),
    Vehicle.countDocuments(filter),
  ]);

  return { vehicles, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const getVehicleById = async (id) => {
  const vehicle = await Vehicle.findById(id).populate('assignedDriver');
  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }
  return vehicle;
};

const createVehicle = async (data) => {
  return Vehicle.create(data);
};

const updateVehicle = async (id, updates) => {
  const vehicle = await Vehicle.findByIdAndUpdate(id, updates, { new: true });
  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }
  return vehicle;
};

const deleteVehicle = async (id) => {
  const vehicle = await Vehicle.findByIdAndDelete(id);
  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
