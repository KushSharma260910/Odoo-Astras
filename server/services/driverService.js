const Driver = require("../models/Driver");

exports.getAllDrivers = async () => {
    return await Driver.getAllDrivers();
};

exports.getDriverById = async (id) => {};

exports.getAvailableDrivers = async () => {};

exports.createDriver = async (driverData) => {};

exports.updateDriver = async (id, driverData) => {};

exports.deleteDriver = async (id) => {};