import React from 'react'
import PropTypes from 'prop-types'

const RadioStationCard = React.memo(
  ({ station, isPlaying, onPlay, isFavorite, onFavorite }) => {
    const handlePlayClick = (e) => {
      e.stopPropagation()
      onPlay(station)
    }

    const handleFavoriteClick = (e) => {
      e.stopPropagation()
      onFavorite(station.id)
    }

    return (
      <div
        className={`station-card rounded-xl flex flex-col items-center justify-between p-4 transition-all duration-300 cursor-pointer`}
        onClick={() => onPlay(station)}
        tabIndex={0}
        aria-label={`Seleccionar estación ${station.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onPlay(station)
        }}
      >
        <div className="relative w-full flex justify-center items-center mb-4">
          <img
            src={station.cover}
            alt={station.name}
            className="radio-cover w-24 h-24 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {isPlaying && (
            <span
              className="absolute top-2 right-2 animate-pulse"
              aria-label="Reproduciendo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                <circle cx="12" cy="12" r="8" />
              </svg>
            </span>
          )}
        </div>

        <div className="text-center mb-4">
          <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 truncate">
            {station.name}
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {station.frequency}
          </p>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            onClick={handlePlayClick}
            className={`btn-play w-full px-4 py-2 rounded-lg font-bold transition-colors duration-200 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            aria-label={
              isPlaying ? `Pausar ${station.name}` : `Escuchar ${station.name}`
            }
          >
            {isPlaying ? 'Pausar' : 'Escuchar'}
          </button>
          <button
            onClick={handleFavoriteClick}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={
              isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#f44336' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-500 dark:text-gray-400"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
)

RadioStationCard.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavorite: PropTypes.func.isRequired,
}

RadioStationCard.displayName = 'RadioStationCard'

export default RadioStationCard
