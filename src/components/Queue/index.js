import React, { useState, useEffect } from "react";
import Song from "../Song";
import Loader from "../Loader";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="queue">
      <div className="queue-header">
        <h1 className="playlist-name">{currentPlaylist.playlist.title}</h1>
        <div className="close-queue" onClick={toggleQueue}>
          <FontAwesomeIcon size="lg" icon={faTimes} />
        </div>
      </div>
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
            <Song key={song._id} song={song} playSong={playSong} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
