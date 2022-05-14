import "./styles/fonts.css";
import "./styles/App.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Queue from "./components/Queue";
import Player from "./components/Player";
import Loader from "./components/Loader";
import axios from "axios";

const url = "https://api.ss.dev/resource/api";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="App">
      <Header
        playlists={playlists}
        handlePlaylistClick={handlePlaylistClick}
        currentPlaylistId={currentPlaylist.playlist.id}
      />
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
  );
}

export default App;
