// src/features/razorpay/razorpayConfig.js
import axios from 'axios';

// Load Razorpay SDK
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create order
export const createOrder = async (amount) => {
  try {
    const { data } = await axios.post('/api/razorpay/create-order', { amount });
    return data;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

// Verify payment
export const verifyPayment = async (paymentData) => {
  try {
    const { data } = await axios.post('/api/razorpay/verify', paymentData);
    return data;
  } catch (error) {
    throw new Error('Payment verification failed');
  }
};