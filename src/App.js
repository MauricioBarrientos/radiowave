import React, { useState, useEffect, useMemo } from 'react';
import stationsData from './mock/stations';
import RadioStationCard from './components/RadioStationCard';
import PlayerControls from './components/PlayerControls';
import NowPlaying from './components/NowPlaying';

const App = () => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [audio] = useState(new Audio());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('radioFavorites') || '[]'));
  const [search, setSearch] = useState('');

  useEffect(() => {
    const savedVolume = localStorage.getItem('radioVolume');
    if (savedVolume) {
      setVolume(parseInt(savedVolume));
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    audio.volume = volume / 100;
    localStorage.setItem('radioVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('radioFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredStations = useMemo(() => {
    let filtered = stationsData.filter(station =>
      station.name.toLowerCase().includes(search.toLowerCase()) ||
      station.frequency.toLowerCase().includes(search.toLowerCase())
    );
    filtered.sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav === bFav) return 0;
      return aFav ? -1 : 1;
    });
    return filtered;
  }, [search, favorites]);

  const handlePlayStation = (station) => {
    if (currentStation && currentStation.id === station.id) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      audio.pause();
      audio.src = station.url;
      setCurrentStation(station);
      setIsPlaying(true);
  
      audio.addEventListener('canplaythrough', () => {
        audio.play();
      });
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else if (currentStation) {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFavorite = (id) => {
    setFavorites(favs => favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
  };

  return (
    <div className={`app${isDarkMode ? ' dark-mode' : ''} flex flex-col items-center min-h-screen${isDarkMode ? '' : ' bg-gray-50'} p-4 md:p-8`}
      style={{ minHeight: '100vh', width: '100vw', boxSizing: 'border-box' }}
    >
      <header className="app-header flex flex-col md:flex-row items-center justify-between w-full max-w-2xl mx-auto mb-4 gap-4">
        <button onClick={toggleDarkMode} className="btn" aria-label="Alternar modo oscuro/claro">
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
        <input
          type="text"
          placeholder="Buscar estación..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark-mode:bg-[#23272f] text-black dark-mode:text-white"
          aria-label="Buscar estación"
        />
      </header>
      <div className={`max-w-2xl mx-auto text-center${isDarkMode ? ' dark-mode' : ''}`}
        style={{ width: '100%', maxWidth: 600 }}
      >        
        <h1 className="text-3xl font-bold mb-8">RadioWave</h1>
        <div className="mb-8 w-full">
          <NowPlaying 
            station={currentStation} 
            isPlaying={isPlaying}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="mb-8 w-full">
          <PlayerControls 
            isPlaying={isPlaying} 
            onPlayPause={handlePlayPause}
            onVolumeChange={handleVolumeChange}
            volume={volume}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="station-container space-y-4 w-full">
          {filteredStations.map(station => (
            <RadioStationCard 
              key={station.id}
              station={station}
              isPlaying={isPlaying && currentStation?.id === station.id}
              onPlay={handlePlayStation}
              isDarkMode={isDarkMode}
              isFavorite={favorites.includes(station.id)}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;