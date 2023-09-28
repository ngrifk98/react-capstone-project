import React, { useState, useEffect } from "react";

function PodcastPlayback({ selectedEpisode, playEpisode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // State to track current playback time

  // Function to handle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Function to pause the current episode
  const pauseEpisode = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    // When the selected episode changes, play it
    if (selectedEpisode) {
      playEpisode(selectedEpisode);
      setIsPlaying(true);
    } else {
      // If no episode is selected, pause playback
      setIsPlaying(false);
    }
  }, [selectedEpisode, playEpisode]);

  // Listen for time updates on the audio element
  useEffect(() => {
    const audioElement = document.getElementById("podcast-audio");

    if (audioElement) {
      // Update the currentTime property of the audio element
      audioElement.currentTime = currentTime;
    }
  }, [currentTime]);

  // Save the current playback time to the selectedEpisode object
  useEffect(() => {
    if (selectedEpisode) {
      selectedEpisode.playbackTime = currentTime;
    }
  }, [currentTime, selectedEpisode]);

  return (
    <div className="podcast-playback">
      <h3>Now Playing</h3>
      {selectedEpisode ? (
        <>
          <h4>{selectedEpisode.title}</h4>
          <audio
            controls
            autoPlay={isPlaying}
            onPause={pauseEpisode}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            id="podcast-audio" // Add an ID to the audio element
          >
            <source src={selectedEpisode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="playback-controls">
            <button onClick={togglePlayback}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </>
      ) : (
        <p>No episode selected.</p>
      )}
    </div>
  );
}

export default PodcastPlayback;
