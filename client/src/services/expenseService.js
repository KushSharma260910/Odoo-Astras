import api from './api';

export const expenseService = {
  getExpenses: async () => {
    const response = await api.get('/expenses');
    return response.data.data;
  },

  addExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data.data;
  },

  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data.data;
  },

  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data.data;
  },
};

export default expenseService;
