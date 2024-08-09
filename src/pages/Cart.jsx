import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else {
      navigate("/thank-you");
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
              onClick={handleOrder}
              className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'
            >
              Order Now
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
