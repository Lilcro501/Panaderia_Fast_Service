// api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access'); // Cambiado de localStorage a sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
