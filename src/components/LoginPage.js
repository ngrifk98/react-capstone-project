import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    login_id: "",
    password: "",
  });

  const [error, setError] = useState(""); // State variable for error message

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create an object with the login data
    const loginInfo = {
      login_id: loginData.login_id,
      password: loginData.password,
    };

    try {
      // Send a POST request to your server with the login data
      const response = await fetch("/api/loginApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.ok) {
        // Login successful, you can handle this as needed
        console.log("Login successful");

        // Optionally, you can reset the form fields after successful login
        // setLoginData({
        //   login_id: "",
        //   password: "",
        // });

        // You can also navigate the user to the homepage or another page as needed
        navigate("/homepage");
      } else {
        // Handle login failure and set the error message
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Set the error message for network or server-related errors
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to NGKast!</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message if error state is not empty */}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login_id">Login ID:</label>
          <input
            type="text"
            id="login_id"
            name="login_id" // Add the name attribute
            value={loginData.login_id}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password" // Add the name attribute
            value={loginData.password}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>{" "}
        {/* Use Link to navigate */}
      </p>
    </div>
  );
}

export default LoginPage;
