const FuelLog = require('../models/FuelLog');
const { buildPagination } = require('../utils/calculations');

const getFuelLogs = async ({ page, limit }) => {
  const pagination = buildPagination(page, limit);
  const [fuelLogs, total] = await Promise.all([
    FuelLog.find({}).populate('vehicle').populate('driver').skip(pagination.skip).limit(pagination.limit).sort({ loggedAt: -1 }),
    FuelLog.countDocuments(),
  ]);

  return { fuelLogs, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const createFuelLog = async (data) => {
  return FuelLog.create(data);
};

const updateFuelLog = async (id, updates) => {
  const record = await FuelLog.findByIdAndUpdate(id, updates, { new: true });
  if (!record) {
    throw Object.assign(new Error('Fuel log not found'), { statusCode: 404 });
  }
  return record;
};

const deleteFuelLog = async (id) => {
  const record = await FuelLog.findByIdAndDelete(id);
  if (!record) {
    throw Object.assign(new Error('Fuel log not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getFuelLogs, createFuelLog, updateFuelLog, deleteFuelLog };
