import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Implement login functionality here
    // You can use the 'username' and 'password' states to send a login request to your server
  };

  return (
    <div className="login-container">
      <h2>Login to NGKast!</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>{" "}
        {/* Use Link to navigate */}
      </p>
    </div>
  );
};

export default LoginPage;
