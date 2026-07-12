const express = require('express');
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/dispatch', aiController.getDispatchRecommendations);
router.get('/predictive-maintenance', aiController.getPredictiveMaintenance);

module.exports = router;
