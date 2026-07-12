const express = require('express');
const driverController = require('../controllers/driverController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', driverController.getDrivers);
router.post('/', roleMiddleware(['ADMIN', 'DISPATCHER']), driverController.createDriver);
router.get('/:id', driverController.getDriverById);
router.put('/:id', roleMiddleware(['ADMIN', 'DISPATCHER']), driverController.updateDriver);
router.delete('/:id', roleMiddleware(['ADMIN']), driverController.deleteDriver);

module.exports = router;
