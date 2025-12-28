// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;










// // src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor - FIXED VERSION
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(`🔑 Adding token to request: ${config.url}`);
//     } else {
//       console.warn(`⚠️ No token found for request: ${config.url}`);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ Response ${response.status}: ${response.config.url}`);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     console.error(`❌ API Error: ${error.response?.status} - ${error.config?.url}`);
    
//     if (error.response?.status === 401) {
//       console.log('🔑 Token expired or invalid');
//       localStorage.removeItem('access');
//       localStorage.removeItem('refresh');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;