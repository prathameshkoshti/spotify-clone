import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faVolumeHigh,
  faVolumeMute,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default function index({
  togglePlayback,
  playNextSong,
  playPreviousSong,
  isPlaying,
  toggleVolume,
  isMuted,
}) {
  return (
    <div className="player-controls">
      <button className="tertiary">
        <FontAwesomeIcon size="lg" icon={faEllipsis} onClick={() => {}} />
      </button>
      <div className="song-controls">
        <button className="secondary previous" onClick={playPreviousSong}>
          <FontAwesomeIcon size="lg" icon={faBackward} />
        </button>
        <button className="primary play-pause" onClick={togglePlayback}>
          <FontAwesomeIcon size="lg" icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className="secondary next" onClick={playNextSong}>
          <FontAwesomeIcon size="lg" icon={faForward} />
        </button>
      </div>
      <button className="tertiary" onClick={toggleVolume}>
        <FontAwesomeIcon size="lg" icon={isMuted ? faVolumeMute: faVolumeHigh} />
      </button>
    </div>
  );
}
