const db = require("../config/db");

// Get all drivers
const getAllDrivers = async () => {
    const [rows] = await db.query(
        "SELECT * FROM drivers ORDER BY driver_id DESC"
    );
    return rows;
};

// Get driver by ID
const getDriverById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM drivers WHERE driver_id = ?",
        [id]
    );
    return rows[0];
};

// Get available drivers
const getAvailableDrivers = async () => {
    const [rows] = await db.query(
        "SELECT * FROM drivers WHERE status = 'AVAILABLE'"
    );
    return rows;
};

// Create driver
const createDriver = async (driver) => {

    const sql = `
        INSERT INTO drivers
        (
            employee_code,
            name,
            phone,
            email,
            address,
            date_of_birth,
            license_number,
            license_category,
            license_issue_date,
            license_expiry,
            joining_date,
            experience_years,
            safety_score,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        driver.employee_code,
        driver.name,
        driver.phone,
        driver.email,
        driver.address,
        driver.date_of_birth,
        driver.license_number,
        driver.license_category,
        driver.license_issue_date,
        driver.license_expiry,
        driver.joining_date,
        driver.experience_years || 0,
        driver.safety_score || 100.00,
        driver.status || "AVAILABLE"
    ]);

    return result;
};

// Update driver
const updateDriver = async (id, driver) => {

    const sql = `
        UPDATE drivers
        SET
            employee_code = ?,
            name = ?,
            phone = ?,
            email = ?,
            address = ?,
            date_of_birth = ?,
            license_number = ?,
            license_category = ?,
            license_issue_date = ?,
            license_expiry = ?,
            joining_date = ?,
            experience_years = ?,
            safety_score = ?,
            status = ?
        WHERE driver_id = ?
    `;

    const [result] = await db.query(sql, [
        driver.employee_code,
        driver.name,
        driver.phone,
        driver.email,
        driver.address,
        driver.date_of_birth,
        driver.license_number,
        driver.license_category,
        driver.license_issue_date,
        driver.license_expiry,
        driver.joining_date,
        driver.experience_years,
        driver.safety_score,
        driver.status,
        id
    ]);

    return result;
};

// Delete driver
const deleteDriver = async (id) => {

    const [result] = await db.query(
        "DELETE FROM drivers WHERE driver_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getAllDrivers,
    getDriverById,
    getAvailableDrivers,
    createDriver,
    updateDriver,
    deleteDriver
};