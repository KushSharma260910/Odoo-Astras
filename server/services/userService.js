const User = require('../models/User');
const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');
const { hashPassword } = require('../utils/password');
const { buildPagination } = require('../utils/calculations');

const syncAssignedVehicleForUser = async (user, assignedVehicleId) => {
  if (!user || !user._id) return;

  if (user.role === 'DRIVER') {
    const driver = await Driver.findOne({ user: user._id });
    if (!driver) return;

    const previousVehicle = driver.vehicle;
    await Driver.findByIdAndUpdate(driver._id, { vehicle: assignedVehicleId || null });

    if (previousVehicle && previousVehicle.toString() !== (assignedVehicleId || '').toString()) {
      await Vehicle.findByIdAndUpdate(previousVehicle, { assignedDriver: null });
    }

    if (assignedVehicleId) {
      await Vehicle.findByIdAndUpdate(assignedVehicleId, { assignedDriver: driver._id });
    }
  }
};

const getUsers = async ({ page, limit, role }) => {
  const pagination = buildPagination(page, limit);
  const filter = role ? { role } : {};
  const [users, total] = await Promise.all([
    User.find(filter).select('-password').populate('assignedVehicle').skip(pagination.skip).limit(pagination.limit).sort({ createdAt: -1 }),
    User.countDocuments(filter),
  ]);

  return { users, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password').populate('assignedVehicle');
  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  return user;
};

const createUser = async (data) => {
  const password = await hashPassword(data.password || 'transitops123');
  const isActive = data.isActive ?? data.status !== 'Inactive';
  const normalizedRole = data.role?.toUpperCase().replace(/\s+/g, '_');
  const assignedVehicle = data.assignedVehicle || null;
  const userData = {
    ...data,
    assignedVehicle,
    username: data.username?.toLowerCase().trim(),
    role: normalizedRole || 'FLEET_MANAGER',
    password,
    isActive,
    status: isActive ? 'Active' : 'Inactive',
  };

  const user = await User.create(userData);
  if (user.role === 'DRIVER') {
    await syncAssignedVehicleForUser(user, assignedVehicle);
    await Driver.findOneAndUpdate(
      { user: user._id },
      {
        $setOnInsert: {
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          licenseNumber: `AUTO-${Date.now()}`,
          licenseExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: 'AVAILABLE',
          user: user._id,
        },
      },
      { upsert: true, new: true }
    );
  }

  return user.toObject();
};

const updateUser = async (id, updates) => {
  const existingUser = await User.findById(id).select('-password');
  if (!existingUser) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  if (updates.password) {
    updates.password = await hashPassword(updates.password);
  }
  const isActive = updates.isActive ?? updates.status !== 'Inactive';
  const normalizedRole = updates.role?.toUpperCase().replace(/\s+/g, '_');
  const assignedVehicle = updates.assignedVehicle === '' ? null : updates.assignedVehicle;
  const user = await User.findByIdAndUpdate(
    id,
    {
      ...updates,
      assignedVehicle,
      username: updates.username?.toLowerCase().trim(),
      role: normalizedRole || undefined,
      isActive,
      status: isActive ? 'Active' : 'Inactive',
    },
    { new: true }
  ).select('-password');

  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  if (updates.assignedVehicle !== undefined || updates.role !== undefined) {
    await syncAssignedVehicleForUser({ ...user.toObject(), role: user.role }, assignedVehicle);
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
