import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './AdvancedPlayer.css'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

const AdvancedPlayer = ({
  currentStation,
  isPlaying,
  onPlayPause,
  audioRef,
}) => {
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted, audioRef])

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!currentStation) {
    return null
  }

  return (
    <div className="advanced-player-container">
      <div className="player-section left">
        <img
          src={currentStation.cover}
          alt={currentStation.name}
          className="player-cover"
        />
        <div className="player-info-text">
          <p className="player-title">{currentStation.name}</p>
          <p className="player-live-indicator">
            <span className="live-dot"></span>EN DIRECTO
          </p>
        </div>
      </div>

      <div className="player-section middle">
        <button onClick={onPlayPause} className="main-play-button">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
      </div>

      <div className="player-section right">
        <div className="volume-control">
          <button onClick={toggleMute} className="volume-button">
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  )
}

AdvancedPlayer.propTypes = {
  currentStation: PropTypes.shape({
    id: PropTypes.number,
    cover: PropTypes.string,
    name: PropTypes.string,
  }),
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  audioRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
}

AdvancedPlayer.defaultProps = {
  currentStation: null,
  audioRef: null,
}

export default AdvancedPlayer
