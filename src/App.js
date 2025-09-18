import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import stationsData from './mock/stations'
import RadioStationCard from './components/RadioStationCard'
import AdvancedPlayer from './components/AdvancedPlayer'

const App = () => {
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const isDarkMode = true
  const [search, setSearch] = useState('')
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [audioRef])

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

  const handlePlayStation = useCallback(
    (station) => {
      if (currentStation?.id === station.id) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      } else {
        if (!audioRef.current) {
          audioRef.current = new Audio()
        }
        audioRef.current.pause()
        audioRef.current.src = station.url
        audioRef.current.play()
        setCurrentStation(station)
        setIsPlaying(true)
      }
    },
    [audioRef, currentStation, isPlaying]
  )

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause()
    } else if (currentStation) {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [audioRef, currentStation, isPlaying])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredStations = useMemo(() => {
    const lowercasedSearch = search.toLowerCase()
    return stationsData.filter(
      (station) =>
        station.name.toLowerCase().includes(lowercasedSearch) ||
        station.frequency.toLowerCase().includes(lowercasedSearch)
    )
  }, [search])

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row items-center justify-between w-full mb-4 gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar estación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-black dark:text-white w-full"
              aria-label="Buscar estación"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Limpiar búsqueda"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>
        </header>

        <main className="text-center">
          <h1 className="text-4xl font-bold mb-8">RadioWave</h1>

          {filteredStations.length > 0 ? (
            <div className="station-container">
              {filteredStations.map((station) => (
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
