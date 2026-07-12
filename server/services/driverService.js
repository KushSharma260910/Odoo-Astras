const Driver = require("../models/Driver");

const getAllDrivers = () => Driver.getAllDrivers();

const getDriverById = (id) => Driver.getDriverById(id);

const getAvailableDrivers = () => Driver.getAvailableDrivers();

const createDriver = (driver) => Driver.createDriver(driver);

const updateDriver = (id, driver) => Driver.updateDriver(id, driver);

const deleteDriver = (id) => Driver.deleteDriver(id);

module.exports = {
    getAllDrivers,
    getDriverById,
    getAvailableDrivers,
    createDriver,
    updateDriver,
    deleteDriver
};