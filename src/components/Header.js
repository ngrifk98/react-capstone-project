import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";

const Header = ({ handleLogout }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [user_name, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added isLoggedIn state
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const handleLogoutClick = () => {
    handleLogout();
    Cookies.remove("loginToken");
    setIsLoggedIn(false); // User is logged out
    navigate("/login");
  };

  useEffect(() => {
    // Check if the user is logged in by checking the loginToken cookie
    const token = Cookies.get("loginToken");
    if (token) {
      setIsLoggedIn(true); // User is logged in
      // Fetch the user_name from the server when the component mounts
      fetch(`/api/loginApi`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user_name");
          }
        })
        .then((data) => {
          if (typeof data === "object") {
            setUserName(data.user_name);
          } else {
            throw new Error("Response is not valid JSON");
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle the error, e.g., set a default user_name or show an error message
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
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
        <div className="nav_item">
          <Link to="/homepage" className="nav_itemFavorites">
            Search
          </Link>
        </div>
        <div className="nav_item">
          {isLoading ? (
            <div>Loading...</div>
          ) : isLoggedIn ? ( // Toggle the button based on isLoggedIn state
            <>
              <span className="nav_itemLine1">Welcome, {user_name}!</span>
              <button className="nav_itemLine1" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav_itemFavorites">
              Login
            </Link>
          )}
        </div>
      </div>

      <div
        className={`mobile-nav-icon ${showMobileNav ? "mobile-menu-open" : ""}`}
        onClick={toggleMobileNav}
      >
        &#9776;
      </div>

      {showMobileNav && (
        <div className="mobile-nav">
          <div className="nav_item">
            <Link to="/favorites" className="nav_itemFavorites">
              Favorites
            </Link>
          </div>
          <div className="nav_item">
            <Link to="/homepage" className="nav_itemFavorites">
              Search
            </Link>
          </div>
          <div className="nav_item">
            {isLoading ? (
              <div>Loading...</div>
            ) : isLoggedIn ? ( // Toggle the button based on isLoggedIn state
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
