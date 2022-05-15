import React, { useState, useEffect } from "react";
import Song from "../Song";
import Loader from "../Loader";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Index({ currentPlaylist, playSong, isLoading }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [songs, setSongs] = useState([]);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const handleSearchField = (event) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  const toggleQueue = () => {
    setIsQueueOpen(!isQueueOpen);
  };

  const handleSongClick = (song) => {
    toggleQueue();
    playSong(song);
  }

  useEffect(() => {
    if (currentPlaylist?.songs?.length) {
      if (searchKeyword.length) {
        const searchRegex = new RegExp(`^${searchKeyword}`, "gi");
        const filteredSongs = currentPlaylist.songs.filter((song) => {
          return searchRegex.test(song.title) || searchRegex.test(song.artist);
        });

        setSongs(filteredSongs);
      } else {
        setSongs(currentPlaylist.songs);
      }
    }
  }, [currentPlaylist.songs, searchKeyword]);

  useEffect(() => {
    setIsQueueOpen(true);
  }, [currentPlaylist]);

  return (
    <div className={`queue ${isQueueOpen ? "open" : ""}`}>
      <div className="open-queue" onClick={toggleQueue}>
        <FontAwesomeIcon
          size="lg"
          icon={isQueueOpen ? faAngleDown : faAngleUp}
        />
      </div>
      <h1 className="playlist-name">{currentPlaylist.playlist.title}</h1>
      <div className="textfield-wrapper">
        <input
          className="search-song-textfield"
          type="text"
          onChange={handleSearchField}
          placeholder="Search Song, Artist"
        />
      </div>
      {isLoading && <Loader />}
      {songs && (
        <div className="songs-queue">
          {songs.map((song) => (
            <Song key={song._id} song={song} playSong={handleSongClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
