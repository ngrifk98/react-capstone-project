import React, { useState } from 'react';
import './Homepage.css'; // Import CSS file for styling

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = async () => {
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${searchQuery}&media=podcast`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    performSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="homepage">
      <h2>Welcome to NGKast</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for podcasts"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress} // Add the keyPress event listener
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      {/* Render the search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.trackId}>{result.trackName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
