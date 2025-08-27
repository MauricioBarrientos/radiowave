import React from 'react'
import PropTypes from 'prop-types'

const NowPlaying = ({ station, isDarkMode }) => {
  if (!station) return null

  return (
    <div
      className={`flex items-center gap-2 rounded shadow-sm border border-gray-100 w-full max-w-xs mx-auto min-h-0 ${
        isDarkMode ? 'dark-mode' : ''
      }`}
      style={{ height: 48, background: 'transparent' }}
    >
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-sm m-0 leading-tight truncate">
          {station.name}
        </h2>
        <p className="text-gray-500 text-xs m-0 leading-tight truncate">
          {station.frequency}
        </p>
      </div>
    </div>
  )
}

NowPlaying.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
  }),
  isDarkMode: PropTypes.bool.isRequired,
}

export default NowPlaying
