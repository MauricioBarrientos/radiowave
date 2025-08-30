import React from 'react'
import PropTypes from 'prop-types'

const PlayerControls = ({ isPlaying, onPlayPause }) => {
  return (
    <div className="inline-flex items-center justify-center gap-4 p-1 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <button
        onClick={onPlayPause}
        className={`btn-play p-1 rounded-full transition-all duration-200 transform active:scale-90 ${isPlaying ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
      >
        {isPlaying ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  )
}

PlayerControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
}

export default PlayerControls
