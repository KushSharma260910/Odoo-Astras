const db = require("../config/db");

// Get all vehicles
const getAllVehicles = async () => {
    const [rows] = await db.query(
        "SELECT * FROM vehicles ORDER BY vehicle_id DESC"
    );
    return rows;
};

// Get vehicle by ID
const getVehicleById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM vehicles WHERE vehicle_id = ?",
        [id]
    );
    return rows[0];
};

// Get available vehicles
const getAvailableVehicles = async () => {
    const [rows] = await db.query(
        "SELECT * FROM vehicles WHERE status = 'AVAILABLE'"
    );
    return rows;
};

// Create vehicle
const createVehicle = async (vehicle) => {

    const sql = `
        INSERT INTO vehicles
        (
            registration_number,
            vehicle_name,
            vehicle_type,
            max_load_capacity,
            odometer,
            acquisition_cost,
            purchase_date,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        vehicle.registration_number,
        vehicle.vehicle_name,
        vehicle.vehicle_type,
        vehicle.max_load_capacity,
        vehicle.odometer || 0,
        vehicle.acquisition_cost,
        vehicle.purchase_date,
        vehicle.status || "AVAILABLE"
    ]);

    return result;
};

// Update vehicle
const updateVehicle = async (id, vehicle) => {

    const sql = `
        UPDATE vehicles
        SET
            registration_number = ?,
            vehicle_name = ?,
            vehicle_type = ?,
            max_load_capacity = ?,
            odometer = ?,
            acquisition_cost = ?,
            purchase_date = ?,
            status = ?
        WHERE vehicle_id = ?
    `;

    const [result] = await db.query(sql, [
        vehicle.registration_number,
        vehicle.vehicle_name,
        vehicle.vehicle_type,
        vehicle.max_load_capacity,
        vehicle.odometer,
        vehicle.acquisition_cost,
        vehicle.purchase_date,
        vehicle.status,
        id
    ]);

    return result;
};

// Delete vehicle
const deleteVehicle = async (id) => {

    const [result] = await db.query(
        "DELETE FROM vehicles WHERE vehicle_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    getAvailableVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle
};