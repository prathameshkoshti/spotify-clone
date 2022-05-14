import React from "react";

export default function index({ audioRef, url }) {
  return (
    <div className="audio-player">
      <audio ref={audioRef} controls autoPlay>
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  );
}
