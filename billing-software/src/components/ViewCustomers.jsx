import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
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
  };

  const listItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    fontSize: "18px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Customers</h2>
      <ul style={listStyle}>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <li key={customer._id} style={listItemStyle}>
              {customer.name} - {customer.contact} - {customer.email}
            </li>
          ))
        ) : (
          <li style={{ padding: "10px", textAlign: "center" }}>
            No customers found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default ViewCustomers;
