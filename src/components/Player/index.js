import React, { useRef } from "react";
import PlayerControls from "../PlayerControls";
import SongProgress from "../SongProgress";
import "./style.css";

export default function Index({ song, currentPlaylist }) {
  const audioRef = useRef(null);
  const playSong = () => {};
  const pauseSong = () => {};
  const playNextSong = () => {};
  const playPreviousSong = () => {};
  return (
    <div className="player">
      <div className="song-name">
        <h1>{song.title}</h1>
      </div>
      <div className="song-artist">{song.artist}</div>
      <div className="song-cover-art">
        <img src={song.photo} alt={song.title} />
      </div>
      <SongProgress />
      <PlayerControls
        playSong={playSong}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
      />
    </div>
  );
}
