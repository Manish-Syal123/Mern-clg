import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales");
        setTotalSales(response.data.totalSales);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Inline styling
  const dashboardStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "2rem",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9", // Light background
  };

  const cardStyle = {
    flex: "1",
    margin: "0 1rem",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff", // White background
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#333", // Dark text
  };

  const valueStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#3498db", // Blue color for values
  };

  return (
    <div style={dashboardStyle}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Total Sales</h3>
        <p style={valueStyle}>{totalSales}</p>
      </div>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Total Revenue</h3>
        <p style={valueStyle}>${totalRevenue}</p>
      </div>
    </div>
  );
};

export default Dashboard;
