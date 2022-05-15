import "./styles/fonts.css";
import "./styles/App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Queue from "./components/Queue";
import Player from "./components/Player";
import Loader from "./components/Loader";
import axios from "axios";
import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs";

const url = "https://api.ss.dev/resource/api";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [colorGradient, setColorGradient] = useState([]);
  const [colorGradientCopy, setColorGradientCopy] = useState([]);
  const [makeTransition, setMakeTransition] = useState(false);

  const [currentPlaylist, setCurrentPlaylist] = useState({
    playlist: {},
    songs: [],
  });
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const query = `
        query {
          getPlaylists {
            id
            title
          }
        }
      `;
      const variables = {};
      const response = await axios.post(url, { query, variables });
      setPlaylists(response.data.data.getPlaylists);
      setIsLoading(false);
    })();
  }, []);

  const handlePlaylistClick = (event) => {
    const { playlistId } = event.target.dataset;
    const playlist = playlists.find(
      (playlist) => playlist.id === parseInt(playlistId)
    );
    if (playlistSongs[playlistId]) {
      setCurrentPlaylist({
        playlist,
        songs: playlistSongs[playlistId],
      });
    } else {
      (async () => {
        setIsLoading(true);
        const query = `
            query ExampleQuery($playlistId: Int!) {
              getSongs(playlistId: $playlistId) {
                _id
                title
                photo
                url
                duration
                artist
              }
            }
          `;
        const variables = {
          playlistId: 1,
        };
        const response = await axios.post(url, { query, variables });

        setPlaylistSongs({
          ...playlistSongs,
          [playlistId]: response.data.data.getSongs,
        });
        setCurrentPlaylist({
          playlist,
          songs: response.data.data.getSongs,
        });
        setIsLoading(false);
      })();
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  useEffect(() => {
    if (currentSong) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = currentSong.photo;

      img.addEventListener("load", function () {
        const color = colorThief.getColor(img);
        const grad1 = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`;
        const grad2 = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`;
        setColorGradient([grad1, grad2]);
      });
    }
  }, [currentSong]);

  useEffect(() => {
    setMakeTransition(true);

    setTimeout(() => {
      setColorGradientCopy(colorGradient);
      setMakeTransition(false);
    }, 500);
  }, [colorGradient]);

  return (
    <div className="App">
      <Header
        playlists={playlists}
        handlePlaylistClick={handlePlaylistClick}
        currentPlaylistId={currentPlaylist.playlist.id}
      />
      <div className="queue-player-wrapper">
        {currentPlaylist.playlist?.id && (
          <Queue currentPlaylist={currentPlaylist} playSong={playSong} />
        )}
        {currentSong && (
          <Player
            song={currentSong}
            currentPlaylist={currentPlaylist}
            playSong={playSong}
          />
        )}
        {isLoading && <Loader />}
      </div>
      <div
        className="background-gradient"
        style={{
          background: `linear-gradient(145deg, ${colorGradient[0]}, ${colorGradient[1]})`,
        }}
      ></div>
      <div
        className={`background-gradient-transiting ${
          makeTransition ? "fade" : ""
        }`}
        style={{
          background: `linear-gradient(145deg, ${colorGradientCopy[0]}, ${colorGradientCopy[1]})`,
        }}
      ></div>
    </div>
  );
}

export default App;
