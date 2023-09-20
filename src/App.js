import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
