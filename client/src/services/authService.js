import api from './api';

export const loginUser = async (identifier, password) => {
  const response = await api.post('/auth/login', { identifier, password });
  return response.data.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data.data;
};

export const updateProfile = async (payload) => {
  const response = await api.put('/auth/me', payload);
  return response.data.data;
};

export const authService = {
  login: loginUser,
  forgotPassword: async (email) => ({ success: true, message: `Password recovery instructions sent to ${email}` }),
};

export default authService;
