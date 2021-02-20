import React, { useEffect } from "react";
import TrackList from "components/TrackList/TrackList";
import "./Playlist.css";

export default function Playlist({
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
}) {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}
