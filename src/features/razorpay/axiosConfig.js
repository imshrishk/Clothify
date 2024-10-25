// src/features/razorpay/axiosConfig.js
import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
  timeout: 5000,
});

export default customAxios;