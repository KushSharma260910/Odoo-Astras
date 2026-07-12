const express = require('express');
const fuelController = require('../controllers/fuelController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', fuelController.getFuelLogs);
router.post('/', roleMiddleware(['ADMIN', 'DISPATCHER']), fuelController.createFuelLog);
router.put('/:id', roleMiddleware(['ADMIN', 'DISPATCHER']), fuelController.updateFuelLog);
router.delete('/:id', roleMiddleware(['ADMIN']), fuelController.deleteFuelLog);

module.exports = router;
