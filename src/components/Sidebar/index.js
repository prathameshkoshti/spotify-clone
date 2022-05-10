import React from "react";
import uuid from "react-uuid";
import "./style.css";

function Playlist({ playlist, handlePlaylistClick, selected }) {
  return (
    <div className={`playlist ${selected ? 'selected' : ''}`} onClick={handlePlaylistClick} data-playlist-id={playlist.id}>
      {playlist.title}
    </div>
  );
}

function index({ currentPlaylistId, playlists, handlePlaylistClick }) {
  return (
    <div className="playlists">
      {playlists.map((playlist) => (
        <Playlist
          key={uuid()}
          playlist={playlist}
          handlePlaylistClick={handlePlaylistClick}
          selected={currentPlaylistId === playlist.id}
        />
      ))}
    </div>
  );
}

export default index;
