const db = require("../config/db");

// Get all trips
const getAllTrips = async () => {
    const [rows] = await db.query(
        `SELECT t.*,
                d.name AS driver_name,
                v.registration_number
         FROM trips t
         JOIN drivers d ON t.driver_id = d.driver_id
         JOIN vehicles v ON t.vehicle_id = v.vehicle_id
         ORDER BY t.trip_id DESC`
    );
    return rows;
};

// Get trip by ID
const getTripById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM trips WHERE trip_id = ?`,
        [id]
    );
    return rows[0];
};

// Get active trips
const getActiveTrips = async () => {
    const [rows] = await db.query(
        `SELECT *
         FROM trips
         WHERE trip_status IN ('SCHEDULED','DISPATCHED','IN_PROGRESS')`
    );
    return rows;
};

// Create trip
const createTrip = async (connection, trip) => {

    const sql = `
        INSERT INTO trips
        (
            trip_code,
            driver_id,
            vehicle_id,
            source,
            destination,
            scheduled_start,
            scheduled_end,
            estimated_distance,
            cargo_weight,
            remarks
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(sql, [
        trip.trip_code,
        trip.driver_id,
        trip.vehicle_id,
        trip.source,
        trip.destination,
        trip.scheduled_start,
        trip.scheduled_end,
        trip.estimated_distance,
        trip.cargo_weight,
        trip.remarks
    ]);

    return result;
};

// Update trip
const updateTrip = async (id, trip) => {

    const sql = `
        UPDATE trips
        SET
            source=?,
            destination=?,
            scheduled_start=?,
            scheduled_end=?,
            estimated_distance=?,
            cargo_weight=?,
            remarks=?
        WHERE trip_id=?
    `;

    const [result] = await db.query(sql, [
        trip.source,
        trip.destination,
        trip.scheduled_start,
        trip.scheduled_end,
        trip.estimated_distance,
        trip.cargo_weight,
        trip.remarks,
        id
    ]);

    return result;
};

// Update trip status
const updateTripStatus = async (connection, id, status) => {

    await connection.query(
        `UPDATE trips
         SET trip_status=?
         WHERE trip_id=?`,
        [status, id]
    );

};

// Delete trip
const deleteTrip = async (id) => {

    const [result] = await db.query(
        `DELETE FROM trips WHERE trip_id=?`,
        [id]
    );

    return result;
};

module.exports = {
    getAllTrips,
    getTripById,
    getActiveTrips,
    createTrip,
    updateTrip,
    updateTripStatus,
    deleteTrip
};