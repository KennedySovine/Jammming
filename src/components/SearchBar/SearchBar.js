import './SearchBar.css';
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Update state as user types
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a song, artist, or album"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">SEARCH</button>
      </form>
    </div>
  );
}

export default SearchBar;