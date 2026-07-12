import api from './api';

export const aiService = {
  getSmartDispatchRecommendation: async (tripId) => {
    const response = await api.get(`/ai/dispatch?tripId=${tripId}`);
    return response.data.data;
  },

  getVehicleRecommendations: async (cargoType, weightLbs) => {
    const response = await api.get(`/ai/dispatch?cargo=${cargoType}&weight=${weightLbs}`);
    return response.data.data;
  },

  predictMaintenance: async (vehicleId) => {
    const response = await api.get(`/ai/predictive-maintenance?vehicleId=${vehicleId}`);
    return response.data.data;
  },
};

export default aiService;
