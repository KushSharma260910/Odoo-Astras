import api from './api';

export const fuelService = {
  getFuelLogs: async () => {
    const response = await api.get('/fuel');
    return response.data.data;
  },

  addFuelLog: async (logData) => {
    const response = await api.post('/fuel', logData);
    return response.data.data;
  },

  updateFuelLog: async (id, logData) => {
    const response = await api.put(`/fuel/${id}`, logData);
    return response.data.data;
  },
};

export default fuelService;
