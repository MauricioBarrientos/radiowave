import React, { useState, useEffect, useCallback, useRef } from 'react'
import stationsData from './mock/stations'
import RadioStationCard from './components/RadioStationCard'
import AdvancedPlayer from './components/AdvancedPlayer'

const RETRY_INTERVAL = 5000 // 5 seconds
const MAX_RETRIES = 3

const App = () => {
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const isDarkMode = true
  const [showScroll, setShowScroll] = useState(false)
  const retryCount = useRef(0) // Correctly placed inside App component

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current;

    const handleStreamEnded = () => {
      console.log('Stream ended. Attempting to reconnect...');
      if (currentStation && retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        setTimeout(() => {
          if (currentStation) {
            audio.src = currentStation.url;
            audio.load(); // Reload the audio element to reset its state
            audio.play().catch(e => console.error("Error playing audio after retry:", e));
            setIsPlaying(true);
          }
        }, RETRY_INTERVAL);
      } else {
        console.log('Max retries reached or no current station. Stopping playback.');
        setIsPlaying(false);
        retryCount.current = 0; // Reset retry count
      }
    };

    const handleStreamError = (e) => {
      console.error('Stream error:', e);
      if (currentStation && retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        setTimeout(() => {
          if (currentStation) {
            audio.src = currentStation.url;
            audio.load(); // Reload the audio element to reset its state
            audio.play().catch(e => console.error("Error playing audio after error retry:", e));
            setIsPlaying(true);
          }
        }, RETRY_INTERVAL);
      } else {
        console.log('Max retries reached after error or no current station. Stopping playback.');
        setIsPlaying(false);
        retryCount.current = 0; // Reset retry count
      }
    };

    audio.addEventListener('ended', handleStreamEnded);
    audio.addEventListener('error', handleStreamError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audio.removeEventListener('ended', handleStreamEnded);
        audio.removeEventListener('error', handleStreamError);
      }
    }
  }, [audioRef, currentStation]) // Added currentStation to dependencies for handleStreamEnded/Error

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : ''
  }, [isDarkMode])

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false)
      }
    }

    window.addEventListener('scroll', checkScrollTop)
    return () => {
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [showScroll])

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  const handlePlayStation = useCallback(
    (station) => {
      if (currentStation?.id === station.id) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
        setIsPlaying(!isPlaying)
      } else {
        if (!audioRef.current) {
          audioRef.current = new Audio()
        }
        audioRef.current.pause()
        audioRef.current.src = station.url
        audioRef.current.load(); // Added to ensure new source is loaded
        audioRef.current.play().catch(e => console.error("Error playing audio:", e)); // Added catch for play
        setCurrentStation(station)
        setIsPlaying(true)
        retryCount.current = 0; // Reset retry count on new station play
      }
    },
    [audioRef, currentStation, isPlaying]
  )

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause()
    } else if (currentStation) {
      audioRef.current.play().catch(e => console.error("Error playing audio on play/pause:", e)); // Added catch for play
    }
    setIsPlaying(!isPlaying)
  }, [audioRef, currentStation, isPlaying])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row items-center justify-between w-full mb-4 gap-4">
          {/* Barra de búsqueda eliminada */}
        </header>

        <main className="text-center">
          <h1 className="text-4xl font-bold mb-8">RadioWave</h1>
          {stationsData.length > 0 ? (
            <div className="station-container">
              {stationsData.map((station) => (
                <RadioStationCard
                  key={station.id}
                  station={station}
                  isPlaying={isPlaying && currentStation?.id === station.id}
                  onPlay={handlePlayStation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                No se encontraron estaciones
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Intenta con otra búsqueda.
              </p>
            </div>
          )}
        </main>
      </div>
      <AdvancedPlayer
        currentStation={currentStation}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        audioRef={audioRef}
      />
      {showScroll && (
        <button
          onClick={scrollTop}
          className={`scroll-to-top-button ${showScroll ? 'show' : ''}`}
          aria-label="Volver arriba"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default App