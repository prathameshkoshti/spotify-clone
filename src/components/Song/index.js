import React from "react";
import "./style.css";

export default function index({ song, playSong }) {
  const getDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds}`;
  }

  return (
    <div className="song" onClick={() => playSong(song)}>
      <div className="song-album-art">
        <img src={song.photo} alt={song.title} />
      </div>
      <div className="song-info">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist}</div>
      </div>
      <div className="song-duration">{getDuration(song.duration)}</div>
    </div>
  );
}
