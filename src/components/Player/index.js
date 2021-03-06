import React, { useState, useRef, useEffect, useCallback } from "react";
import PlayerControls from "../PlayerControls";
import SongProgress from "../SongProgress";
import AudioPlayer from "../AudioPlayer";
import "./style.css";

export default function Index({
  song,
  currentPlaylist,
  playSong,
  audioRef,
  albumArtRef,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [url, setURL] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0.0);

  const togglePlayback = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleVolume = () => {
    if (audioRef && audioRef.current) {
      setIsMuted(!isMuted);
    }
  };

  const playNextSong = useCallback(() => {
    const currentSongIndex = currentPlaylist.songs.findIndex(
      (s) => s._id === song._id
    );
    const nextSongIndex = currentSongIndex + 1;
    playSong(currentPlaylist.songs[nextSongIndex]);
    setURL(currentPlaylist.songs[nextSongIndex].url);
  });
  const playPreviousSong = () => {
    const currentSongIndex = currentPlaylist.songs.findIndex(
      (s) => s._id === song._id
    );
    const prevSongIndex = currentSongIndex - 1;
    playSong(currentPlaylist.songs[prevSongIndex]);
    setURL(currentPlaylist.songs[prevSongIndex].url);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.addEventListener("ended", playNextSong);
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef?.current?.currentTime && audioRef?.current?.duration) {
          setProgress(
            (audioRef.current.currentTime + 0.25) / audioRef.current.duration
          );
        }
      });
    }
  }, [audioRef, playNextSong]);

  useEffect(() => {
    setURL(song.url);
  }, [song]);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="player">
      {url && <AudioPlayer audioRef={audioRef} url={url} />}
      <div className="song-name">
        <h1>{song.title}</h1>
      </div>
      <div className="song-artist">{song.artist}</div>
      <div className="song-cover-art">
        <img ref={albumArtRef} src={song.photo} alt={song.title} />
      </div>
      <SongProgress progress={progress} />
      <PlayerControls
        isPlaying={isPlaying}
        togglePlayback={togglePlayback}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        toggleVolume={toggleVolume}
        isMuted={isMuted}
      />
    </div>
  );
}
