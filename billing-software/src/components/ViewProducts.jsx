import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Inline styling
  const containerStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9", // Light background
  };

  const headerStyle = {
    fontSize: "24px",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    color: "#333",
  };

  const listItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    fontSize: "18px",
    color: "#333",
  };

  const noProductsStyle = {
    padding: "10px",
    textAlign: "center",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Products</h2>
      <ul style={listStyle}>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} style={listItemStyle}>
              {product.name} - ${product.price} - Qty: {product.quantity} -{" "}
              {product.brand}
            </li>
          ))
        ) : (
          <li style={noProductsStyle}>No products found.</li>
        )}
      </ul>
    </div>
  );
};

export default ViewProducts;
