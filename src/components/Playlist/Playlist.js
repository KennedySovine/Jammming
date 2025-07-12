import './Playlist.css';
import React, { useState } from 'react';
import { Track } from '../Track/Track';
import { SpotifyAPI } from '../utils/spotifyAPI';

export const Playlist = ({ playlist, onRemove }) => {
    const [name, setName] = useState('New Playlist');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSave = async () => {
        // Collect track URIs
        const trackUris = playlist.map(track => track.uri).filter(Boolean);
        await SpotifyAPI.savePlaylist(name, trackUris);
        // Optionally, clear playlist or show a success message here
    };

    return (
        <div className="Playlist">
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
            />
            <div className="TrackList">
                {playlist.map(track => (
                    <Track 
                        key={track.id} 
                        track={track} 
                        onRemove={() => onRemove(track.id)} 
                        isInPlaylist={true}
                    />
                ))}
            </div>
            <button className="Playlist-save" onClick={handleSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}