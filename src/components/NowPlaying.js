import React from 'react';

const NowPlaying = ({ station, isDarkMode }) => {
  if (!station) return null;
  
  return (
    <div className="flex items-center gap-2 p-1 bg-white rounded shadow-sm border border-gray-100 w-full max-w-xs mx-auto min-h-0" style={{ height: 48 }}>
      {/* Imagen eliminada */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-xs m-0 leading-tight truncate${isDarkMode ? ' dark-mode' : ''}`}>Ahora sonando</h3>
        <h2 className="font-bold text-sm m-0 leading-tight truncate">{station.name}</h2>
        <p className="text-gray-500 text-xs m-0 leading-tight truncate">{station.frequency}</p>
      </div>
    </div>
  );
};

export default NowPlaying;