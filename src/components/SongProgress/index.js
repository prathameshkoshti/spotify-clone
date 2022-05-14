import React from "react";
import "./style.css";

export default function index({ progress }) {
  return (
    <div className="song-progress">
      <div
        className="song-progress-bar"
        style={{
          transform: `scaleX(${progress})`,
        }}
      ></div>
    </div>
  );
}
