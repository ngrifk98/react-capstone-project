import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import HomePage from "./components/Homepage";
import Header from "./components/Header"; // Import the Header component
import Footer from "./components/Footer"; // Import the Footer component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// const { sequelize } = require('./util/database'); // Adjust the relative path

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Render the Header component */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/homepage"
            element={<HomePage/>} // Pass user_name
          />
          
          {/* Add more routes as needed */}
        </Routes>
        <Footer /> {/* Render the Footer component */}
      </div>
    </Router>
  );
}

// sequelize.sync();

export default App;
