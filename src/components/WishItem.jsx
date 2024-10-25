import React, { useState } from "react";
import { FaHeartCrack, FaCartPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const WishItem = ({ item, counter }) => {
  const dispatch = useDispatch();

  const removeFromWishlistHandler = async (product) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/${localStorage.getItem("id")}`
      );
      const userObj = response.data;

      userObj.userWishlist = userObj.userWishlist || [];

      const newWishlist = userObj.userWishlist.filter(item => product.id !== item.id);

      userObj.userWishlist = newWishlist;

      await axios.put(
        `http://localhost:8080/user/${localStorage.getItem("id")}`,
        userObj
      );

      // Dispatch the removeFromWishlist action with the product data
      dispatch(removeFromWishlist({ userObj }));
      toast.success("Product removed from the wishlist!");
    } catch (error) {
      toast.error("Failed to remove product from wishlist.");
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success("Product added to the cart!");
  };

  const productPath = `/shop/product/${item.id}`;

  return (
    <tr className="hover cursor-pointer">
      <td className="text-center">
        <a href={productPath}>
          <img
            src={`https://${item.image}`}
            alt={item.title}
            className="w-24 h-24 object-cover rounded"
          />
        </a>
      </td>
      <td className="text-accent-content text-lg">
        <a href={productPath} className="hover:underline">
          {item.title}
        </a>
      </td>
      <td className="text-accent-content text-lg">
        {item.selectedSize || 'N/A'}
      </td>
      <td>
        <button className="btn btn-xs btn-primary mr-2" onClick={handleAddToCart}>
          <FaCartPlus className="mr-1" />
          Add to Cart
        </button>
        <button className="btn btn-xs btn-error text-sm" onClick={() => removeFromWishlistHandler(item)}>
          <FaHeartCrack />
          Remove
        </button>
      </td>
    </tr>
  );
};

export default WishItem;