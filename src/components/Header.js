import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ user_name }) => {
  return (
    <header className="header">
      <div className="header_logo">
        <Link to="/homepage" className="nav_itemFavorites">Home</Link>
      </div>

      <div className="header_nav">
        <div className="nav_item">
          <span className="nav_itemFavorites">Episodes</span>
        </div>
        <div className="nav_item">
          <Link to="/favorites" className="nav_itemFavorites">
            Favorites
          </Link>
        </div>
        <div className="nav_item">
          {user_name ? (
            <>
              <span className="nav_itemLine1">Welcome, {user_name}!</span>
              <button className="nav_itemLine1">Logout</button>
            </>
          ) : (
            <button className="nav_itemLine1">Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
