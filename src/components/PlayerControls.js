import React from 'react'
import PropTypes from 'prop-types'

const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onVolumeChange,
  volume,
  isDarkMode,
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100${isDarkMode ? ' dark-mode' : ''}`}
    >
      {/* Botón de play/pausa */}
      <button
        onClick={onPlayPause}
        className={`btn-play px-4 py-2 rounded-full font-bold transition-colors duration-200 ${isPlaying ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}${isDarkMode ? ' dark-mode' : ''}`}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        style={{ minWidth: 40 }}
      >
        {isPlaying ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6"
              y="4"
              width="4"
              height="16"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="14"
              y="4"
              width="4"
              height="16"
              rx="2"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="5,3 19,12 5,21" fill="currentColor" />
          </svg>
        )}
      </button>
      {/* Control de volumen */}
      <div className="flex-1 flex items-center gap-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1C12 1 7 5 7 12C7 19 12 23 12 23C12 23 17 19 17 12C17 5 12 1 12 1Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            fill="currentColor"
          />
        </svg>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={onVolumeChange}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400${isDarkMode ? ' dark-mode' : ''}`}
          style={{ accentColor: isDarkMode ? '#90caf9' : '#2563eb' }}
        />
        <span className="ml-2 text-sm font-semibold" style={{ minWidth: 32 }}>
          {volume}
        </span>
      </div>
    </div>
  )
}

PlayerControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

export default PlayerControls
