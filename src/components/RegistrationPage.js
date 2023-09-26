import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

function RegistrationPage() {
  const [registration, setRegistration] = useState({
    login_id: "",
    user_name: "",
    password: "",
    retypePassword: "",
    email: "",
  });

  const [error, setError] = useState(""); // State for error message

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegistration((prevRegistration) => ({
      ...prevRegistration,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in registration) {
      if (registration[key] === "") {
        setError(`Please fill out ${key.replace("_", " ")}`);
        return;
      }
    }

    // Check if passwords match
    if (registration.password !== registration.retypePassword) {
      setError("Passwords do not match.");
      return;
    }

    // Create an object with the registration data
    const registrationData = {
      login_id: registration.login_id,
      user_name: registration.user_name,
      password: registration.password,
      email_id: registration.email,
    };

    try {
      // Send a POST request to your server with the registration data
      const response = await fetch("/api/registerApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        // User registered successfully, you can handle this as needed
        console.log("User registered successfully");

        // Reset the form fields after successful registration
        setRegistration({
          login_id: "",
          user_name: "",
          password: "",
          retypePassword: "",
          email: "",
        });

        // Clear the error message
        setError("");

        // Navigate the user to a success page or the login page
        navigate("/login");
      } else {
        // Handle registration failure
        const responseBody = await response.json();
        setError(responseBody.error || "Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred while registering.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Register for NGKast!</h2>
      <form className="registration-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="login_id">Login ID:</label>
          <input
            type="text"
            id="login_id"
            name="login_id"
            value={registration.login_id}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_name">Your Name:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={registration.user_name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registration.password}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Retype Password:</label>
          <input
            type="password"
            id="retypePassword"
            name="retypePassword"
            value={registration.retypePassword}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registration.email}
            onChange={handleInput}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
