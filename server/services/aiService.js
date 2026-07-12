const Vehicle = require('../models/Vehicle');
const Maintenance = require('../models/Maintenance');
const Trip = require('../models/Trip');

const getDispatchRecommendations = async () => {
  const [vehicles, maintenance, trips] = await Promise.all([
    Vehicle.find({ status: 'ACTIVE' }).lean(),
    Maintenance.find({ status: { $in: ['PENDING', 'OVERDUE'] } }).lean(),
    Trip.find({ status: { $in: ['SCHEDULED', 'ASSIGNED'] } }).lean(),
  ]);

  return {
    vehicles,
    maintenance,
    trips,
    recommendation: `Dispatch ${vehicles.length} active vehicles across ${trips.length} pending trips.`,
  };
};

const getPredictiveMaintenance = async () => {
  const maintenance = await Maintenance.find({ status: { $in: ['PENDING', 'OVERDUE'] } }).lean();
  return {
    maintenance,
    message: maintenance.length ? 'Maintenance attention is required.' : 'No urgent maintenance recommended.',
  };
};

module.exports = { getDispatchRecommendations, getPredictiveMaintenance };
