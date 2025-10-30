import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Shipments API
export const shipmentsAPI = {
  getAll: () => api.get('/shipments'),
  getById: (id) => api.get(`/shipments/${id}`),
  create: (data) => api.post('/shipments', data),
  updateStatus: (id, data) => api.patch(`/shipments/${id}/status`, data),
  getStats: () => api.get('/shipments/stats'),
};

// Documents API
export const documentsAPI = {
  getByShipment: (shipmentId) => api.get(`/shipments/${shipmentId}/documents`),
  upload: (shipmentId, formData) => {
    return api.post(`/shipments/${shipmentId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id) => api.delete(`/documents/${id}`),
};

// Calculator API
export const calculatorAPI = {
  calculate: (data) => api.post('/calculate-cost', data),
};

export default api;
