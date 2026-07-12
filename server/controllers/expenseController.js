const expenseService = require('../services/expenseService');

const getExpenses = async (req, res, next) => {
  try {
    const result = await expenseService.getExpenses(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const result = await expenseService.createExpense(req.body);
    res.status(201).json({ success: true, message: 'Expense created', data: result });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const result = await expenseService.updateExpense(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Expense updated', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const result = await expenseService.deleteExpense(req.params.id);
    res.status(200).json({ success: true, message: 'Expense deleted', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };
