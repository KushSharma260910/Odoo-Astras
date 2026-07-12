const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const FuelLog = require('../models/FuelLog');
const Maintenance = require('../models/Maintenance');
const Expense = require('../models/Expense');
const { hashPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const sanitizeUser = (user) => {
  const data = user.toObject ? user.toObject() : user;
  delete data.password;
  data.status = data.isActive ? 'Active' : 'Inactive';
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// Full database seed — creates all 5 role users + demo records for every
// collection so the dashboard immediately shows real data.
// Safe to call on every startup: skips if data already exists.
// ─────────────────────────────────────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    // ── 1. Seed Users (all 5 roles) ────────────────────────────────────────────
    const usersToSeed = [
      { name: 'System Administrator', email: 'admin@odooastras.com',      password: 'admin123',      role: 'ADMIN'        },
      { name: 'James Mitchell',       email: 'manager@odooastras.com',    password: 'manager123',    role: 'FLEET_MANAGER' },
      { name: 'Sarah Connor',         email: 'dispatcher@odooastras.com', password: 'dispatcher123', role: 'DISPATCHER'   },
      { name: 'Alex Turner',          email: 'driver@odooastras.com',     password: 'driver123',     role: 'DRIVER'       },
      { name: 'Carlos Rivera',        email: 'mechanic@odooastras.com',   password: 'mechanic123',   role: 'MECHANIC'     },
    ];

    for (const userData of usersToSeed) {
      const existingUser = await User.findOne({ email: userData.email });
      const hashed = await hashPassword(userData.password);

      if (existingUser) {
        await User.findByIdAndUpdate(existingUser._id, {
          ...userData,
          password: hashed,
          isActive: true,
          status: 'Active',
        });
        console.log(`[Seed] Updated user: ${userData.email}`);
      } else {
        await User.create({ ...userData, password: hashed, isActive: true, status: 'Active' });
        console.log(`[Seed] Created user: ${userData.email}`);
      }
    }

    // ── 2. Seed Vehicles (only if collections are empty) ───────────────────────
    const vehicleCount = await Vehicle.countDocuments();
    if (vehicleCount === 0) {
      const vehicles = await Vehicle.insertMany([
        { registrationNumber: 'TRK-001-AZ', make: 'Volvo',       model: 'FH16',      year: 2022, type: 'TRUCK', status: 'ACTIVE',      capacity: 25000, mileage: 45230, fuelType: 'DIESEL' },
        { registrationNumber: 'TRK-002-AZ', make: 'Freightliner', model: 'Cascadia',  year: 2021, type: 'TRUCK', status: 'ACTIVE',      capacity: 22000, mileage: 62100, fuelType: 'DIESEL' },
        { registrationNumber: 'VAN-003-AZ', make: 'Mercedes',    model: 'Sprinter',  year: 2023, type: 'VAN',   status: 'ACTIVE',      capacity: 3500,  mileage: 18750, fuelType: 'DIESEL' },
        { registrationNumber: 'BUS-004-AZ', make: 'MAN',         model: 'Lion City', year: 2020, type: 'BUS',   status: 'MAINTENANCE', capacity: 50,    mileage: 98400, fuelType: 'DIESEL' },
        { registrationNumber: 'TRK-005-AZ', make: 'Kenworth',    model: 'T680',      year: 2022, type: 'TRUCK', status: 'IDLE',        capacity: 30000, mileage: 33200, fuelType: 'DIESEL' },
        { registrationNumber: 'CAR-006-AZ', make: 'Toyota',      model: 'Hilux',     year: 2023, type: 'CAR',   status: 'ACTIVE',      capacity: 1000,  mileage: 12500, fuelType: 'PETROL' },
      ]);
      console.log(`[Seed] Created ${vehicles.length} vehicles`);

      // ── 3. Seed Drivers ─────────────────────────────────────────────────────
      const driverUser  = await User.findOne({ role: 'DRIVER' });
      const now         = new Date();

      const drivers = await Driver.insertMany([
        { name: 'Alex Turner',    email: 'driver@odooastras.com',    phone: '+1-555-0101', licenseNumber: 'DL-2021-001', licenseExpiryDate: new Date('2026-08-15'), status: 'ON_TRIP',  vehicle: vehicles[0]._id, user: driverUser?._id },
        { name: 'Marcus Johnson', email: 'marcus.j@odooastras.com',  phone: '+1-555-0102', licenseNumber: 'DL-2021-002', licenseExpiryDate: new Date('2026-11-20'), status: 'AVAILABLE', vehicle: vehicles[1]._id },
        { name: 'Priya Sharma',   email: 'priya.s@odooastras.com',   phone: '+1-555-0103', licenseNumber: 'DL-2022-003', licenseExpiryDate: new Date('2027-03-10'), status: 'AVAILABLE', vehicle: vehicles[2]._id },
        { name: 'David Okafor',   email: 'david.o@odooastras.com',   phone: '+1-555-0104', licenseNumber: 'DL-2020-004', licenseExpiryDate: new Date('2026-07-30'), status: 'INACTIVE',  vehicle: vehicles[4]._id },
        { name: 'Sofia Martinez', email: 'sofia.m@odooastras.com',   phone: '+1-555-0105', licenseNumber: 'DL-2023-005', licenseExpiryDate: new Date('2028-01-05'), status: 'AVAILABLE', vehicle: vehicles[5]._id },
      ]);
      console.log(`[Seed] Created ${drivers.length} drivers`);

      // Link drivers back to their vehicles
      await Vehicle.findByIdAndUpdate(vehicles[0]._id, { assignedDriver: drivers[0]._id });
      await Vehicle.findByIdAndUpdate(vehicles[1]._id, { assignedDriver: drivers[1]._id });
      await Vehicle.findByIdAndUpdate(vehicles[2]._id, { assignedDriver: drivers[2]._id });

      // ── 4. Seed Trips ────────────────────────────────────────────────────────
      const dispatcherUser = await User.findOne({ role: 'DISPATCHER' });

      const trips = await Trip.insertMany([
        {
          tripNumber: 'TRIP-001', title: 'Chicago → Detroit Freight Run',
          origin: 'Chicago, IL', destination: 'Detroit, MI',
          vehicle: vehicles[0]._id, driver: drivers[0]._id, dispatcher: dispatcherUser?._id,
          status: 'IN_PROGRESS',
          startTime: new Date(now.getTime() - 4 * 3600 * 1000),
          distanceMiles: 280, revenue: 4200, expenses: 650,
        },
        {
          tripNumber: 'TRIP-002', title: 'Dallas → Houston Express',
          origin: 'Dallas, TX', destination: 'Houston, TX',
          vehicle: vehicles[1]._id, driver: drivers[1]._id, dispatcher: dispatcherUser?._id,
          status: 'COMPLETED',
          startTime: new Date(now.getTime() - 2 * 86400 * 1000),
          endTime:   new Date(now.getTime() - 1 * 86400 * 1000),
          distanceMiles: 240, revenue: 3800, expenses: 520,
        },
        {
          tripNumber: 'TRIP-003', title: 'Phoenix → Las Vegas Delivery',
          origin: 'Phoenix, AZ', destination: 'Las Vegas, NV',
          vehicle: vehicles[2]._id, driver: drivers[2]._id, dispatcher: dispatcherUser?._id,
          status: 'SCHEDULED',
          startTime: new Date(now.getTime() + 1 * 86400 * 1000),
          distanceMiles: 300, revenue: 5100, expenses: 700,
        },
        {
          tripNumber: 'TRIP-004', title: 'Atlanta → Miami Long Haul',
          origin: 'Atlanta, GA', destination: 'Miami, FL',
          vehicle: vehicles[0]._id, driver: drivers[0]._id, dispatcher: dispatcherUser?._id,
          status: 'COMPLETED',
          startTime: new Date(now.getTime() - 5 * 86400 * 1000),
          endTime:   new Date(now.getTime() - 4 * 86400 * 1000),
          distanceMiles: 660, revenue: 9800, expenses: 1200,
        },
        {
          tripNumber: 'TRIP-005', title: 'Seattle → Portland Run',
          origin: 'Seattle, WA', destination: 'Portland, OR',
          vehicle: vehicles[5]._id, driver: drivers[4]._id, dispatcher: dispatcherUser?._id,
          status: 'CANCELLED',
          startTime: new Date(now.getTime() - 1 * 86400 * 1000),
          distanceMiles: 175, revenue: 0, expenses: 0,
        },
        {
          tripNumber: 'TRIP-006', title: 'Denver → Salt Lake City',
          origin: 'Denver, CO', destination: 'Salt Lake City, UT',
          vehicle: vehicles[1]._id, driver: drivers[1]._id, dispatcher: dispatcherUser?._id,
          status: 'ASSIGNED',
          startTime: new Date(now.getTime() + 2 * 86400 * 1000),
          distanceMiles: 525, revenue: 7200, expenses: 950,
        },
      ]);
      console.log(`[Seed] Created ${trips.length} trips`);

      // ── 5. Seed Fuel Logs ────────────────────────────────────────────────────
      await FuelLog.insertMany([
        { vehicle: vehicles[0]._id, driver: drivers[0]._id, fuelType: 'DIESEL', quantity: 120, cost: 480,  mileage: 45230, loggedAt: new Date(now.getTime() - 2 * 86400 * 1000) },
        { vehicle: vehicles[1]._id, driver: drivers[1]._id, fuelType: 'DIESEL', quantity: 95,  cost: 380,  mileage: 62100, loggedAt: new Date(now.getTime() - 3 * 86400 * 1000) },
        { vehicle: vehicles[2]._id, driver: drivers[2]._id, fuelType: 'DIESEL', quantity: 60,  cost: 240,  mileage: 18750, loggedAt: new Date(now.getTime() - 1 * 86400 * 1000) },
        { vehicle: vehicles[3]._id,                         fuelType: 'DIESEL', quantity: 140, cost: 560,  mileage: 98400, loggedAt: new Date(now.getTime() - 4 * 86400 * 1000) },
        { vehicle: vehicles[4]._id,                         fuelType: 'DIESEL', quantity: 110, cost: 440,  mileage: 33200, loggedAt: new Date(now.getTime() - 5 * 86400 * 1000) },
        { vehicle: vehicles[5]._id, driver: drivers[4]._id, fuelType: 'PETROL', quantity: 45,  cost: 162,  mileage: 12500, loggedAt: new Date(now.getTime() - 1 * 86400 * 1000) },
      ]);
      console.log('[Seed] Created fuel logs');

      // ── 6. Seed Maintenance ──────────────────────────────────────────────────
      await Maintenance.insertMany([
        { vehicle: vehicles[3]._id, title: 'Engine overhaul',          type: 'REPAIR',     status: 'IN_PROGRESS', scheduledDate: new Date(now.getTime() - 2 * 86400 * 1000), cost: 3200, description: 'Full engine overhaul due to oil leak' },
        { vehicle: vehicles[0]._id, title: 'Tire rotation',            type: 'SERVICE',    status: 'COMPLETED',   scheduledDate: new Date(now.getTime() - 7 * 86400 * 1000), completedDate: new Date(now.getTime() - 6 * 86400 * 1000), cost: 320 },
        { vehicle: vehicles[1]._id, title: 'Annual safety inspection', type: 'INSPECTION', status: 'PENDING',     scheduledDate: new Date(now.getTime() + 5 * 86400 * 1000), cost: 150 },
        { vehicle: vehicles[4]._id, title: 'Brake pad replacement',    type: 'REPAIR',     status: 'OVERDUE',     scheduledDate: new Date(now.getTime() - 10 * 86400 * 1000), cost: 680 },
        { vehicle: vehicles[2]._id, title: 'Oil change',               type: 'SERVICE',    status: 'COMPLETED',   scheduledDate: new Date(now.getTime() - 14 * 86400 * 1000), completedDate: new Date(now.getTime() - 13 * 86400 * 1000), cost: 220 },
      ]);
      console.log('[Seed] Created maintenance records');

      // ── 7. Seed Expenses ─────────────────────────────────────────────────────
      await Expense.insertMany([
        { title: 'Diesel refuel — TRK-001',    category: 'FUEL',        amount: 480,   vehicle: vehicles[0]._id, trip: trips[0]._id, status: 'APPROVED', expenseDate: new Date(now.getTime() - 2  * 86400 * 1000) },
        { title: 'Engine overhaul — BUS-004',  category: 'MAINTENANCE', amount: 3200,  vehicle: vehicles[3]._id,                    status: 'APPROVED', expenseDate: new Date(now.getTime() - 2  * 86400 * 1000) },
        { title: 'Toll fees — Dallas→Houston', category: 'TOLL',        amount: 45,    vehicle: vehicles[1]._id, trip: trips[1]._id, status: 'APPROVED', expenseDate: new Date(now.getTime() - 2  * 86400 * 1000) },
        { title: 'Fleet insurance — July',      category: 'INSURANCE',   amount: 8500,                                               status: 'APPROVED', expenseDate: new Date(now.getTime() - 10 * 86400 * 1000) },
        { title: 'Driver payroll — June',       category: 'PAYROLL',     amount: 22000,                                              status: 'APPROVED', expenseDate: new Date(now.getTime() - 12 * 86400 * 1000) },
        { title: 'Brake pads — TRK-005',        category: 'MAINTENANCE', amount: 680,   vehicle: vehicles[4]._id,                    status: 'PENDING',  expenseDate: new Date(now.getTime() - 3  * 86400 * 1000) },
      ]);
      console.log('[Seed] Created expenses');

      console.log('[Seed] ✅ Demo data seeded successfully.');
    } else {
      console.log(`[Seed] Database already populated (${vehicleCount} vehicles found) — skipping demo seed.`);
    }
  } catch (err) {
    console.error('[Seed] Error during seeding:', err.message);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Auth functions
// ─────────────────────────────────────────────────────────────────────────────
const loginUser = async ({ email, password, identifier }) => {
  const loginValue = (identifier || email || '').toString().trim().toLowerCase();
  const user = await User.findOne({
    $or: [{ email: loginValue }, { username: loginValue }],
  }).select('+password');

  if (!user) {
    throw Object.assign(new Error('Invalid email, username or password'), { statusCode: 401 });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw Object.assign(new Error('Invalid email, username or password'), { statusCode: 401 });
  }

  if (!user.isActive) {
    throw Object.assign(new Error('This account is disabled'), { statusCode: 403 });
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);
  return {
    token,
    user: sanitizeUser(user),
  };
};

const registerUser = async (data) => {
  const password = await hashPassword(data.password);
  const isActive = data.isActive ?? data.status !== 'Inactive';
  const user = await User.create({ ...data, password, isActive, status: isActive ? 'Active' : 'Inactive' });
  return sanitizeUser(user);
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  return user;
};

const updateProfile = async (userId, updates) => {
  const isActive = updates.isActive ?? updates.status !== 'Inactive';
  const user = await User.findByIdAndUpdate(
    userId,
    { ...updates, isActive, status: isActive ? 'Active' : 'Inactive' },
    { new: true }
  ).select('-password');
  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  return sanitizeUser(user);
};

module.exports = {
  seedDatabase,
  loginUser,
  registerUser,
  getCurrentUser,
  updateProfile,
};
