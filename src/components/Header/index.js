import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import Sidebar from "../Sidebar";
import ProfileImage from "../../assets/images/Profile.png";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Index({
  playlists,
  handlePlaylistClick,
  currentPlaylistId,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePlaylist = (event) => {
    handlePlaylistClick(event);
    toggleSidebar();
  };

  return (
    <header className="header">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon size="lg" icon={faBars} />
      </div>
      <img className="logo" src={logo} alt="logo" />
      <Sidebar
        playlists={playlists}
        handlePlaylistClick={handlePlaylist}
        currentPlaylistId={currentPlaylistId}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <img className="profile_pic" src={ProfileImage} alt="profile_pic" />
    </header>
  );
}
