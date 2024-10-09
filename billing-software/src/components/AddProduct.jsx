import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    supplier: "",
    oldStock: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", product);
      alert("Product added successfully");
      setProduct({
        name: "",
        price: "",
        quantity: "",
        brand: "",
        supplier: "",
        oldStock: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Inline styling
  const formStyle = {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff", // White background
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3498db", // Blue
    color: "#fff", // White text
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2980b9", // Darker blue on hover
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Add Product</h2>
      <input
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="price"
        placeholder="Product Price"
        value={product.price}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="brand"
        placeholder="Brand"
        value={product.brand}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="supplier"
        placeholder="Supplier"
        value={product.supplier}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="oldStock"
        placeholder="Old Stock"
        value={product.oldStock}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        style={inputStyle}
      />
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor =
            buttonHoverStyle.backgroundColor)
        }
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
      >
        Save
      </button>
    </form>
  );
};

export default AddProduct;
