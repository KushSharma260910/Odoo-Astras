import api from './api';

export const vehicleService = {
  getVehicles: async () => {
    const response = await api.get('/vehicles');
    return response.data.data;
  },

  getVehicleById: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data.data;
  },

  addVehicle: async (vehicleData) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data.data;
  },

  updateVehicle: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data.data;
  },

  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data.data;
  },
};

export default vehicleService;
