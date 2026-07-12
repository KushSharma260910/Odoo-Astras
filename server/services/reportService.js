const pool = require("../config/db");

exports.getReports = async () => {

    // ==========================================
    // Fuel Cost
    // ==========================================

    const [[fuel]] = await pool.query(`

        SELECT

        COALESCE(SUM(cost),0)

        AS fuelCost

        FROM fuel_logs

    `);




    // ==========================================
    // Maintenance Cost
    // ==========================================

    const [[maintenance]] = await pool.query(`

        SELECT

        COALESCE(SUM(cost),0)

        AS maintenanceCost

        FROM maintenance

    `);





    // ==========================================
    // Other Expenses
    // ==========================================

    const [[expense]] = await pool.query(`

        SELECT

        COALESCE(SUM(amount),0)

        AS expenseCost

        FROM expenses

    `);





    // ==========================================
    // Revenue
    // ==========================================

    const [[revenue]] = await pool.query(`

        SELECT

        COALESCE(SUM(revenue),0)

        AS totalRevenue

        FROM trips

        WHERE status='COMPLETED'

    `);






    // ==========================================
    // Acquisition Cost
    // ==========================================

    const [[acquisition]] = await pool.query(`

        SELECT

        COALESCE(SUM(acquisition_cost),0)

        AS acquisitionCost

        FROM vehicles

    `);






    // ==========================================
    // Fuel Efficiency
    // ==========================================

    const [[efficiency]] = await pool.query(`

        SELECT

        ROUND(

            SUM(actual_distance)

            /

            NULLIF(SUM(liters),0)

        ,2)

        AS fuelEfficiency

        FROM trips

        JOIN fuel_logs

        ON trips.trip_id=fuel_logs.trip_id

        WHERE trips.status='COMPLETED'

    `);







    // ==========================================
    // Operational Cost
    // ==========================================

    const operationalCost =

        fuel.fuelCost +

        maintenance.maintenanceCost +

        expense.expenseCost;






    // ==========================================
    // Profit
    // ==========================================

    const profit =

        revenue.totalRevenue -

        operationalCost;






    // ==========================================
    // ROI
    // ==========================================

    let roi = 0;

    if(acquisition.acquisitionCost > 0){

        roi = (

            profit

            /

            acquisition.acquisitionCost

        ) * 100;

    }






    // ==========================================
    // Cost Per Vehicle
    // ==========================================

    const [[vehicleCount]] = await pool.query(`

        SELECT

        COUNT(*)

        AS total

        FROM vehicles

    `);




    const costPerVehicle =

        vehicleCount.total > 0

        ?

        operationalCost / vehicleCount.total

        :

        0;






    return {

        revenue: revenue.totalRevenue,

        fuelCost: fuel.fuelCost,

        maintenanceCost: maintenance.maintenanceCost,

        expenseCost: expense.expenseCost,

        operationalCost,

        profit,

        roi: Number(roi.toFixed(2)),

        fuelEfficiency: efficiency.fuelEfficiency || 0,

        costPerVehicle: Number(costPerVehicle.toFixed(2))

    };

};