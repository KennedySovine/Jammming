import './Tracklist.css';
import React, {useState} from 'react'; 
import Track from '../Track/Track';

export const Tracklist = ({ tracks }) => {
    return (
        <div className="Tracklist">
            <h2>Results</h2>
            {tracks?.map(track => (
                <Track key={track.id} track={track} />
            ))}
        </div>
    );
}