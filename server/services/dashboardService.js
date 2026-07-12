const pool = require("../config/db");

// ======================================================
// DASHBOARD SUMMARY
// ======================================================

exports.getDashboard = async () => {

    // Total Vehicles
    const [[vehicleStats]] = await pool.query(
        `SELECT
            COUNT(*) AS total_vehicles,
            SUM(status='AVAILABLE') AS available_vehicles,
            SUM(status='ON_TRIP') AS on_trip_vehicles,
            SUM(status='IN_SHOP') AS maintenance_vehicles,
            SUM(status='RETIRED') AS retired_vehicles
        FROM vehicles`
    );

    // Total Drivers
    const [[driverStats]] = await pool.query(
        `SELECT
            COUNT(*) AS total_drivers,
            SUM(status='AVAILABLE') AS available_drivers,
            SUM(status='ON_TRIP') AS on_trip_drivers,
            SUM(status='OFF_DUTY') AS off_duty_drivers,
            SUM(status='SUSPENDED') AS suspended_drivers
        FROM drivers`
    );

    // Trips
    const [[tripStats]] = await pool.query(
        `SELECT
            COUNT(*) AS total_trips,
            SUM(status='DRAFT') AS draft_trips,
            SUM(status='DISPATCHED') AS active_trips,
            SUM(status='COMPLETED') AS completed_trips,
            SUM(status='CANCELLED') AS cancelled_trips
        FROM trips`
    );

    // Fuel Cost
    const [[fuel]] = await pool.query(
        `SELECT
            IFNULL(SUM(cost),0) AS total_fuel_cost
        FROM fuel_logs`
    );

    // Maintenance Cost
    const [[maintenance]] = await pool.query(
        `SELECT
            IFNULL(SUM(cost),0) AS total_maintenance_cost
        FROM maintenance`
    );

    // Other Expenses
    const [[expenses]] = await pool.query(
        `SELECT
            IFNULL(SUM(amount),0) AS total_expenses
        FROM expenses`
    );

    // Revenue
    const [[revenue]] = await pool.query(
        `SELECT
            IFNULL(SUM(revenue),0) AS total_revenue
        FROM trips
        WHERE status='COMPLETED'`
    );

    // Fleet Utilization
    const [[utilization]] = await pool.query(
        `SELECT
            ROUND(
                (
                    SUM(status='ON_TRIP')
                    /
                    COUNT(*)
                ) * 100,
            2) AS fleet_utilization
        FROM vehicles`
    );

    return {

        vehicles: vehicleStats,

        drivers: driverStats,

        trips: tripStats,

        finance: {

            total_revenue: revenue.total_revenue,

            total_fuel_cost: fuel.total_fuel_cost,

            total_maintenance_cost:
                maintenance.total_maintenance_cost,

            total_expenses:
                expenses.total_expenses

        },

        fleet_utilization:
            utilization.fleet_utilization

    };

};