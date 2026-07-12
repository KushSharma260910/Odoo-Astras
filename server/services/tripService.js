const pool = require("../config/db");

// =======================================================
// GET ALL TRIPS
// =======================================================

exports.getAllTrips = async () => {

    const [rows] = await pool.query(`
        SELECT
            t.trip_id,
            t.source,
            t.destination,
            t.cargo_weight,
            t.planned_distance,
            t.actual_distance,
            t.status,
            t.start_time,
            t.end_time,

            v.vehicle_name,
            v.registration_number,

            d.name AS driver_name

        FROM trips t

        JOIN vehicles v
            ON t.vehicle_id = v.vehicle_id

        JOIN drivers d
            ON t.driver_id = d.driver_id

        ORDER BY t.trip_id DESC
    `);

    return rows;

};

// =======================================================
// GET TRIP BY ID
// =======================================================

exports.getTripById = async (tripId) => {

    const [rows] = await pool.query(

        `SELECT

            t.*,

            v.vehicle_name,
            v.registration_number,
            v.vehicle_type,

            d.name,
            d.contact_number,
            d.license_number

        FROM trips t

        JOIN vehicles v
            ON t.vehicle_id = v.vehicle_id

        JOIN drivers d
            ON t.driver_id = d.driver_id

        WHERE t.trip_id = ?`,

        [tripId]

    );

    return rows[0];

};

// =======================================================
// CREATE TRIP
// =======================================================

exports.createTrip = async (tripData) => {

    const {

        vehicle_id,
        driver_id,
        source,
        destination,
        cargo_weight,
        planned_distance

    } = tripData;

    // ----------------------------
    // Vehicle Validation
    // ----------------------------

    const [vehicle] = await pool.query(

        `SELECT *
         FROM vehicles
         WHERE vehicle_id = ?`,

        [vehicle_id]

    );

    if (vehicle.length === 0)
        throw new Error("Vehicle not found.");

    if (vehicle[0].status !== "AVAILABLE")
        throw new Error("Vehicle is not available.");

    // ----------------------------
    // Driver Validation
    // ----------------------------

    const [driver] = await pool.query(

        `SELECT *
         FROM drivers
         WHERE driver_id = ?`,

        [driver_id]

    );

    if (driver.length === 0)
        throw new Error("Driver not found.");

    if (driver[0].status !== "AVAILABLE")
        throw new Error("Driver is not available.");

    // ----------------------------
    // License Validation
    // ----------------------------

    const expiry = new Date(driver[0].license_expiry);
    const today = new Date();

    if (expiry < today)
        throw new Error("Driver license has expired.");

    // ----------------------------
    // Capacity Validation
    // ----------------------------

    if (cargo_weight > vehicle[0].max_load_capacity)
        throw new Error("Cargo exceeds vehicle capacity.");

    // ----------------------------
    // Insert Trip
    // ----------------------------

    const [result] = await pool.query(

        `INSERT INTO trips(

            vehicle_id,
            driver_id,
            source,
            destination,
            cargo_weight,
            planned_distance,
            status

        )

        VALUES(?,?,?,?,?,?,?)`,

        [

            vehicle_id,
            driver_id,
            source,
            destination,
            cargo_weight,
            planned_distance,
            "DRAFT"

        ]

    );

    return {

        trip_id: result.insertId

    };

};

// =======================================================
// DISPATCH TRIP
// =======================================================

exports.dispatchTrip = async (tripId) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const [trip] = await connection.query(
            `SELECT * FROM trips WHERE trip_id=?`,
            [tripId]
        );

        if (trip.length === 0)
            throw new Error("Trip not found.");

        if (trip[0].status !== "DRAFT")
            throw new Error("Only draft trips can be dispatched.");

        const [vehicle] = await connection.query(
            `SELECT * FROM vehicles WHERE vehicle_id=?`,
            [trip[0].vehicle_id]
        );

        if (vehicle[0].status !== "AVAILABLE")
            throw new Error("Vehicle is not available.");

        const [driver] = await connection.query(
            `SELECT * FROM drivers WHERE driver_id=?`,
            [trip[0].driver_id]
        );

        if (driver[0].status !== "AVAILABLE")
            throw new Error("Driver is not available.");

        if (new Date(driver[0].license_expiry) < new Date())
            throw new Error("Driver license expired.");

        await connection.query(
            `UPDATE trips
             SET status='DISPATCHED',
                 start_time=NOW()
             WHERE trip_id=?`,
            [tripId]
        );

        await connection.query(
            `UPDATE vehicles
             SET status='ON_TRIP'
             WHERE vehicle_id=?`,
            [trip[0].vehicle_id]
        );

        await connection.query(
            `UPDATE drivers
             SET status='ON_TRIP'
             WHERE driver_id=?`,
            [trip[0].driver_id]
        );

        await connection.query(
            `INSERT INTO trip_history
            (trip_id,old_status,new_status)
            VALUES(?,?,?)`,
            [tripId, "DRAFT", "DISPATCHED"]
        );

        await connection.commit();

        return {
            message: "Trip dispatched successfully"
        };

    } catch (error) {

        await connection.rollback();
        throw error;

    } finally {

        connection.release();

    }

};

