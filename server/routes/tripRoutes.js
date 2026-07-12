const express = require('express');
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', tripController.getTrips);
router.post('/', roleMiddleware(['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']), tripController.createTrip);
router.get('/:id', tripController.getTripById);
router.put('/:id', roleMiddleware(['ADMIN', 'DISPATCHER', 'DRIVER', 'FLEET_MANAGER']), tripController.updateTrip);
router.delete('/:id', roleMiddleware(['ADMIN']), tripController.deleteTrip);

module.exports = router;
