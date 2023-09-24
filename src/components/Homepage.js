import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css"; // Import CSS file for styling
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user_name, setUser_name] = useState(""); // State to store user_name
  const [selectedPodcast, setSelectedPodcast] = useState(null); // State to store the selected podcast and its episodes

  const episodesRef = useRef(null); // Create a ref for the episodes dropdown

  useEffect(() => {
    // Retrieve the user_name from the cookie
    const storedUserName = Cookies.get("user_name");

    if (storedUserName) {
      setUser_name(storedUserName);
    } else {
      // Handle the case when the user_name is not found in the cookie
      console.error("User_name not found in the cookie");
    }

    // Fetch the user_name from the server when the component mounts
    fetch("http://localhost:3000/api/NGKast") // Replace with your server endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user_name");
        }
      })
      .then((data) => {
        setUser_name(data.user_name); // Set the user_name in the state
      })
      .catch((error) => {
        console.error("Error fetching user_name:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const performSearch = async () => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchQuery}&media=podcast`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    performSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handlePodcastClick = async (podcast) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${podcast.collectionId}&entity=podcastEpisode`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedPodcast({
          ...podcast,
          episodes: data.results,
        });

        // Scroll to the episodes dropdown when a podcast is selected
        if (episodesRef.current) {
          episodesRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        console.error("Failed to fetch podcast episodes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="homepage">
      <h2>Welcome, {user_name || "Guest"} to NGKast</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for podcasts"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      {/* Render the search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.trackId}
                className="podcast-item"
                onClick={() => handlePodcastClick(result)} // Handle podcast click
              >
                <div className="podcast-image">
                  <img src={result.artworkUrl100} alt={result.trackName} />
                </div>
                <div className="podcast-info">
                  <h4>{result.trackName}</h4>
                  <p>{result.artistName}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Display episodes dropdown */}
      {selectedPodcast && (
        <div className="podcast-episodes" ref={episodesRef}>
          <h4>{selectedPodcast.trackName} - Latest Episodes:</h4>
          <ul>
            {selectedPodcast.episodes.map((episode) => (
              <li key={episode.trackId}>
                <h5>{episode.trackName}</h5>
                <audio controls>
                  <source src={episode.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Link to the Favorites page */}
      <Link to="/favorites">View Favorites</Link>
    </div>
  );
}

export default Homepage;
