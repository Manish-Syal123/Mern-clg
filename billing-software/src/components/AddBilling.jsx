import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBilling = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch customers and products from your API
    const fetchCustomers = async () => {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
    };

    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const handleAddProduct = (productId) => {
    const existingProduct = selectedProducts.find(
      (p) => p.product === productId
    );

    if (existingProduct) {
      // If the product is already added, just update the quantity
      setSelectedProducts((prev) =>
        prev.map((p) =>
          p.product === productId
            ? { ...p, quantity: p.quantity + quantity }
            : p
        )
      );
    } else {
      // Add a new product
      setSelectedProducts((prev) => [
        ...prev,
        { product: productId, quantity },
      ]);
    }

    // Reset quantity
    setQuantity(1);
    calculateTotalAmount();
  };

  const calculateTotalAmount = async () => {
    let total = 0;

    for (const item of selectedProducts) {
      const product = await axios.get(
        `http://localhost:5000/api/products/${item.product}`
      );
      total += product.data.price * item.quantity;
    }

    setTotalAmount(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/billing", {
        customerId: selectedCustomerId,
        products: selectedProducts,
        totalAmount,
      });
      console.log("Billing added:", response.data);
      alert("Billing added successfully!");
      // Optionally reset the form
      setSelectedProducts([]);
      setTotalAmount(0);
      setSelectedCustomerId("");
    } catch (error) {
      console.error("Error adding billing:", error.response.data);
      alert("Failed to create billing: " + error.response.data.error);
    }
  };

  // Inline styling
  const formStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9", // Light background
  };

  const labelStyle = {
    display: "block",
    margin: "1rem 0 0.5rem",
    fontWeight: "bold",
    color: "#333",
  };

  const selectStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: "1rem 0",
    color: "#333",
  };

  const listItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: "#333",
  };

  const totalAmountStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "1rem 0",
    color: "#333",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ color: "#333" }}>Add Billing</h2>

      <div>
        <label htmlFor="customer" style={labelStyle}>
          Customer:
        </label>
        <select
          id="customer"
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          required
          style={selectStyle}
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="product" style={labelStyle}>
          Product:
        </label>
        <select
          id="product"
          onChange={(e) => handleAddProduct(e.target.value)}
          required
          style={selectStyle}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>
        <label htmlFor="quantity" style={labelStyle}>
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div>
        <h3 style={{ color: "#333" }}>Selected Products:</h3>
        <ul style={listStyle}>
          {selectedProducts.map((item) => (
            <li key={item.product} style={listItemStyle}>
              Product ID: {item.product}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <h4 style={totalAmountStyle}>Total Amount: ${totalAmount}</h4>
      </div>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor =
            buttonHoverStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)
        }
      >
        Add Billing
      </button>
    </form>
  );
};

export default AddBilling;
