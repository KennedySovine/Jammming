import './App.css';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/spotifyAPI';


function App() {
  // State for search results, playlist tracks, and playlist name
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');


  // Add a track to the playlist if it's not already there
  function addTrack(track) {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  }

  // Remove a track from the playlist by id
  function removeTrack(track) {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  }


  // Search Spotify for tracks
  function search(term) {
    Spotify.search(term)
      .then(results => setSearchResults(results))
      .catch(error => {
        console.error("Error fetching tracks:", error);
        setSearchResults([]);
      });
  }


  // Save the playlist to Spotify
  async function savePlaylist() {
    const trackUris = playlistTracks.map(track => track.uri);
    if (!playlistName || trackUris.length === 0) return;
    await Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistTracks([]);
    setPlaylistName('New Playlist');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Ja<span className="mmm">mmm</span>ing</p>
      </header>
      <div className="App-content">
        <SearchBar onSearch={search} />
        <div className="App-main">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlist={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
            name={playlistName}
            setName={setPlaylistName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
