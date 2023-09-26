import React, { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import HomePage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";

function App() {
  // Define your state and logic, including the playSelectedEpisode function
  const [savedEpisodes, setSavedEpisodes] = useState([]);

  // Function to add a saved episode
  const addSavedEpisode = (episode) => {
    // Create a copy of the current saved episodes array and add the new episode
    const updatedEpisodes = [...savedEpisodes, episode];
    setSavedEpisodes(updatedEpisodes);
  };


  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/homepage"
            element={<HomePage />} // Pass user_name
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                savedEpisodes={savedEpisodes}
                addSavedEpisode={addSavedEpisode}
              />
            }
          />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
