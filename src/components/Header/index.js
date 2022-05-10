import React from "react";
import logo from "../../assets/images/logo.svg";
import Sidebar from "../Sidebar";
import "./style.css";

export default function index({
  playlists,
  handlePlaylistClick,
  currentPlaylistId,
}) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      <Sidebar
        playlists={playlists}
        handlePlaylistClick={handlePlaylistClick}
        currentPlaylistId={currentPlaylistId}
      />
    </header>
  );
}
