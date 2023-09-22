import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  // Initialize the login state to false (not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle the login action
  const handleLogin = () => {
    // You can implement your login logic here, and if successful, set isLoggedIn to true
    // For example, you might make an API request to authenticate the user
    // If the login is successful, set isLoggedIn to true
    // For simplicity, I'll set it to true immediately here
    setIsLoggedIn(true);
  };

  // Function to handle the logout action
  const handleLogout = () => {
    // You can implement your logout logic here, and if successful, set isLoggedIn to false
    // For example, you might make an API request to log the user out
    // If the logout is successful, set isLoggedIn to false
    // For simplicity, I'll set it to false immediately here
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header_logo">
        <Link to="/homepage">Home</Link>
      </div>

      <div className="header_nav">
        <div className="nav_item">
          <span className="nav_itemLine1">Episodes</span>
        </div>
        <div className="nav_item">
          <span className="nav_itemLine1">Subscriptions</span>
        </div>
        <div className="nav_item">
          {isLoggedIn ? (
            <>
              <span className="nav_itemLine1">Welcome, User!</span>
              <button onClick={handleLogout} className="nav_itemLine1">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="nav_itemLine1">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
