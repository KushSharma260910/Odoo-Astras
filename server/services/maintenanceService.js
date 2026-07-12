const pool = require("../config/db");


// ======================================
// GET ALL MAINTENANCE
// ======================================

exports.getAllMaintenance = async () => {

    const [rows] = await pool.query(

        `SELECT

            m.*,

            v.vehicle_name,

            v.registration_number

        FROM maintenance m

        JOIN vehicles v

        ON m.vehicle_id=v.vehicle_id

        ORDER BY m.maintenance_id DESC`

    );

    return rows;

};


// ======================================
// CREATE MAINTENANCE
// ======================================

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


        const [vehicle] = await connection.query(

            `SELECT *

            FROM vehicles

            WHERE vehicle_id=?`,

            [vehicle_id]

        );


        if (vehicle.length === 0)

            throw new Error("Vehicle not found.");


        if (vehicle[0].status === "ON_TRIP")

            throw new Error("Vehicle currently on trip.");


        await connection.query(

            `INSERT INTO maintenance(

                vehicle_id,

                maintenance_type,

                description,

                cost,

                start_date,

                status

            )

            VALUES(?,?,?,?,?,?)`,

            [

                vehicle_id,

                maintenance_type,

                description,

                cost,

                start_date,

                "IN_PROGRESS"

            ]

        );


        await connection.query(

            `UPDATE vehicles

            SET status='IN_SHOP'

            WHERE vehicle_id=?`,

            [

                vehicle_id

            ]

        );


        await connection.commit();


        return {

            message: "Maintenance created"

        };


    } catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};


// ======================================
// CLOSE MAINTENANCE
// ======================================

exports.closeMaintenance = async (maintenanceId) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const [maintenance] = await connection.query(

            `SELECT *

            FROM maintenance

            WHERE maintenance_id=?`,

            [

                maintenanceId

            ]

        );


        if (maintenance.length === 0)

            throw new Error("Maintenance not found.");


        await connection.query(

            `UPDATE maintenance

            SET

                status='COMPLETED',

                completion_date=CURDATE()

            WHERE maintenance_id=?`,

            [

                maintenanceId

            ]

        );


        await connection.query(

            `UPDATE vehicles

            SET status='AVAILABLE'

            WHERE vehicle_id=?`,

            [

                maintenance[0].vehicle_id

            ]

        );


        await connection.commit();


        return {

            message: "Maintenance completed"

        };


    } catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};