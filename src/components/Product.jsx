import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = ({ id }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!productDetails) return <p>Loading product details...</p>;

  return (
    <div>
      <p>Product ID: {productDetails.id}</p>
      <p>Name: {productDetails.name}</p>
      <p>Price: ${productDetails.price?.current?.value}</p>
      <p>Brand: {productDetails.brandName}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Product;
