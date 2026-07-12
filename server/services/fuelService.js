const pool = require("../config/db");


// ======================================
// GET ALL FUEL LOGS
// ======================================

exports.getFuelLogs = async () => {

    const [rows] = await pool.query(

        `SELECT

            f.*,

            v.vehicle_name,

            v.registration_number,

            t.source,

            t.destination

        FROM fuel_logs f

        JOIN vehicles v

            ON f.vehicle_id = v.vehicle_id

        LEFT JOIN trips t

            ON f.trip_id = t.trip_id

        ORDER BY fuel_date DESC`

    );

    return rows;

};


// ======================================
// CREATE FUEL LOG
// ======================================

exports.createFuelLog = async (data) => {

    const {

        vehicle_id,

        trip_id,

        fuel_date,

        liters,

        cost,

        odometer

    } = data;


    const [vehicle] = await pool.query(

        `SELECT *

        FROM vehicles

        WHERE vehicle_id=?`,

        [vehicle_id]

    );


    if (vehicle.length === 0)

        throw new Error("Vehicle not found.");


    const [result] = await pool.query(

        `INSERT INTO fuel_logs(

            vehicle_id,

            trip_id,

            fuel_date,

            liters,

            cost,

            odometer

        )

        VALUES(?,?,?,?,?,?)`,

        [

            vehicle_id,

            trip_id || null,

            fuel_date,

            liters,

            cost,

            odometer

        ]

    );


    return {

        fuel_log_id: result.insertId

    };

};