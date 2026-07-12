const pool = require("../config/db");

// ======================================================
// GET REPORTS
// ======================================================

exports.getReports = async () => {

    // =====================================
    // VEHICLE REPORT
    // =====================================

    const [vehicleReport] = await pool.query(

        `SELECT

            vehicle_id,

            vehicle_name,

            registration_number,

            vehicle_type,

            status,

            odometer

        FROM vehicles

        ORDER BY vehicle_name`

    );


    // =====================================
    // TRIP REPORT
    // =====================================

    const [tripReport] = await pool.query(

        `SELECT

            t.trip_id,

            v.vehicle_name,

            d.name AS driver_name,

            t.source,

            t.destination,

            t.actual_distance,

            t.revenue,

            t.status,

            t.start_time,

            t.end_time

        FROM trips t

        JOIN vehicles v

            ON t.vehicle_id = v.vehicle_id

        JOIN drivers d

            ON t.driver_id = d.driver_id

        ORDER BY t.trip_id DESC`

    );


    // =====================================
    // FUEL REPORT
    // =====================================

    const [fuelReport] = await pool.query(

        `SELECT

            v.vehicle_name,

            SUM(f.liters) AS total_liters,

            SUM(f.cost) AS total_cost

        FROM fuel_logs f

        JOIN vehicles v

            ON f.vehicle_id = v.vehicle_id

        GROUP BY

            v.vehicle_id,

            v.vehicle_name

        ORDER BY

            total_cost DESC`

    );


    // =====================================
    // MAINTENANCE REPORT
    // =====================================

    const [maintenanceReport] = await pool.query(

        `SELECT

            v.vehicle_name,

            COUNT(*) AS total_maintenance,

            SUM(m.cost) AS maintenance_cost

        FROM maintenance m

        JOIN vehicles v

            ON m.vehicle_id = v.vehicle_id

        GROUP BY

            v.vehicle_id,

            v.vehicle_name

        ORDER BY

            maintenance_cost DESC`

    );


    // =====================================
    // EXPENSE REPORT
    // =====================================

    const [expenseReport] = await pool.query(

        `SELECT

            expense_type,

            SUM(amount) AS total_amount

        FROM expenses

        GROUP BY expense_type

        ORDER BY total_amount DESC`

    );


    // =====================================
    // DRIVER REPORT
    // =====================================

    const [driverReport] = await pool.query(

        `SELECT

            driver_id,

            name,

            safety_score,

            status,

            license_expiry

        FROM drivers

        ORDER BY safety_score DESC`

    );


    // =====================================
    // REVENUE SUMMARY
    // =====================================

    const [[summary]] = await pool.query(

        `SELECT

            COUNT(*) AS completed_trips,

            SUM(revenue) AS total_revenue,

            AVG(revenue) AS average_revenue

        FROM trips

        WHERE status='COMPLETED'`

    );


    return {

        summary,

        vehicleReport,

        tripReport,

        fuelReport,

        maintenanceReport,

        expenseReport,

        driverReport

    };

};