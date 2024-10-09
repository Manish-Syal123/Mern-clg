import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: "#2c3e50", // Dark Blue
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const navListStyle = {
    display: "flex",
    justifyContent: "space-around", // Distribute items evenly
    listStyle: "none", // Remove default list styling
    margin: 0,
    padding: 0,
  };

  const navItemStyle = {
    transition: "transform 0.2s ease", // Smooth hover effect
  };

  const navLinkStyle = {
    color: "#ecf0f1", // Light Gray
    textDecoration: "none", // Remove underline
    fontWeight: "bold", // Make text bold
    padding: "0.5rem 1rem", // Padding around the links
    borderRadius: "5px", // Rounded corners
  };

  const navLinkHoverStyle = {
    backgroundColor: "#34495e", // Slightly lighter blue on hover
    color: "#ffffff", // Change text color on hover
    transform: "translateY(-2px)", // Lift effect on hover
  };

  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        {[
          "Dashboard",
          "Add Customer",
          "View Customers",
          "Add Product",
          "View Products",
          "Add Billing",
          "View Billing",
        ].map((item) => (
          <li key={item} style={navItemStyle}>
            <Link
              to={`/${item.toLowerCase().replace(" ", "-")}`} // Generate path dynamically
              style={navLinkStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  navLinkHoverStyle.backgroundColor;
                e.currentTarget.style.color = navLinkHoverStyle.color;
                e.currentTarget.style.transform = navLinkHoverStyle.transform;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.color = navLinkStyle.color;
                e.currentTarget.style.transform = "";
              }}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
