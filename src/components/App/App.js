import './App.css';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../Tracklist/Tracklist';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/spotifyAPI';


function App() {
  // State for search results, playlist tracks, and playlist name
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  // Add a track to the playlist if it's not already there
  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find(t => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  // Remove a track from the playlist by id
  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  // Search Spotify for tracks
  const searchTracks = (searchTerm) => {
    Spotify.search(searchTerm)
      .then(results => setSearchResults(results))
      .catch(error => {
        console.error("Error fetching tracks:", error);
        setSearchResults([]);
      });
  };

  // Save the playlist to Spotify
  const savePlaylist = async () => {
    const uris = playlistTracks.map(track => track.uri).filter(Boolean);
    if (!playlistName || uris.length === 0) return;
    await Spotify.savePlaylist(playlistName, uris);
    setPlaylistTracks([]);
    setPlaylistName('New Playlist');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Ja<span className="mmm">mmm</span>ing</p>
      </header>
      <div className="App-content">
        {/* Search bar for entering search terms */}
        <SearchBar onSearch={searchTracks} />
        <div className="App-main">
          {/* Search results list (add tracks) */}
          <TrackList tracks={searchResults} onAdd={addTrackToPlaylist} isRemoval={false} />
          {/* Playlist (remove tracks, save to Spotify) */}
          <Playlist
            playlist={playlistTracks}
            onRemove={removeTrackFromPlaylist}
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
