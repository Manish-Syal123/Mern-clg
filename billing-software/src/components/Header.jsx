import React from "react";

const Header = () => {
  return (
    <header className="header">
      <input type="text" placeholder="Search..." />
      <div className="icons">
        <i className="fas fa-bell"></i>
        <div className="profile-section">
          <img src="/profile-pic.png" alt="Profile" />
          <span>Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
