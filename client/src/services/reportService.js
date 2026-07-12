import api from './api';

export const reportService = {
  getReports: async () => {
    const response = await api.get('/reports/overview');
    return response.data.data;
  },

  exportReport: async (reportType, format = 'csv') => {
    const response = await api.get(`/reports/overview?type=${reportType}&format=${format}`);
    return response.data.data;
  },
};

export default reportService;
