import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div className="TrackList">
      {tracks && tracks.map(track => (
        <Track
          track={track}
          key={track.id}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default TrackList;
