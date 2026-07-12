const Maintenance = require('../models/Maintenance');
const { buildPagination } = require('../utils/calculations');

const getMaintenances = async ({ page, limit, status }) => {
  const pagination = buildPagination(page, limit);
  const filter = status ? { status } : {};
  const [records, total] = await Promise.all([
    Maintenance.find(filter).populate('vehicle').populate('driver').skip(pagination.skip).limit(pagination.limit).sort({ scheduledDate: 1 }),
    Maintenance.countDocuments(filter),
  ]);

  return { maintenances: records, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const createMaintenance = async (data) => {
  return Maintenance.create(data);
};

const updateMaintenance = async (id, updates) => {
  const record = await Maintenance.findByIdAndUpdate(id, updates, { new: true });
  if (!record) {
    throw Object.assign(new Error('Maintenance record not found'), { statusCode: 404 });
  }
  return record;
};

const deleteMaintenance = async (id) => {
  const record = await Maintenance.findByIdAndDelete(id);
  if (!record) {
    throw Object.assign(new Error('Maintenance record not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getMaintenances, createMaintenance, updateMaintenance, deleteMaintenance };
