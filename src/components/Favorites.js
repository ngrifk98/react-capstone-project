import React, { useState, useEffect } from "react";
import "./Favorites.css";

function Favorites() {
  const [savedEpisodes, setSavedEpisodes] = useState([]);
  const [removeConfirmation, setRemoveConfirmation] = useState(""); // State for remove confirmation message

  useEffect(() => {
    // Retrieve the user's saved episodes from local storage
    const savedEpisodesData = JSON.parse(localStorage.getItem("savedEpisodes")) || [];
    setSavedEpisodes(savedEpisodesData);
  }, []);

  const removeEpisode = (trackId) => {
    // Filter out the episode with the given trackId from the savedEpisodes list
    const updatedEpisodes = savedEpisodes.filter((episode) => episode.trackId !== trackId);

    // Update the state with the filtered list
    setSavedEpisodes(updatedEpisodes);

    // Update local storage to reflect the changes
    localStorage.setItem("savedEpisodes", JSON.stringify(updatedEpisodes));

    // Provide feedback to the user that the episode is removed
    setRemoveConfirmation("Episode removed!");

    // Clear the confirmation message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setRemoveConfirmation("");
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {/* Display remove confirmation message */}
      {removeConfirmation && (
        <p className="remove-confirmation">{removeConfirmation}</p>
      )}
      <ul>
        {savedEpisodes.map((episode) => (
          <li key={episode.trackId}>
            <h5>{episode.trackName}</h5>
            <audio controls>
              <source src={episode.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => removeEpisode(episode.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
