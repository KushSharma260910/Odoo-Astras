const Trip = require('../models/Trip');
const Expense = require('../models/Expense');
const FuelLog = require('../models/FuelLog');
const Maintenance = require('../models/Maintenance');

const getReportOverview = async () => {
  const [trips, expenses, fuelLogs, maintenance] = await Promise.all([
    Trip.find({}).lean(),
    Expense.find({}).lean(),
    FuelLog.find({}).lean(),
    Maintenance.find({}).lean(),
  ]);

  return {
    totalTrips: trips.length,
    totalExpenses: expenses.reduce((sum, item) => sum + item.amount, 0),
    totalFuelCost: fuelLogs.reduce((sum, item) => sum + item.cost, 0),
    totalMaintenanceCost: maintenance.reduce((sum, item) => sum + item.cost, 0),
    trips,
    expenses,
    fuelLogs,
    maintenance,
  };
};

module.exports = { getReportOverview };
