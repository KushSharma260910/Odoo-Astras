const pool = require("../config/db");

// ======================================================
// GET ALL FUEL LOGS
// ======================================================

exports.getFuelLogs = async () => {

    const [rows] = await pool.query(

        `SELECT

            f.fuel_log_id,

            f.fuel_date,

            f.liters,

            f.cost,

            f.odometer,

            f.created_at,

            v.vehicle_id,

            v.vehicle_name,

            v.registration_number,

            t.trip_id,

            t.source,

            t.destination

        FROM fuel_logs f

        JOIN vehicles v

            ON f.vehicle_id = v.vehicle_id

        LEFT JOIN trips t

            ON f.trip_id = t.trip_id

        ORDER BY

            f.fuel_date DESC`

    );

    return rows;

};


// ======================================================
// CREATE FUEL LOG
// ======================================================

exports.createFuelLog = async (data) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            vehicle_id,

            trip_id,

            fuel_date,

            liters,

            cost,

            odometer

        } = data;



        // ===================================
        // CHECK VEHICLE
        // ===================================

        const [vehicle] = await connection.query(

            `SELECT *

            FROM vehicles

            WHERE vehicle_id=?`,

            [

                vehicle_id

            ]

        );



        if (vehicle.length === 0)

            throw new Error("Vehicle not found.");



        // ===================================
        // INSERT FUEL LOG
        // ===================================

        const [result] = await connection.query(

            `INSERT INTO fuel_logs(

                vehicle_id,

                trip_id,

                fuel_date,

                liters,

                cost,

                odometer

            )

            VALUES(

                ?,?,?,?,?,?

            )`,

            [

                vehicle_id,

                trip_id || null,

                fuel_date,

                liters,

                cost,

                odometer

            ]

        );



        // ===================================
        // UPDATE VEHICLE ODOMETER
        // ===================================

        if (odometer) {

            await connection.query(

                `UPDATE vehicles

                SET odometer=?

                WHERE vehicle_id=?`,

                [

                    odometer,

                    vehicle_id

                ]

            );

        }



        await connection.commit();

        return {

            fuel_log_id: result.insertId,

            message: "Fuel log created successfully"

        };

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};