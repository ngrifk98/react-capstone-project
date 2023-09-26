import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const port = 3000;

const Header = ({ handleLogout }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [user_name, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the handleLogout function passed from the parent component
  };

  useEffect(() => {
    // Fetch the user_name from the server when the component mounts
    fetch(`http://localhost:${port}/api/NGKast/loginApi`) // Replace with your server endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user_name");
        }
      })
      .then((data) => {
        // Check if 'data' is a valid JSON object
        if (typeof data === "object") {
          setUserName(data.user_name);
        } else {
          throw new Error("Response is not valid JSON");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., set a default user_name or show an error message
      });
  }, []);

  return (
    <header className="header">
      <div className="header_logo">
        <Link to="/homepage" className="nav_itemFavorites">
          <img src="/images/NGKast_Logo.png" alt="NGKast" />
        </Link>
      </div>

      <div className="header_nav">
        <div className="nav_item">
          <Link to="/favorites" className="nav_itemFavorites">
            Favorites
          </Link>
        </div>
        {user_name ? (
          <>
            <span className="nav_itemLine1">Welcome, {user_name}!</span>
            <button className="nav_itemLine1" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        ) : null}
        <div className="nav_item">
          <Link to="/homepage" className="nav_itemFavorites">
            Search
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <div
        className={`mobile-nav-icon ${showMobileNav ? "mobile-menu-open" : ""}`}
        onClick={toggleMobileNav}
      >
        &#9776;
      </div>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <div className="mobile-nav">
          <div className="nav_item">
            <Link to="/favorites" className="nav_itemFavorites">
              Favorites
            </Link>
          </div>
          <div className="nav_item">
            {user_name ? (
              <>
                <span className="nav_itemLine1">Welcome, {user_name}!</span>
                <button className="nav_itemLine1" onClick={handleLogoutClick}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav_itemLine1">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
