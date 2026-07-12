import api from './api';

export const driverService = {
  getDrivers: async () => {
    const response = await api.get('/drivers');
    return response.data.data;
  },

  getDriverById: async (id) => {
    const response = await api.get(`/drivers/${id}`);
    return response.data.data;
  },

  getLicenseExpiryList: async () => {
    const response = await api.get('/drivers');
    return response.data.data;
  },

  addDriver: async (driverData) => {
    const response = await api.post('/drivers', driverData);
    return response.data.data;
  },

  updateDriver: async (id, driverData) => {
    const response = await api.put(`/drivers/${id}`, driverData);
    return response.data.data;
  },

  deleteDriver: async (id) => {
    const response = await api.delete(`/drivers/${id}`);
    return response.data.data;
  },
};

export default driverService;
