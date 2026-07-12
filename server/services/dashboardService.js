const pool = require("../config/db");

exports.getDashboard = async () => {

    // Vehicles

    const [[activeVehicles]] = await pool.query(`
        SELECT COUNT(*) total
        FROM vehicles
        WHERE status='ON_TRIP'
    `);

    const [[availableVehicles]] = await pool.query(`
        SELECT COUNT(*) total
        FROM vehicles
        WHERE status='AVAILABLE'
    `);

    const [[vehiclesInShop]] = await pool.query(`
        SELECT COUNT(*) total
        FROM vehicles
        WHERE status='IN_SHOP'
    `);



    // Trips

    const [[activeTrips]] = await pool.query(`
        SELECT COUNT(*) total
        FROM trips
        WHERE status='DISPATCHED'
    `);

    const [[pendingTrips]] = await pool.query(`
        SELECT COUNT(*) total
        FROM trips
        WHERE status='DRAFT'
    `);



    // Drivers

    const [[driversOnDuty]] = await pool.query(`
        SELECT COUNT(*) total
        FROM drivers
        WHERE status='ON_TRIP'
    `);



    // Fleet Utilization

    const [[fleetUtilization]] = await pool.query(`

        SELECT

        ROUND(

            COUNT(
                CASE
                    WHEN status='ON_TRIP'
                    THEN 1
                END
            ) *100 /

            COUNT(*)

        ,2)

        AS utilization

        FROM vehicles

    `);



    // Revenue

    const [[revenue]] = await pool.query(`

        SELECT

        COALESCE(SUM(revenue),0)

        AS totalRevenue

        FROM trips

        WHERE status='COMPLETED'

    `);



    // Fuel Cost

    const [[fuelCost]] = await pool.query(`

        SELECT

        COALESCE(SUM(cost),0)

        AS totalFuel

        FROM fuel_logs

    `);



    // Expense

    const [[expense]] = await pool.query(`

        SELECT

        COALESCE(SUM(amount),0)

        AS totalExpense

        FROM expenses

    `);



    return {

        vehicles: {

            active: activeVehicles.total,

            available: availableVehicles.total,

            inShop: vehiclesInShop.total

        },



        trips: {

            active: activeTrips.total,

            pending: pendingTrips.total

        },



        drivers: {

            onDuty: driversOnDuty.total

        },



        finance: {

            revenue: revenue.totalRevenue,

            fuelCost: fuelCost.totalFuel,

            expense: expense.totalExpense

        },



        fleetUtilization:

            fleetUtilization.utilization

    };

};