const Expense = require('../models/Expense');
const { buildPagination } = require('../utils/calculations');

const getExpenses = async ({ page, limit, status }) => {
  const pagination = buildPagination(page, limit);
  const filter = status ? { status } : {};
  const [expenses, total] = await Promise.all([
    Expense.find(filter).populate('vehicle').populate('trip').skip(pagination.skip).limit(pagination.limit).sort({ expenseDate: -1 }),
    Expense.countDocuments(filter),
  ]);

  return { expenses, pagination: { ...pagination, total, pages: Math.ceil(total / pagination.limit) } };
};

const createExpense = async (data) => {
  return Expense.create(data);
};

const updateExpense = async (id, updates) => {
  const expense = await Expense.findByIdAndUpdate(id, updates, { new: true });
  if (!expense) {
    throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
  }
  return expense;
};

const deleteExpense = async (id) => {
  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
  }
  return { success: true };
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };
