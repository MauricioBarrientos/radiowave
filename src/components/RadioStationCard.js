import React from 'react'
import PropTypes from 'prop-types'

const RadioStationCard = React.memo(
  ({ station, isPlaying, onPlay, isDarkMode }) => {
    return (
      <div
        className={`station-card${isDarkMode ? ' dark-mode' : ''} bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-between p-4 transition-transform duration-300 cursor-pointer${isPlaying ? ' ring-2 ring-blue-500' : ''}`}
        onClick={() => onPlay(station)}
        tabIndex={0}
        aria-label={`Seleccionar estación ${station.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onPlay(station)
        }}
      >
        <div
          className={`station-card-content flex flex-col items-center w-full${isDarkMode ? ' dark-mode' : ''}`}
          style={{
            background: isDarkMode
              ? 'rgba(35,39,47,0.7)'
              : 'rgba(255,255,255,0.7)',
            borderRadius: 12,
            padding: 8,
          }}
        >
          <div className="relative w-full flex justify-center items-center">
            <img
              src={station.cover}
              alt={station.name}
              className="radio-cover mb-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              loading="lazy"
              style={{ borderRadius: 8 }}
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
          <h5
            className={`card-title font-bold text-lg text-center mb-1${isDarkMode ? ' dark-mode' : ''}`}
            style={{
              background: isDarkMode
                ? 'rgba(35,39,47,0.7)'
                : 'rgba(255,255,255,0.7)',
              borderRadius: 6,
              padding: '2px 8px',
              margin: 0,
            }}
          >
            {station.name}
          </h5>
          <p
            className={`card-text text-gray-500 text-center mb-2${isDarkMode ? ' dark-mode' : ''}`}
            style={{
              background: isDarkMode
                ? 'rgba(35,39,47,0.7)'
                : 'rgba(255,255,255,0.7)',
              borderRadius: 6,
              padding: '2px 8px',
              margin: 0,
            }}
          >
            {station.frequency}
          </p>
        </div>
        <button
          style={{
            backgroundColor: isPlaying ? '#ef4444' : '#2563eb',
            color: '#fff',
            border: 'none',
          }}
          className={`btn-play w-full mt-2 hover:bg-orange-500 rounded-lg transition-colors${isDarkMode ? ' dark-mode' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onPlay(station)
          }}
          aria-label={
            isPlaying ? `Pausar ${station.name}` : `Escuchar ${station.name}`
          }
        >
          {isPlaying ? 'Pausar' : 'Escuchar'}
        </button>
      </div>
    )
  }
)

RadioStationCard.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

RadioStationCard.displayName = 'RadioStationCard'

export default RadioStationCard
