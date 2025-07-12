import './SearchBar.css';
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Update state as user types

  // Handle form submission
  const [term, setTerm] = useState('');

  function handleTermChange(e) {
    setTerm(e.target.value);
  }

  function search(e) {
    e.preventDefault();
    if (onSearch) {
      onSearch(term);
    }
  }

  return (
    <div className="SearchBar">
      <form onSubmit={search}>
        <input
          placeholder="Enter a song, artist, or album"
          value={term}
          onChange={handleTermChange}
        />
        <button type="submit">SEARCH</button>
      </form>
    </div>
  );
}

export default SearchBar;