
const express=require("express");

const router=express.Router();

const maintenanceController=require("../controllers/maintenanceController");

router.get("/",maintenanceController.getAllMaintenance);

router.get("/:id",maintenanceController.getMaintenanceById);

// router.post("/",maintenanceController.createMaintenance);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("FLEET_MANAGER"),
    maintenanceController.createMaintenance
);

router.patch("/:id/complete",maintenanceController.completeMaintenance);

router.delete("/:id",maintenanceController.deleteMaintenance);

module.exports=router;
