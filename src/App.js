import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Tracklist } from './components/Tracklist/Tracklist';
import { Playlist } from './components/Playlist/Playlist';

function App() {
  const [tracklist, setTracklist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  const addTrackToPlaylist = (track) => {
    setPlaylist([...playlist, track]);
  };

  const removeTrackFromPlaylist = (trackId) => {
    const indexToRemove = playlist.findIndex(track => track.id === trackId);
    if (indexToRemove === -1) return; // Track not found in playlist
    setPlaylist(playlist.filter((_, index) => index !== indexToRemove));
  };

  const searchTracks = (searchTerm) => {
    searchFor(searchTerm).then(results => {
      if (results && results.length > 0) {
        setTracklist(results);
      } else {
        setTracklist([]);
      }
    }).catch(error => {
      console.error("Error fetching tracks:", error);
      setTracklist([]);
    });
  };

  // Save playlist to Spotify
  const savePlaylist = async () => {
    const uris = playlist.map(track => track.uri).filter(Boolean);
    if (!playlistName || uris.length === 0) return;
    await SpotifyAPI.savePlaylist(playlistName, uris);
    setPlaylist([]);
    setPlaylistName('New Playlist');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Ja<span className="mmm">mmm</span>ing</p>
      </header>
      <div className="App-content">
        <SearchBar onSearch={searchTracks} />
        <div className="App-main">
          <Tracklist tracks={tracklist} onAdd={addTrackToPlaylist} />
          <Playlist 
            playlist={playlist} 
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
