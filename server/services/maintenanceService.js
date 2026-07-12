const db=require("../config/db");

const Maintenance=require("../models/Maintenance");

const getAllMaintenance=()=>Maintenance.getAllMaintenance();

const getMaintenanceById=(id)=>Maintenance.getMaintenanceById(id);

const createMaintenance=async(data)=>{

    const connection=await db.getConnection();

    try{

        await connection.beginTransaction();

        // Check Vehicle

        const [vehicle]=await connection.query(

            "SELECT * FROM vehicles WHERE vehicle_id=?",

            [data.vehicle_id]

        );

        if(vehicle.length===0)

            throw new Error("Vehicle not found");

        if(vehicle[0].status==="ON_TRIP")

            throw new Error("Vehicle currently on trip");

        if(vehicle[0].status==="RETIRED")

            throw new Error("Vehicle retired");

        // Create Maintenance

        const result=await Maintenance.createMaintenance(

            connection,

            data

        );

        // Change Vehicle Status

        await connection.query(

            `UPDATE vehicles
            SET status='IN_SHOP'
            WHERE vehicle_id=?`,

            [data.vehicle_id]

        );

        await connection.commit();

        return result;

    }

    catch(err){

        await connection.rollback();

        throw err;

    }

    finally{

        connection.release();

    }

};

const completeMaintenance=async(id)=>{

    const connection=await db.getConnection();

    try{

        await connection.beginTransaction();

        const maintenance=await Maintenance.getMaintenanceById(id);

        if(!maintenance)

            throw new Error("Maintenance not found");

        await Maintenance.completeMaintenance(

            connection,

            id

        );

        await connection.query(

            `UPDATE vehicles
            SET status='AVAILABLE'
            WHERE vehicle_id=?`,

            [maintenance.vehicle_id]

        );

        await connection.commit();

    }

    catch(err){

        await connection.rollback();

        throw err;

    }

    finally{

        connection.release();

    }

};

const deleteMaintenance=(id)=>Maintenance.deleteMaintenance(id);

module.exports={

    getAllMaintenance,
    getMaintenanceById,
    createMaintenance,
    completeMaintenance,
    deleteMaintenance

};