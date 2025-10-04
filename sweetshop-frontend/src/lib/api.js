import axios from 'axios';

// 1️⃣ Base URL for backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 2️⃣ Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // important if using cookies later
});

// 3️⃣ Interceptor to add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get JWT from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- AUTH API ---
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// --- SWEETS API ---
export const sweetsAPI = {
  getAll: () => api.get('/sweets'),
  search: (params) => api.get('/sweets/search', { params }),

  create: (sweetData) => api.post('/sweets', sweetData), // Admin
  update: (id, sweetData) => api.put(`/sweets/${id}`, sweetData), // Admin
  delete: (id) => api.delete(`/sweets/${id}`), // Admin

  purchase: (id, quantity = 1) => api.post(`/sweets/${id}/purchase`, { quantity }),
  restock: (id, quantity) => api.post(`/sweets/${id}/restock`, { quantity }),
};

export default api;