// =======================================================
// COMPLETE TRIP
// =======================================================

exports.completeTrip = async (tripId, body) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            actual_distance,
            revenue,
            fuel_used,
            odometer

        } = body;

        const [trip] = await connection.query(
            `SELECT * FROM trips WHERE trip_id=?`,
            [tripId]
        );

        if (trip.length === 0)
            throw new Error("Trip not found.");

        if (trip[0].status !== "DISPATCHED")
            throw new Error("Trip is not dispatched.");

        await connection.query(
            `UPDATE trips
SET
    status='COMPLETED',
    actual_distance=?,
    fuel_used=?,
    revenue=?,
    end_time=NOW()
WHERE trip_id=?`,
            [
                actual_distance,
                fuel_used,
                revenue,
                tripId
            ]
        );

        await connection.query(
            `UPDATE vehicles
             SET status='AVAILABLE',
                 odometer=?
             WHERE vehicle_id=?`,
            [
                odometer,
                trip[0].vehicle_id
            ]
        );

        await connection.query(
            `UPDATE drivers
             SET status='AVAILABLE'
             WHERE driver_id=?`,
            [
                trip[0].driver_id
            ]
        );

        await connection.query(
            `INSERT INTO fuel_logs
            (
                vehicle_id,
                trip_id,
                fuel_date,
                liters,
                cost,
                odometer
            )
            VALUES(?,?,?,?,?,?)`,
            [
                trip[0].vehicle_id,
                tripId,
                new Date(),
                fuel_used,
                0,
                odometer
            ]
        );

        await connection.query(
            `INSERT INTO trip_history
            (
                trip_id,
                old_status,
                new_status
            )
            VALUES(?,?,?)`,
            [
                tripId,
                "DISPATCHED",
                "COMPLETED"
            ]
        );

        await connection.commit();

        return {
            message: "Trip completed successfully"
        };

    } catch (error) {

        await connection.rollback();
        throw error;

    } finally {

        connection.release();

    }

};

// =======================================================
// CANCEL TRIP
// =======================================================

exports.cancelTrip = async (tripId) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const [trip] = await connection.query(
            `SELECT * FROM trips WHERE trip_id=?`,
            [tripId]
        );

        if (trip.length === 0)
            throw new Error("Trip not found.");

        if (
            trip[0].status !== "DRAFT" &&
            trip[0].status !== "DISPATCHED"
        ) {
            throw new Error("Trip cannot be cancelled.");
        }

        if (trip[0].status === "DISPATCHED") {

            await connection.query(
                `UPDATE vehicles
                 SET status='AVAILABLE'
                 WHERE vehicle_id=?`,
                [trip[0].vehicle_id]
            );

            await connection.query(
                `UPDATE drivers
                 SET status='AVAILABLE'
                 WHERE driver_id=?`,
                [trip[0].driver_id]
            );

        }

        await connection.query(
            `UPDATE trips
             SET status='CANCELLED'
             WHERE trip_id=?`,
            [tripId]
        );

        await connection.query(
            `INSERT INTO trip_history
            (
                trip_id,
                old_status,
                new_status
            )
            VALUES(?,?,?)`,
            [
                tripId,
                trip[0].status,
                "CANCELLED"
            ]
        );

        await connection.commit();

        return {
            message: "Trip cancelled successfully"
        };

    } catch (error) {

        await connection.rollback();
        throw error;

    } finally {

        connection.release();

    }

};