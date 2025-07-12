import './Playlist.css';
import React, { useState } from 'react';
import { Track } from '../Track/Track';
import { SpotifyAPI } from '../utils/spotifyAPI';

export const Playlist = ({ playlist, onRemove, onSave, name, setName }) => {

    const handleNameChange = (e) => {
        setName(e.target.value);
    };



    return (
        <div className="Playlist">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
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
            <button className="Playlist-save" onClick={onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}