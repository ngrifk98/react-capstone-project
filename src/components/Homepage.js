import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css"; // Import CSS file for styling
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user_name, setUser_name] = useState(""); // State to store user_name
  const [selectedPodcast, setSelectedPodcast] = useState(null); // State to store the selected podcast and its episodes
  const [bookmarkConfirmation, setBookmarkConfirmation] = useState(""); // State for bookmark confirmation message

  const episodesRef = useRef(null); // Create a ref for the episodes dropdown

  const handleBookmarkClick = (episode) => {
    // You can save the episode URL to the server or local storage here
    // For this example, we'll save it to local storage

    // Get the user's saved episodes from local storage or initialize an empty array
    const savedEpisodes =
      JSON.parse(localStorage.getItem("savedEpisodes")) || [];

    // Check if the episode is already bookmarked
    const isAlreadyBookmarked = savedEpisodes.some(
      (savedEpisode) => savedEpisode.trackId === episode.trackId
    );

    if (!isAlreadyBookmarked) {
      // Add the episode to the saved episodes list
      savedEpisodes.push({
        trackId: episode.trackId,
        trackName: episode.trackName,
        previewUrl: episode.previewUrl,
      });

      // Save the updated list to local storage
      localStorage.setItem("savedEpisodes", JSON.stringify(savedEpisodes));

      // Provide feedback to the user that the episode is bookmarked
      setBookmarkConfirmation("Episode bookmarked!");
    } else {
      // Provide feedback that the episode is already bookmarked
      setBookmarkConfirmation("Episode is already bookmarked.");
    }

    // Clear the confirmation message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setBookmarkConfirmation("");
    }, 3000); // 3000 milliseconds (3 seconds)
  };

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
    fetch("/api/loginApi") // Replace with your server endpoint
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

  // ...

const fetchEpisodeDescriptions = async (episodes) => {
  const episodesWithDescriptions = [];

  for (const episode of episodes) {
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${episode.collectionId}&entity=podcastEpisode`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.results && data.results[0] && data.results[0].description) {
          // Retrieve the description and limit it to 100 characters
          const description = data.results[0].description.substring(0, 100);
          const episodeWithDescription = {
            ...episode,
            description,
          };
          episodesWithDescriptions.push(episodeWithDescription);
        } else {
          // If description is not available, provide a default message
          const episodeWithDescription = {
            ...episode,
            description: "Description not available",
          };
          episodesWithDescriptions.push(episodeWithDescription);
        }
      } else {
        console.error("Failed to fetch episode description");
      }
    } catch (error) {
      console.error("Error fetching episode description:", error);
    }
  }

  return episodesWithDescriptions;
};

// ...

const handlePodcastClick = async (podcast) => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${podcast.collectionId}&entity=podcastEpisode`
    );

    if (response.ok) {
      const data = await response.json();
      const episodesWithDescriptions = await fetchEpisodeDescriptions(
        data.results
      );

      setSelectedPodcast({
        ...podcast,
        episodes: episodesWithDescriptions,
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
      <h2 className="welcome-text">
        Welcome, {user_name || "Guest"} to NGKast
      </h2>
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
      {/* Display bookmark confirmation message */}
      {bookmarkConfirmation && (
        <p className="bookmark-confirmation">{bookmarkConfirmation}</p>
      )}
      {/* Display episodes dropdown */}
      {selectedPodcast && (
        <div className="podcast-episodes" ref={episodesRef}>
          <h4>{selectedPodcast.trackName} - Latest Episodes:</h4>
          <ul>
            {selectedPodcast.episodes.map((episode) => (
              <li key={episode.trackId}>
                <h5>{episode.trackName}</h5>
                <p>{episode.description}</p> {/* Display episode description */}
                <audio controls>
                  <source src={episode.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <button onClick={() => handleBookmarkClick(episode)}>
                  Bookmark
                </button>
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
