import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadphones, FaRegEnvelope, FaHeart, FaSun, FaMoon, FaWindowClose } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { AiFillShopping } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";
import axios from "axios";
import PropTypes from "prop-types"; // Import prop-types
import "../styles/Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const { amount, total } = useSelector((state) => state.cart);
  const { darkMode, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isLoggedIn) {
        try {
          const userId = localStorage.getItem("id");
          const { data: userObj } = await axios.get(`http://localhost:8080/user/${userId}`);
          dispatch(updateWishlist({ userObj }));
        } catch (error) {
          console.error(error);
        }
      } else {
        dispatch(clearWishlist());
      }
    };
    
    fetchWishlist();
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <div className="topbar border-b border-gray-800">

      </div>
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-black text-accent-content">
            <AiFillShopping />
            Quarkum Clothing & Shoes
          </Link>
        </div>
        <div className="flex-none">
          <Link to="/search" className="btn btn-ghost btn-circle text-accent-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <button className="text-accent-content btn btn-ghost btn-circle text-xl" onClick={() => dispatch(changeMode())}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/wishlist" className="btn btn-ghost btn-circle text-accent-content">
            <FaHeart className="text-xl" />
          </Link>
          <CartDropdown amount={amount} total={total} />
          {isLoggedIn && <UserMenu />}
        </div>
      </div>
      <MobileNav isLoggedIn={isLoggedIn} />
      <DesktopNav isLoggedIn={isLoggedIn} />
    </>
  );
};

const CartDropdown = ({ amount, total }) => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </label>
    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
      <div className="card-body">
        <span className="font-bold text-lg text-accent-content">{amount} Items</span>
        <span className="text-info text-accent-content">Subtotal: ${total.toFixed(2)}</span>
        <div className="card-actions">
          <Link to="/cart" className="btn bg-blue-600 btn-block text-white hover:bg-blue-500 text-base-content">
            View cart
          </Link>
        </div>
      </div>
    </div>
  </div>
);

CartDropdown.propTypes = {
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const UserMenu = () => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src="../../assets/user.jpg" alt="User" />
      </div>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <Link to="/user-profile" className="justify-between text-accent-content">
          Profile
        </Link>
      </li>
      <li>
        <Link to="/order-history" className="text-accent-content">
          Order History
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-accent-content">
          Logout
        </Link>
      </li>
    </ul>
  </div>
);

const MobileNav = ({ isLoggedIn }) => (
  <div className="navbar-bottom-menu border-y border-gray-800">
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn drawer-button">
          <HiMiniBars3BottomLeft className="text-4xl" />
        </label>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4">
          <label htmlFor="my-drawer" className="btn drawer-button">
            <FaWindowClose className="text-3xl ml-auto" />
          </label>
          <li className="text-xl">
            <NavLink className="text-accent-content" to="/">Home</NavLink>
          </li>
          <li className="text-xl">
            <NavLink className="text-accent-content" to="/shop">Shop</NavLink>
          </li>
          <li className="text-xl">
            <NavLink className="text-accent-content" to="/about-us">About us</NavLink>
          </li>
          <li className="text-xl">
            <NavLink className="text-accent-content" to="/contact">Contact</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/login">Login</NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </div>
);

MobileNav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const DesktopNav = ({ isLoggedIn }) => (
  <div className="navbar bg-base-100 max-w-7xl mx-auto border-t border-gray-800">
    <ul className="menu menu-horizontal p-0">
      <li className="text-xl">
        <NavLink className="text-accent-content" to="/">Home</NavLink>
      </li>
      <li className="text-xl">
        <NavLink className="text-accent-content" to="/shop">Shop</NavLink>
      </li>
      <li className="text-xl">
        <NavLink className="text-accent-content" to="/about-us">About us</NavLink>
      </li>
      <li className="text-xl">
        <NavLink className="text-accent-content" to="/contact">Contact</NavLink>
      </li>
      {!isLoggedIn && (
        <>
          <li className="text-xl">
            <NavLink className="text-accent-content" to="/login">Login</NavLink>
          </li>
          <li className="text-xl">
            <NavLink className="text-accent-content" to="/register">Register</NavLink>
          </li>
        </>
      )}
    </ul>
  </div>
);

DesktopNav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;