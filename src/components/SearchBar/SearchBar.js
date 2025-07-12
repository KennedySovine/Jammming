import './SearchBar.css';
import React, { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a song, artist, or album"
          value={term}
          onChange={handleInputChange}
        />
        <button type="submit">SEARCH</button>
      </form>
    </div>
  );
};