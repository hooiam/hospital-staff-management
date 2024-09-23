import axios from 'axios'

// Read api url from .env file
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8000';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`
});

// Set the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
