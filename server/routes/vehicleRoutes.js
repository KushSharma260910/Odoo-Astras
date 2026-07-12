const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', vehicleController.getVehicles);
router.post('/', roleMiddleware(['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']), vehicleController.createVehicle);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', roleMiddleware(['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']), vehicleController.updateVehicle);
router.delete('/:id', roleMiddleware(['ADMIN']), vehicleController.deleteVehicle);

module.exports = router;
