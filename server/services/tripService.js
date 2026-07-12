const db = require("../config/db");
const Trip = require("../models/Trip");

// Get all trips
const getAllTrips = () => Trip.getAllTrips();

// Get trip by id
const getTripById = (id) => Trip.getTripById(id);

// Get active trips
const getActiveTrips = () => Trip.getActiveTrips();

// validation
if (trip.cargo_weight > vehicle[0].max_load_capacity) {
    throw new Error("Cargo weight exceeds vehicle capacity");
}

/*
    CREATE TRIP
*/
const createTrip = async (trip) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        // Check Driver
        const [driver] = await connection.query(
            "SELECT * FROM drivers WHERE driver_id=?",
            [trip.driver_id]
        );

        if (driver.length === 0)
            throw new Error("Driver not found");

        if (driver[0].status !== "AVAILABLE")
            throw new Error("Driver is not available");

        // Check Vehicle
        const [vehicle] = await connection.query(
            "SELECT * FROM vehicles WHERE vehicle_id=?",
            [trip.vehicle_id]
        );

        if (vehicle.length === 0)
            throw new Error("Vehicle not found");

        if (vehicle[0].status !== "AVAILABLE")
            throw new Error("Vehicle is not available");

        // Create Trip
        const result = await Trip.createTrip(connection, trip);

        // Update Driver Status
        await connection.query(
            "UPDATE drivers SET status='ON_TRIP' WHERE driver_id=?",
            [trip.driver_id]
        );

        // Update Vehicle Status
        await connection.query(
            "UPDATE vehicles SET status='ON_TRIP' WHERE vehicle_id=?",
            [trip.vehicle_id]
        );

        // Trip History
        await connection.query(
            `INSERT INTO trip_history
            (trip_id,status,remarks)
            VALUES(?,?,?)`,
            [
                result.insertId,
                "SCHEDULED",
                "Trip Created"
            ]
        );

        await connection.commit();

        return result;

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};

/*
    UPDATE TRIP
*/
const updateTrip = (id, trip) =>
    Trip.updateTrip(id, trip);

/*
    DELETE TRIP
*/
const deleteTrip = (id) =>
    Trip.deleteTrip(id);

/*
    DISPATCH TRIP
*/
const dispatchTrip = async (id) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        await Trip.updateTripStatus(
            connection,
            id,
            "DISPATCHED"
        );

        await connection.query(
            `INSERT INTO trip_history
            (trip_id,status,remarks)
            VALUES(?,?,?)`,
            [
                id,
                "DISPATCHED",
                "Vehicle Dispatched"
            ]
        );

        await connection.commit();

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};

/*
    COMPLETE TRIP
*/
const completeTrip = async (id) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [trip] = await connection.query(
            "SELECT * FROM trips WHERE trip_id=?",
            [id]
        );

        if (trip.length === 0)
            throw new Error("Trip not found");

        await connection.query(
            `UPDATE trips
             SET trip_status='COMPLETED',
                 actual_end=NOW()
             WHERE trip_id=?`,
            [id]
        );

        await connection.query(
            `UPDATE drivers
             SET status='AVAILABLE'
             WHERE driver_id=?`,
            [trip[0].driver_id]
        );

        await connection.query(
            `UPDATE vehicles
             SET status='AVAILABLE'
             WHERE vehicle_id=?`,
            [trip[0].vehicle_id]
        );

        await connection.query(
            `INSERT INTO trip_history
            (trip_id,status,remarks)
            VALUES(?,?,?)`,
            [
                id,
                "COMPLETED",
                "Trip Completed"
            ]
        );

        await connection.commit();

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};

/*
    CANCEL TRIP
*/
const cancelTrip = async (id) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [trip] = await connection.query(
            "SELECT * FROM trips WHERE trip_id=?",
            [id]
        );

        if (trip.length === 0)
            throw new Error("Trip not found");

        await connection.query(
            `UPDATE trips
             SET trip_status='CANCELLED'
             WHERE trip_id=?`,
            [id]
        );

        await connection.query(
            `UPDATE drivers
             SET status='AVAILABLE'
             WHERE driver_id=?`,
            [trip[0].driver_id]
        );

        await connection.query(
            `UPDATE vehicles
             SET status='AVAILABLE'
             WHERE vehicle_id=?`,
            [trip[0].vehicle_id]
        );

        await connection.query(
            `INSERT INTO trip_history
            (trip_id,status,remarks)
            VALUES(?,?,?)`,
            [
                id,
                "CANCELLED",
                "Trip Cancelled"
            ]
        );

        await connection.commit();

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};

module.exports = {
    getAllTrips,
    getTripById,
    getActiveTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    dispatchTrip,
    completeTrip,
    cancelTrip
};