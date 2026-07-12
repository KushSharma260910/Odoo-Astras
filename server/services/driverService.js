const Driver = require("../models/Driver");

exports.getAllDrivers = async () => {

    return await Driver.getAllDrivers();

};

exports.getDriverById = async (id) => {

    return await Driver.getDriverById(id);

};

exports.getAvailableDrivers = async () => {

    return await Driver.getAvailableDrivers();

};

exports.createDriver = async (driver) => {

    return await Driver.createDriver(driver);

};

exports.updateDriver = async (id, driver) => {

    return await Driver.updateDriver(id, driver);

};

exports.deleteDriver = async (id) => {

    return await Driver.deleteDriver(id);

};