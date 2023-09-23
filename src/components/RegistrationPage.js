import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

function RegistrationPage() {
  const [registration, setRegistration] = useState({
    name: '',
    username: '',
    password: '',
    retypePassword: '',
    email: ''
  });

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

    // Create an object with the registration data
    const registrationData = {
      name: registration.name,
      username: registration.username,
      password: registration.password,
      retypePassword: registration.retypePassword,
      email: registration.email,
    };

    try {
      // Send a POST request to your server with the registration data
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        // User registered successfully, you can handle this as needed
        console.log('User registered successfully');

        // Optionally, you can reset the form fields after successful registration
        setRegistration({
          name: '',
          username: '',
          password: '',
          retypePassword: '',
          email: ''
        });

        // You can also navigate the user to a success page or the login page
        navigate('/login');
      } else {
        // Handle registration failure
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
    
  };

  return (
    <div className="registration-container">
      <h2>Register for NGKast!</h2>
      <form className="registration-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name" // Add the name attribute
            value={registration.name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username/Login ID:</label>
          <input
            type="text"
            id="username"
            name="username" // Add the name attribute
            value={registration.username}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password" // Add the name attribute
            value={registration.password}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Retype Password:</label>
          <input
            type="password"
            id="retypePassword"
            name="retypePassword" // Add the name attribute
            value={registration.retypePassword}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email" // Add the name attribute
            value={registration.email}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>{" "}
        {/* Use Link to navigate */}
      </p>{" "}
    </div>
  );
}

export default RegistrationPage;
