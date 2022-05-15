import React, { useRef } from "react";
import uuid from "react-uuid";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Playlist({ playlist, handlePlaylistClick, selected }) {
  return (
    <div
      className={`playlist ${selected ? "selected" : ""}`}
      onClick={handlePlaylistClick}
      data-playlist-id={playlist.id}
    >
      {playlist.title}
    </div>
  );
}

function index({
  currentPlaylistId,
  playlists,
  handlePlaylistClick,
  toggleSidebar,
  isSidebarOpen,
}) {
  return (
    <div className={`${isSidebarOpen ? "open" : ""} playlists`}>
      {playlists.map((playlist) => (
        <Playlist
          key={uuid()}
          playlist={playlist}
          handlePlaylistClick={handlePlaylistClick}
          selected={currentPlaylistId === playlist.id}
        />
      ))}
      <div className="close-sidebar" onClick={toggleSidebar}>
        <FontAwesomeIcon size="lg" icon={faTimes} />
      </div>
    </div>
  );
}

export default index;
