import './Playlist.css';
import React from 'react';
import TrackList from '../Tracklist/Tracklist';

function Playlist({ playlist, onRemove, onSave, name, setName }) {
  return (
    <div className="Playlist">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TrackList
        tracks={playlist}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;