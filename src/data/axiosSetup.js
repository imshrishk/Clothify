// axiosSetup.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create();

// Axios interceptor to catch network errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      alert("Network error. Please check your connection and try again.");
    }
    return Promise.reject(error);
  }
);

export default api;
