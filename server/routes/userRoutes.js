const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', roleMiddleware(['ADMIN', 'FLEET_MANAGER']), userController.getUsers);
router.post('/', roleMiddleware(['ADMIN']), userController.createUser);
router.get('/:id', roleMiddleware(['ADMIN', 'FLEET_MANAGER', 'DISPATCHER', 'DRIVER', 'MECHANIC']), userController.getUserById);
router.put('/:id', roleMiddleware(['ADMIN']), userController.updateUser);
router.delete('/:id', roleMiddleware(['ADMIN']), userController.deleteUser);

module.exports = router;
