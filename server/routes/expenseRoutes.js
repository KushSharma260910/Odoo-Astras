const express = require('express');
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', expenseController.getExpenses);
router.post('/', roleMiddleware(['ADMIN', 'DISPATCHER']), expenseController.createExpense);
router.put('/:id', roleMiddleware(['ADMIN', 'DISPATCHER']), expenseController.updateExpense);
router.delete('/:id', roleMiddleware(['ADMIN']), expenseController.deleteExpense);

module.exports = router;
