const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Expense = require('../models/Expense');
const FuelLog = require('../models/FuelLog');
const Maintenance = require('../models/Maintenance');

const getDashboardStats = async () => {
  const [vehicleCount, driverCount, tripCount, userCount, revenue, expenses, fuelCost, maintenanceCost, recentTrips] = await Promise.all([
    Vehicle.countDocuments(),
    Driver.countDocuments(),
    Trip.countDocuments(),
    User.countDocuments(),
    Trip.aggregate([{ $group: { _id: null, total: { $sum: '$revenue' } } }]),
    Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
    FuelLog.aggregate([{ $group: { _id: null, total: { $sum: '$cost' } } }]),
    Maintenance.aggregate([{ $group: { _id: null, total: { $sum: '$cost' } } }]),
    Trip.find({}).sort({ createdAt: -1 }).limit(5).populate('driver').populate('vehicle'),
  ]);

  return {
    stats: {
      vehicleCount,
      driverCount,
      tripCount,
      userCount,
      revenue: revenue[0]?.total || 0,
      expenses: expenses[0]?.total || 0,
      fuelCost: fuelCost[0]?.total || 0,
      maintenanceCost: maintenanceCost[0]?.total || 0,
    },
    recentTrips,
    chartData: [
      { name: 'Vehicles', value: vehicleCount },
      { name: 'Drivers', value: driverCount },
      { name: 'Trips', value: tripCount },
      { name: 'Revenue', value: revenue[0]?.total || 0 },
    ],
  };
};

module.exports = { getDashboardStats };
