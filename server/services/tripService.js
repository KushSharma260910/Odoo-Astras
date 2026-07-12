const Trip = require('../models/Trip');
const TripHistory = require('../models/TripHistory');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const { buildPagination } = require('../utils/calculations');

const getTrips = async ({ page, limit, status }) => {
  const pagination = buildPagination(page, limit);
  const filter = status ? { status } : {};
  const [trips, total] = await Promise.all([
    Trip.find(filter).populate('vehicle').populate('driver').populate('dispatcher').skip(pagination.skip).limit(pagination.limit).sort({ startTime: -1 }),
    Trip.countDocuments(filter),
  ]);

  return { trips, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const getTripById = async (id) => {
  const trip = await Trip.findById(id).populate('vehicle').populate('driver').populate('dispatcher');
  if (!trip) {
    throw Object.assign(new Error('Trip not found'), { statusCode: 404 });
  }
  return trip;
};

const createTrip = async (data) => {
  const vehicle = await Vehicle.findById(data.vehicle);
  const driver = await Driver.findById(data.driver);

  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }
  if (!driver) {
    throw Object.assign(new Error('Driver not found'), { statusCode: 404 });
  }

  const statusValue = (vehicle.status || '').toUpperCase();
  const isVehicleAvailable = statusValue === 'AVAILABLE' || statusValue === 'ACTIVE' || statusValue === 'IDLE';
  const driverStatus = (driver.status || '').toUpperCase();
  const isDriverAvailable = driverStatus === 'AVAILABLE';
  const hasValidLicense = new Date(driver.licenseExpiryDate) > new Date();
  const cargoWeight = Number(data.cargoWeight || 0);
  const capacity = Number(vehicle.capacity || 0);

  if (!isVehicleAvailable) {
    throw Object.assign(new Error('Vehicle is not available for dispatch'), { statusCode: 400 });
  }
  if (!isDriverAvailable) {
    throw Object.assign(new Error('Driver is not available for dispatch'), { statusCode: 400 });
  }
  if (!hasValidLicense) {
    throw Object.assign(new Error('Driver license is expired'), { statusCode: 400 });
  }
  if (cargoWeight > capacity) {
    throw Object.assign(new Error('Cargo weight exceeds vehicle capacity'), { statusCode: 400 });
  }

  const tripNumber = `TRIP-${Date.now()}`;
  const trip = await Trip.create({ ...data, tripNumber, status: 'SCHEDULED' });
  await TripHistory.create({ trip: trip._id, status: trip.status, note: 'Trip created' });
  return trip;
};

const updateTrip = async (id, updates, changedBy) => {
  const action = updates?.action || updates?.status;
  const trip = await Trip.findById(id);
  if (!trip) {
    throw Object.assign(new Error('Trip not found'), { statusCode: 404 });
  }

  const vehicle = await Vehicle.findById(trip.vehicle);
  const driver = await Driver.findById(trip.driver);

  if (action === 'dispatch') {
    if (!vehicle || !driver) {
      throw Object.assign(new Error('Trip must have both vehicle and driver assigned'), { statusCode: 400 });
    }
    const vehicleStatus = (vehicle.status || '').toUpperCase();
    const isVehicleAvailable = vehicleStatus === 'AVAILABLE' || vehicleStatus === 'ACTIVE' || vehicleStatus === 'IDLE';
    const driverStatus = (driver.status || '').toUpperCase();
    const isDriverAvailable = driverStatus === 'AVAILABLE';
    const hasValidLicense = new Date(driver.licenseExpiryDate) > new Date();
    const cargoWeight = Number(trip.cargoWeight || 0);
    const capacity = Number(vehicle.capacity || 0);

    if (!isVehicleAvailable) {
      throw Object.assign(new Error('Vehicle is not available for dispatch'), { statusCode: 400 });
    }
    if (!isDriverAvailable) {
      throw Object.assign(new Error('Driver is not available for dispatch'), { statusCode: 400 });
    }
    if (!hasValidLicense) {
      throw Object.assign(new Error('Driver license is expired'), { statusCode: 400 });
    }
    if (cargoWeight > capacity) {
      throw Object.assign(new Error('Cargo weight exceeds vehicle capacity'), { statusCode: 400 });
    }

    await Vehicle.findByIdAndUpdate(vehicle._id, { status: 'ON_TRIP' });
    await Driver.findByIdAndUpdate(driver._id, { status: 'ON_TRIP' });
    trip.status = 'IN_PROGRESS';
    trip.startTime = trip.startTime || new Date();
  } else if (action === 'complete') {
    trip.status = 'COMPLETED';
    trip.endTime = trip.endTime || new Date();
    if (vehicle) await Vehicle.findByIdAndUpdate(vehicle._id, { status: 'AVAILABLE' });
    if (driver) await Driver.findByIdAndUpdate(driver._id, { status: 'AVAILABLE' });
  } else if (action === 'cancel') {
    trip.status = 'CANCELLED';
    if (vehicle) await Vehicle.findByIdAndUpdate(vehicle._id, { status: 'AVAILABLE' });
    if (driver) await Driver.findByIdAndUpdate(driver._id, { status: 'AVAILABLE' });
  }

  Object.assign(trip, updates, { status: trip.status });
  await trip.save();
  await TripHistory.create({ trip: trip._id, status: trip.status, note: `Trip ${action || 'updated'}`, changedBy });
  return trip.populate(['vehicle', 'driver', 'dispatcher']);
};

const deleteTrip = async (id) => {
  const trip = await Trip.findByIdAndDelete(id);
  if (!trip) {
    throw Object.assign(new Error('Trip not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
