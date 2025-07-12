import './Track.css';
import React from 'react';

export const Track = ({ track, onAdd, onRemove, isInPlaylist }) => {
    return (
        <div className="Track">
            <div className="Track-information">
                <div>
                    <h3>{track.name}</h3>
                    <p>
                        {track.artists
                            ? track.artists.map(artist => artist.name).join(', ')
                            : track.artist
                        }
                        {track.album ? ` | ${track.album}` : ''}
                    </p>
                </div>
                {isInPlaylist ? (
                    <button className="Track-action" onClick={() => onRemove(track)}>-</button>
                ) : (
                    <button className="Track-action" onClick={() => onAdd(track)}>+</button>
                )}
            </div>
        </div>
    )
}