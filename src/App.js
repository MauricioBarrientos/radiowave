import React, { useState, useEffect } from 'react';
import stations from './mock/stations';
import RadioStationCard from './components/RadioStationCard';
import PlayerControls from './components/PlayerControls';
import NowPlaying from './components/NowPlaying';

const App = () => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [audio] = useState(new Audio());
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  
      // Espera hasta que pueda reproducirse sin interrupciones
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
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''} flex flex-col items-center min-h-screen bg-gray-50 p-4 md:p-8`}>
      <header className="app-header">
        <button onClick={toggleDarkMode} className="btn">
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </header>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">RadioWave</h1>

        <div className="mb-8 w-full">
          <NowPlaying station={currentStation} />
        </div>

        <div className="mb-8 w-full">
          <PlayerControls 
            isPlaying={isPlaying} 
            onPlayPause={handlePlayPause}
            onVolumeChange={handleVolumeChange}
            volume={volume}
          />
        </div>

        <div className="station-container space-y-4 w-full">
          <h2 className="text-xl font-semibold">Estaciones</h2>
          {stations.map(station => (
            <RadioStationCard 
              key={station.id}
              station={station}
              isPlaying={isPlaying && currentStation?.id === station.id}
              onPlay={handlePlayStation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;