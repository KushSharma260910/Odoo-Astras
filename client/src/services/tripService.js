import api from './api';

export const tripService = {
  getTrips: async () => {
    const response = await api.get('/trips');
    return response.data.data;
  },

  getTripById: async (id) => {
    const response = await api.get(`/trips/${id}`);
    return response.data.data;
  },

  createTrip: async (tripData) => {
    const response = await api.post('/trips', tripData);
    return response.data.data;
  },

  dispatchTrip: async (id) => {
    const response = await api.put(`/trips/${id}`, { action: 'dispatch' });
    return response.data.data;
  },

  completeTrip: async (id) => {
    const response = await api.put(`/trips/${id}`, { action: 'complete' });
    return response.data.data;
  },

  cancelTrip: async (id) => {
    const response = await api.put(`/trips/${id}`, { action: 'cancel' });
    return response.data.data;
  },

  getMyTrips: async () => {
    const response = await api.get('/trips');
    return response.data.data;
  },

  getTripHistory: async () => {
    const response = await api.get('/trips');
    return response.data.data;
  },
};

export default tripService;
