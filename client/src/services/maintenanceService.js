import api from './api';

export const maintenanceService = {
  getMaintenanceLogs: async () => {
    const response = await api.get('/maintenance');
    return response.data.data;
  },

  createMaintenanceLog: async (logData) => {
    const response = await api.post('/maintenance', logData);
    return response.data.data;
  },

  getMaintenanceHistory: async () => {
    const response = await api.get('/maintenance');
    return response.data.data;
  },
};

export default maintenanceService;
