import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faVolumeHigh,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default function index({ playSong, playNextSong, playPreviousSong }) {
  return (
    <div className="player-controls">
      <button className="tertiary">
        <FontAwesomeIcon size="lg" icon={faEllipsis} onClick={() => {}} />
      </button>
      <div className="song-controls">
        <button className="secondary previous">
          <FontAwesomeIcon
            size="lg"
            icon={faBackward}
            onClick={playPreviousSong}
          />
        </button>
        <button className="primary play-pause">
          <FontAwesomeIcon size="lg" icon={faPlay} onClick={playSong} />
        </button>
        <button className="secondary next">
          <FontAwesomeIcon size="lg" icon={faForward} onClick={playNextSong} />
        </button>
      </div>
      <button className="tertiary">
        <FontAwesomeIcon size="lg" icon={faVolumeHigh} onClick={playSong} />
      </button>
    </div>
  );
}
