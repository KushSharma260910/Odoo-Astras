const db = require("../config/db");

exports.getAllDrivers = async () => {

    const [rows] = await db.query(`
        SELECT *
        FROM drivers
        ORDER BY driver_id DESC
    `);

    return rows;
};

exports.getDriverById = async (id) => {};

exports.getAvailableDrivers = async () => {};

exports.createDriver = async (driverData) => {};

exports.updateDriver = async (id, driverData) => {};

exports.deleteDriver = async (id) => {};