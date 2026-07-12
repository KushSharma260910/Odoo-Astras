const maintenanceService=require("../services/maintenanceService");

exports.getAllMaintenance=async(req,res)=>{

    try{

        const data=await maintenanceService.getAllMaintenance();

        res.json({

            success:true,

            count:data.length,

            data

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

exports.getMaintenanceById=async(req,res)=>{

    try{

        const data=await maintenanceService.getMaintenanceById(req.params.id);

        res.json({

            success:true,

            data

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

exports.createMaintenance=async(req,res)=>{

    try{

        const result=await maintenanceService.createMaintenance(req.body);

        res.status(201).json({

            success:true,

            maintenanceId:result.insertId,

            message:"Maintenance Created"

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

exports.completeMaintenance=async(req,res)=>{

    try{

        await maintenanceService.completeMaintenance(req.params.id);

        res.json({

            success:true,

            message:"Maintenance Completed"

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

exports.deleteMaintenance=async(req,res)=>{

    try{

        await maintenanceService.deleteMaintenance(req.params.id);

        res.json({

            success:true,

            message:"Deleted Successfully"

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};