const Driver = require('../models/Driver');
const { buildPagination } = require('../utils/calculations');

const getDrivers = async ({ page, limit, status }) => {
  const pagination = buildPagination(page, limit);
  const filter = status ? { status } : {};
  const [drivers, total] = await Promise.all([
    Driver.find(filter).populate('vehicle').populate('user').skip(pagination.skip).limit(pagination.limit).sort({ createdAt: -1 }),
    Driver.countDocuments(filter),
  ]);

  return { drivers, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const getDriverById = async (id) => {
  const driver = await Driver.findById(id).populate('vehicle').populate('user');
  if (!driver) {
    throw Object.assign(new Error('Driver not found'), { statusCode: 404 });
  }
  return driver;
};

const createDriver = async (data) => {
  return Driver.create(data);
};

const updateDriver = async (id, updates) => {
  const driver = await Driver.findByIdAndUpdate(id, updates, { new: true });
  if (!driver) {
    throw Object.assign(new Error('Driver not found'), { statusCode: 404 });
  }
  return driver;
};

const deleteDriver = async (id) => {
  const driver = await Driver.findByIdAndDelete(id);
  if (!driver) {
    throw Object.assign(new Error('Driver not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver };
