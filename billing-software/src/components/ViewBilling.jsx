import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBilling = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // Fetch all bills from the backend
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/billing");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const handleDelete = async (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        await axios.delete(`http://localhost:5000/api/billing/${billId}`);
        setBills(bills.filter((bill) => bill._id !== billId));
        alert("Bill deleted successfully");
      } catch (error) {
        console.error("Error deleting bill:", error);
        alert("Failed to delete the bill.");
      }
    }
  };

  // Inline styling for improved UX
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  };

  const thStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ccc",
  };

  const deleteButtonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "#c82333",
  };

  return (
    <div>
      <h2>Bills</h2>
      {bills.length === 0 ? (
        <p>No bills available</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Products</th>
              <th style={thStyle}>Total Amount</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td style={tdStyle}>{bill.customer.name}</td>
                <td style={tdStyle}>
                  <ul style={{ padding: 0, margin: 0 }}>
                    {bill.products.map((item) => (
                      <li key={item.product._id}>
                        {item.product.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={tdStyle}>${bill.totalAmount}</td>
                <td style={tdStyle}>
                  <button
                    style={deleteButtonStyle}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        deleteButtonHoverStyle.backgroundColor)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        deleteButtonStyle.backgroundColor)
                    }
                    onClick={() => handleDelete(bill._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBilling;
