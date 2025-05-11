import React from 'react';

const NowPlaying = ({ station }) => {
  if (!station) return null;
  
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
        <img src={station.cover} alt={station.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">Ahora sonando</h3>
        <h2 className="font-bold text-xl">{station.name}</h2>
        <p className="text-gray-500">{station.frequency}</p>
      </div>
    </div>
  );
};

export default NowPlaying;