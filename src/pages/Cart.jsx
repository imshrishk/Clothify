import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customAxios from '../features/razorpay/axiosConfig';
import { useState } from 'react';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Cart = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsProcessing(true);
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error('Payment gateway failed to load');
        return;
      }

      // Create order on backend
      const { data: order } = await customAxios.post('/api/razorpay/create-order', {
        amount: cartTotal
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Clothify',
        description: 'Thank you for shopping with us!',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const { data } = await customAxios.post('/api/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (data.verified) {
              // You might want to clear cart or update order status here
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
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {isLoggedIn ? (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          ) : (
            <Link
              to='/login'
              className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'
            >
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;