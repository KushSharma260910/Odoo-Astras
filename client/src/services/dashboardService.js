import api from './api';

export const dashboardService = {
  getFleetDashboardStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  },

  getSafetyDashboardStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  },

  getFinanceDashboardStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  },

  getDriverDashboardStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  },
};

export default dashboardService;
