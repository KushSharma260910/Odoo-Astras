const express = require('express');
const maintenanceController = require('../controllers/maintenanceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', maintenanceController.getMaintenances);
router.post('/', roleMiddleware(['ADMIN', 'DISPATCHER', 'MECHANIC']), maintenanceController.createMaintenance);
router.put('/:id', roleMiddleware(['ADMIN', 'DISPATCHER', 'MECHANIC']), maintenanceController.updateMaintenance);
router.delete('/:id', roleMiddleware(['ADMIN']), maintenanceController.deleteMaintenance);

module.exports = router;
