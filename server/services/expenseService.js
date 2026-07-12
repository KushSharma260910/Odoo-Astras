const pool = require("../config/db");

// ======================================================
// GET ALL EXPENSES
// ======================================================

exports.getExpenses = async () => {

    const [rows] = await pool.query(

        `SELECT

            e.expense_id,

            e.expense_type,

            e.amount,

            e.expense_date,

            e.remarks,

            e.created_at,

            v.vehicle_id,

            v.vehicle_name,

            v.registration_number,

            t.trip_id,

            t.source,

            t.destination

        FROM expenses e

        JOIN vehicles v

            ON e.vehicle_id = v.vehicle_id

        LEFT JOIN trips t

            ON e.trip_id = t.trip_id

        ORDER BY

            e.expense_date DESC`

    );

    return rows;

};


// ======================================================
// CREATE EXPENSE
// ======================================================

exports.createExpense = async (data) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            vehicle_id,

            trip_id,

            expense_type,

            amount,

            expense_date,

            remarks

        } = data;



        // ===================================
        // CHECK VEHICLE EXISTS
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
        // CHECK TRIP EXISTS (OPTIONAL)
        // ===================================

        if (trip_id) {

            const [trip] = await connection.query(

                `SELECT *

                FROM trips

                WHERE trip_id=?`,

                [

                    trip_id

                ]

            );

            if (trip.length === 0)

                throw new Error("Trip not found.");

        }



        // ===================================
        // INSERT EXPENSE
        // ===================================

        const [result] = await connection.query(

            `INSERT INTO expenses(

                vehicle_id,

                trip_id,

                expense_type,

                amount,

                expense_date,

                remarks

            )

            VALUES(

                ?,?,?,?,?,?

            )`,

            [

                vehicle_id,

                trip_id || null,

                expense_type,

                amount,

                expense_date,

                remarks

            ]

        );



        await connection.commit();

        return {

            expense_id: result.insertId,

            message: "Expense created successfully"

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