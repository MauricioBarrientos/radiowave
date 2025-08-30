import React, { useState, useEffect, useMemo, useCallback } from 'react'
import stationsData from './mock/stations'
import RadioStationCard from './components/RadioStationCard'
import PlayerControls from './components/PlayerControls'

const App = () => {
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(new Audio())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleError = (e) => {
      console.error('Audio error:', e)
      if (e.target.error) {
        switch (e.target.error.code) {
          case e.target.error.MEDIA_ERR_ABORTED:
            console.error('You aborted the audio playback.')
            break
          case e.target.error.MEDIA_ERR_NETWORK:
            console.error('A network error caused the audio download to fail.')
            break
          case e.target.error.MEDIA_ERR_DECODE:
            console.error(
              'The audio playback was aborted due to a corruption problem or because the media used features the browser did not support.'
            )
            break
          case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            console.error(
              'The audio could not be loaded, either because the server or network failed or because the format is not supported.'
            )
            break
          default:
            console.error('An unknown audio error occurred.')
            break
        }
      }
    }

    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [audio])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : ''
  }, [isDarkMode])

  const handlePlayStation = useCallback(
    (station) => {
      if (currentStation?.id === station.id) {
        if (isPlaying) {
          audio.pause()
        } else {
          audio.play()
        }
        setIsPlaying(!isPlaying)
      } else {
        audio.pause()
        audio.src = station.url
        audio.play()
        setCurrentStation(station)
        setIsPlaying(true)
      }
    },
    [audio, currentStation, isPlaying]
  )

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      audio.pause()
    } else if (currentStation) {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }, [audio, currentStation, isPlaying])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode)
  }, [])

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
          <button onClick={toggleDarkMode} className="btn btn-primary">
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
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

          <div className="mb-8">
            <PlayerControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
            />
          </div>

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
    </div>
  )
}

export default App
