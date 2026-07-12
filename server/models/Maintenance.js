const db = require("../config/db");

// Get all maintenance logs
const getAllMaintenance = async () => {

    const [rows] = await db.query(

        `SELECT
            m.*,
            v.registration_number,
            v.vehicle_name
        FROM maintenance_logs m
        JOIN vehicles v
        ON m.vehicle_id=v.vehicle_id
        ORDER BY maintenance_id DESC`

    );

    return rows;

};

// Get by ID
const getMaintenanceById = async (id) => {

    const [rows] = await db.query(

        "SELECT * FROM maintenance_logs WHERE maintenance_id=?",

        [id]

    );

    return rows[0];

};

// Create Maintenance
const createMaintenance = async (connection, maintenance) => {

    const sql = `
        INSERT INTO maintenance_logs
        (
            vehicle_id,
            maintenance_type,
            description,
            maintenance_date,
            cost,
            status
        )
        VALUES(?,?,?,?,?,?)
    `;

    const [result] = await connection.query(

        sql,

        [

            maintenance.vehicle_id,
            maintenance.maintenance_type,
            maintenance.description,
            maintenance.maintenance_date,
            maintenance.cost,
            "ACTIVE"

        ]

    );

    return result;

};

// Complete Maintenance

const completeMaintenance = async (connection,id) => {

    await connection.query(

        `UPDATE maintenance_logs
        SET
            status='COMPLETED',
            completion_date=CURDATE()
        WHERE maintenance_id=?`,

        [id]

    );

};

// Delete

const deleteMaintenance = async(id)=>{

    return await db.query(

        "DELETE FROM maintenance_logs WHERE maintenance_id=?",

        [id]

    );

}

module.exports={

    getAllMaintenance,
    getMaintenanceById,
    createMaintenance,
    completeMaintenance,
    deleteMaintenance

};