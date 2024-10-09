import React, { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    gender: "",
    contact: "",
    email: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/customers", customer);
      alert("Customer added successfully");
      setCustomer({ name: "", gender: "", contact: "", email: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // Inline styling
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9", // Light background
  };

  const inputStyle = {
    marginBottom: "1rem",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3498db", // Blue color
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2980b9", // Darker blue on hover
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        name="name"
        placeholder="Name"
        value={customer.name}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="gender"
        placeholder="Gender"
        value={customer.gender}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="contact"
        placeholder="Contact"
        value={customer.contact}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="email"
        placeholder="Email"
        value={customer.email}
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
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)
        }
      >
        Save
      </button>
    </form>
  );
};

export default AddCustomer;
