import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import stationsData from './mock/stations'
import RadioStationCard from './components/RadioStationCard'
import PlayerControls from './components/PlayerControls'

const App = () => {
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const isDarkMode = true
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const handleError = (e) => {
      console.error('Audio error:', e)
      let message = 'Ocurrió un error desconocido con el audio.'
      if (e.target.error) {
        switch (e.target.error.code) {
          case e.target.error.MEDIA_ERR_ABORTED:
            message = 'La reproducción de audio fue abortada.'
            break
          case e.target.error.MEDIA_ERR_NETWORK:
            message = 'Un error de red impidió la descarga del audio.'
            break
          case e.target.error.MEDIA_ERR_DECODE:
            message =
              'El audio no pudo ser decodificado. El formato podría no ser compatible.'
            break
          case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            message =
              'La estación no pudo ser cargada. El formato no es compatible o la URL no es válida.'
            break
          default:
            message = 'Ocurrió un error inesperado con el audio.'
            break
        }
      }
      setErrorMessage(message)
      setIsPlaying(false) // Stop playing on error
    }

    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    audioRef.current.addEventListener('error', handleError)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleError)
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [audioRef])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : ''
  }, [isDarkMode])

  // Autoplay Rinse FM on component mount
  useEffect(() => {
    const rinseFmStation = stationsData.find(
      (station) => station.name === 'Rinse FM'
    )
    if (rinseFmStation) {
      handlePlayStation(rinseFmStation)
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  const handlePlayStation = useCallback(
    (station) => {
      setErrorMessage(null) // Clear any previous error
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

          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">¡Error!</strong>
              <span className="block sm:inline"> {errorMessage}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  onClick={() => setErrorMessage(null)}
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

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
