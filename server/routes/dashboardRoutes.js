const pool = require("../config/db");


// ======================================
// GET ALL EXPENSES
// ======================================

exports.getExpenses = async () => {

    const [rows] = await pool.query(

        `SELECT

            e.*,

            v.vehicle_name,

            v.registration_number,

            t.source,

            t.destination

        FROM expenses e

        JOIN vehicles v

            ON e.vehicle_id = v.vehicle_id

        LEFT JOIN trips t

            ON e.trip_id = t.trip_id

        ORDER BY expense_date DESC`

    );

    return rows;

};


// ======================================
// CREATE EXPENSE
// ======================================

exports.createExpense = async (data) => {

    const {

        vehicle_id,

        trip_id,

        expense_type,

        amount,

        expense_date,

        remarks

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

        `INSERT INTO expenses(

            vehicle_id,

            trip_id,

            expense_type,

            amount,

            expense_date,

            remarks

        )

        VALUES(?,?,?,?,?,?)`,

        [

            vehicle_id,

            trip_id || null,

            expense_type,

            amount,

            expense_date,

            remarks

        ]

    );


    return {

        expense_id: result.insertId

    };

};