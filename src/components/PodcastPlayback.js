import React, { useState, useEffect } from "react";

function PodcastPlayback({ selectedEpisode, playEpisode }) {
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="podcast-playback">
      <h3>Now Playing</h3>
      {selectedEpisode ? (
        <>
          <h4>{selectedEpisode.title}</h4>
          <audio
            controls
            autoPlay={isPlaying} // Auto-play when isPlaying is true
            onPause={pauseEpisode}
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
