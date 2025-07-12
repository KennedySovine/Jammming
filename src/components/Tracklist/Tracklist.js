import './Tracklist.css';
import React from 'react'; 
import { Track } from '../Track/Track';

export const Tracklist = ({ tracks, onAdd }) => {
    return (
        <div className="Tracklist">
            <h2>Results</h2>
            {tracks?.map(track => (
                <Track 
                    key={track.id} 
                    track={track} 
                    onAdd={onAdd} 
                    isInPlaylist={false}
                />
            ))}
        </div>
    );
}