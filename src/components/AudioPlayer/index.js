import React, { useState, useEffect } from "react";

export default function Index({ audioRef, url }) {
  const [songURL, setSongURL] = useState("");

  useEffect(() => {
    setSongURL(url);
  }, [url]);

  useEffect(() => {
    setTimeout(function () {
      audioRef.current.play();
    }, 150);
  }, [songURL]);

  return (
    <div className="audio-player">
      <audio ref={audioRef} controls autoPlay>
        <source src={songURL} type="audio/mpeg" />
      </audio>
    </div>
  );
}
