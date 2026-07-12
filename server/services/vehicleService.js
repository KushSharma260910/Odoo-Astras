const Vehicle = require("../models/Vehicle");

const getAllVehicles = () => Vehicle.getAllVehicles();

const getVehicleById = (id) => Vehicle.getVehicleById(id);

const getAvailableVehicles = () => Vehicle.getAvailableVehicles();

const createVehicle = (vehicle) => Vehicle.createVehicle(vehicle);

const updateVehicle = (id, vehicle) => Vehicle.updateVehicle(id, vehicle);

const deleteVehicle = (id) => Vehicle.deleteVehicle(id);

module.exports = {
    getAllVehicles,
    getVehicleById,
    getAvailableVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle
};