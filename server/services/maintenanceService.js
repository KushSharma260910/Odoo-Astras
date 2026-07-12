const pool = require("../config/db");

// ======================================================
// GET ALL MAINTENANCE
// ======================================================

exports.getAllMaintenance = async () => {

    const [rows] = await pool.query(

        `SELECT

            m.maintenance_id,

            m.maintenance_type,

            m.description,

            m.cost,

            m.start_date,

            m.completion_date,

            m.status,

            m.created_at,

            v.vehicle_id,

            v.vehicle_name,

            v.registration_number,

            v.vehicle_type

        FROM maintenance m

        JOIN vehicles v

            ON m.vehicle_id = v.vehicle_id

        ORDER BY

            m.created_at DESC`

    );

    return rows;

};


// ======================================================
// CREATE MAINTENANCE
// ======================================================

exports.createMaintenance = async (data) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            vehicle_id,

            maintenance_type,

            description,

            cost,

            start_date

        } = data;



        // ===================================
        // CHECK VEHICLE EXISTS
        // ===================================

        const [vehicle] = await connection.query(

            `SELECT *

            FROM vehicles

            WHERE vehicle_id = ?`,

            [

                vehicle_id

            ]

        );


        if (vehicle.length === 0)

            throw new Error("Vehicle not found.");



        // ===================================
        // VEHICLE SHOULD NOT BE ON TRIP
        // ===================================

        if (vehicle[0].status === "ON_TRIP")

            throw new Error("Vehicle is currently on a trip.");



        // ===================================
        // VEHICLE SHOULD NOT ALREADY
        // BE UNDER MAINTENANCE
        // ===================================

        if (vehicle[0].status === "IN_SHOP")

            throw new Error("Vehicle is already in maintenance.");



        // ===================================
        // INSERT MAINTENANCE RECORD
        // ===================================

        const [result] = await connection.query(

            `INSERT INTO maintenance(

                vehicle_id,

                maintenance_type,

                description,

                cost,

                start_date,

                status

            )

            VALUES(

                ?,?,?,?,?,?

            )`,

            [

                vehicle_id,

                maintenance_type,

                description,

                cost,

                start_date,

                "IN_PROGRESS"

            ]

        );



        // ===================================
        // UPDATE VEHICLE STATUS
        // ===================================

        await connection.query(

            `UPDATE vehicles

            SET status='IN_SHOP'

            WHERE vehicle_id=?`,

            [

                vehicle_id

            ]

        );
            // commit transaction
            await connection.commit();

            return { maintenance_id: result.insertId };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
}