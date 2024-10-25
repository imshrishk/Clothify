// src/features/razorpay/useRazorpay.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadRazorpay, createOrder, verifyPayment } from './razorpayConfig';

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initializePayment = async ({ amount, user }) => {
    setIsLoading(true);
    try {
      // Load Razorpay SDK
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error('Payment gateway failed to load');
        return;
      }

      // Create order
      const order = await createOrder(amount);

      // Configure Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Clothify',
        description: 'Thank you for shopping with us!',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verified = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verified) {
              navigate('/thank-you');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || ''
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { initializePayment, isLoading };
};