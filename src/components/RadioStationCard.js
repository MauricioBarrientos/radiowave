import React from 'react';

const RadioStationCard = ({ station, isPlaying, onPlay }) => {
  return (
    <div 
      className={`station-card bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-between p-4 transition-transform duration-300 cursor-pointer ${isPlaying ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onPlay(station)}
    >
      <div className="station-card-content flex flex-col items-center w-full">
        <img 
          src={station.cover} 
          alt={station.name} 
          className="radio-cover mb-2" 
        />
        <h5 className="card-title font-bold text-lg text-center mb-1">{station.name}</h5>
        <p className="card-text text-gray-500 text-center mb-2">{station.frequency}</p>
      </div>
      <button 
        style={{ backgroundColor: isPlaying ? '#ef4444' : '#2563eb', color: '#fff', border: 'none' }}
        className={`btn-play w-full mt-2 hover:bg-orange-500 rounded-lg transition-colors`}
        onClick={e => { e.stopPropagation(); onPlay(station); }}
      >
        {isPlaying ? 'Pausar' : 'Escuchar'}
      </button>
    </div>
  );
};

export default RadioStationCard;