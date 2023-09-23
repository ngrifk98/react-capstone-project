import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import HomePage from "./components/Homepage";
import Header from "./components/Header"; // Import the Header component
import Footer from "./components/Footer"; // Import the Footer component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Render the Header component */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/homepage" element={<HomePage />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer /> {/* Render the Footer component */}
      </div>
    </Router>
  );
}

export default App;
 