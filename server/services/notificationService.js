const Trip = require('../models/Trip');
const Maintenance = require('../models/Maintenance');

const getNotifications = async () => {
  const [trips, maintenance] = await Promise.all([
    Trip.find({ status: { $in: ['SCHEDULED', 'DELAYED'] } }).limit(5).lean(),
    Maintenance.find({ status: { $in: ['PENDING', 'OVERDUE'] } }).limit(5).lean(),
  ]);

  return {
    notifications: [
      ...trips.map((trip) => ({ type: 'trip', message: `${trip.title} is ${trip.status.toLowerCase()}` })),
      ...maintenance.map((record) => ({ type: 'maintenance', message: `${record.title} is ${record.status.toLowerCase()}` })),
    ],
  };
};

module.exports = { getNotifications };
