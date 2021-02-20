import React, { useEffect, useState } from "react";
import SearchBar from "components/SearchBar/SearchBar";
import SearchResults from "components/SearchResults/SearchResults";
import Playlist from "components/Playlist/Playlist";
import "./App.css";
import Spotify from "../../util/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState();
  const [playlistName, setPlaylistName] = useState("My Playlist");
  let [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    console.log("Se agrega track", track);
    const playlist = playlistTracks;
    if (playlist.find((t) => t.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    let filteredPlaylist = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(filteredPlaylist);
  };

  const updatePlaylistName = (listName) => {
    setPlaylistName(listName);
  };

  const savePlaylist = () => {
    const tracksURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, tracksURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  const search = (term) => {
    Spotify.search(term).then((tracks) => {
      setSearchResults(tracks);
    });
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      Spotify.getAccessToken();
    });
  });

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
